from __future__ import annotations

import json
import random
import shutil
import time
from dataclasses import asdict, dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

from config import LOG_PATH, SCHEDULE_PATH, SESSION_PATH, load_config, save_config

PHOTO_EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".bmp"}
VIDEO_EXT = {".mp4", ".mov", ".m4v", ".avi"}
SKIP_DIRS = {"done", ".darkroom", ".venv", "logs", "web", "__pycache__"}

try:
    from instagrapi import Client
    from instagrapi.exceptions import ChallengeRequired, LoginRequired, TwoFactorRequired
except ImportError:  # pragma: no cover
    Client = None  # type: ignore[assignment]

    class ChallengeRequired(Exception):
        pass

    class LoginRequired(Exception):
        pass

    class TwoFactorRequired(Exception):
        pass


@dataclass
class QueueItem:
    id: str
    filename: str
    path: str
    annotation_path: str | None
    kind: str
    caption: str
    comment: str
    bytes: int
    mtime: float
    status: str


class Engine:
    def __init__(self) -> None:
        self.cfg = load_config()
        self.running = bool(self.cfg.get("auto_post"))
        self.logged_in = False
        self.next_post_at = 0.0
        self.schedule: list[float] = []
        self.schedule_day = ""
        self.posting: str | None = None
        self.last_error: str | None = None
        self.needs_2fa = False
        self.client: Any = None
        self.log: list[dict[str, Any]] = []
        self._load_log()
        self._load_schedule()

    def _load_log(self) -> None:
        if LOG_PATH.exists():
            try:
                self.log = json.loads(LOG_PATH.read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                self.log = []

    def _write_log(self) -> None:
        LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        LOG_PATH.write_text(json.dumps(self.log[:400], indent=2), encoding="utf-8")

    def _load_schedule(self) -> None:
        if not SCHEDULE_PATH.exists():
            return
        try:
            data = json.loads(SCHEDULE_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return
        self.schedule_day = str(data.get("date") or "")
        self.schedule = [float(x) for x in data.get("slots") or []]
        self.next_post_at = self.schedule[0] if self.schedule else 0.0

    def _write_schedule(self) -> None:
        SCHEDULE_PATH.parent.mkdir(parents=True, exist_ok=True)
        SCHEDULE_PATH.write_text(
            json.dumps({"date": self.schedule_day, "slots": self.schedule}, indent=2),
            encoding="utf-8",
        )

    def apply_settings(self, patch: dict[str, Any]) -> dict[str, Any]:
        self.cfg = save_config(patch)
        if "auto_post" in patch:
            self.running = bool(patch["auto_post"])
        timing = {
            "quiet_hours",
            "quiet_start",
            "quiet_end",
            "posts_per_day_min",
            "posts_per_day_max",
            "min_gap_minutes",
        }
        if self.running and (timing & set(patch)):
            self.roll_schedule(force=True)
        return self.cfg

    def watch(self) -> Path:
        return Path(self.cfg["watch_folder"])

    def done(self) -> Path:
        return Path(self.cfg["done_folder"])

    def in_quiet_hours(self, now: datetime | None = None) -> bool:
        return in_quiet_hours(self.cfg, now or datetime.now())

    def roll_schedule(self, force: bool = False) -> None:
        today = datetime.now().strftime("%Y-%m-%d")
        future = [ts for ts in self.schedule if ts > time.time()]
        if not force and self.schedule_day == today and future:
            self.schedule = future
            self.next_post_at = future[0]
            self._write_schedule()
            return
        slots = plan_random_slots(self.cfg, datetime.now())
        self.schedule_day = today
        self.schedule = slots
        self.next_post_at = slots[0] if slots else 0.0
        self._write_schedule()

    def scan(self) -> list[QueueItem]:
        root = self.watch()
        done = self.done()
        done.mkdir(parents=True, exist_ok=True)
        items: list[QueueItem] = []
        if not root.exists():
            return items
        for path in sorted(root.rglob("*")):
            if not path.is_file():
                continue
            if any(part.lower() in SKIP_DIRS or part.startswith(".") for part in path.parts):
                continue
            try:
                if done.exists() and path.resolve().is_relative_to(done.resolve()):
                    continue
            except (OSError, ValueError):
                continue
            ext = path.suffix.lower()
            if ext not in PHOTO_EXT | VIDEO_EXT:
                continue
            caption, comment, ann = read_annotation(path)
            status = "ready"
            if not caption.strip() and self.cfg.get("skip_without_caption", True):
                status = "needs_caption"
            if self.posting == str(path):
                status = "posting"
            items.append(
                QueueItem(
                    id=str(path),
                    filename=path.name,
                    path=str(path),
                    annotation_path=str(ann) if ann else None,
                    kind="video" if ext in VIDEO_EXT else "photo",
                    caption=caption,
                    comment=comment,
                    bytes=path.stat().st_size,
                    mtime=path.stat().st_mtime,
                    status=status,
                )
            )
        return items

    def login(self, username: str | None = None, password: str | None = None, verification_code: str | None = None) -> str | None:
        if Client is None:
            return "instagrapi is not installed. Run setup.ps1 on the server."
        user = username or self.cfg.get("instagram_username") or ""
        pw = password or self.cfg.get("instagram_password") or ""
        if username:
            self.apply_settings({"instagram_username": username})
        if password:
            self.apply_settings({"instagram_password": password})
        if not user or not pw:
            return "Username and password are required."
        try:
            cl = Client()
            cl.delay_range = [1, 3]
            if SESSION_PATH.exists():
                cl.load_settings(SESSION_PATH)
            if verification_code:
                cl.login(user, pw, verification_code=verification_code)
            else:
                cl.login(user, pw)
            SESSION_PATH.parent.mkdir(parents=True, exist_ok=True)
            cl.dump_settings(SESSION_PATH)
            self.client = cl
            self.logged_in = True
            self.needs_2fa = False
            self.last_error = None
            return None
        except TwoFactorRequired:
            self.needs_2fa = True
            self.last_error = "Instagram asked for a two-factor code."
            return self.last_error
        except ChallengeRequired:
            self.last_error = "Instagram issued a challenge. Complete it in the Instagram app, then try again."
            return self.last_error
        except Exception as exc:  # noqa: BLE001
            self.last_error = str(exc)
            self.logged_in = False
            return self.last_error

    def start(self) -> str | None:
        if not self.logged_in:
            err = self.login()
            if err:
                return err
        self.running = True
        self.apply_settings({"auto_post": True})
        self.roll_schedule(force=True)
        return None

    def stop(self) -> None:
        self.running = False
        self.apply_settings({"auto_post": False})

    def skip(self, item_id: str) -> str | None:
        item = next((i for i in self.scan() if i.id == item_id), None)
        if not item:
            return "File is no longer in the inbox."
        self._move_used(Path(item.path), Path(item.annotation_path) if item.annotation_path else None)
        self._record(item, "skipped")
        return None

    def post(self, item_id: str | None = None) -> str | None:
        if Client is None:
            return "instagrapi is not installed. Run setup.ps1 on the server."
        if not self.logged_in or self.client is None:
            err = self.login()
            if err:
                return err
        items = self.scan()
        item = next((i for i in items if i.id == item_id), None) if item_id else next(
            (i for i in items if i.status == "ready"), None
        )
        if not item:
            return "Nothing ready to post."
        if not item.caption.strip() and self.cfg.get("skip_without_caption", True):
            return "This frame has no caption."
        self.posting = item.path
        try:
            media = self._upload(item)
            comment = item.comment.strip()
            if self.cfg.get("also_first_comment"):
                text = comment or item.caption
                if text:
                    self.client.media_comment(media.pk, text[:2200])
            elif comment:
                self.client.media_comment(media.pk, comment[:2200])
            self._move_used(Path(item.path), Path(item.annotation_path) if item.annotation_path else None)
            self._record(item, "posted", pk=str(getattr(media, "pk", "")))
            now = time.time()
            self.schedule = [ts for ts in self.schedule if ts > now]
            self.next_post_at = self.schedule[0] if self.schedule else 0.0
            self._write_schedule()
            self.last_error = None
            return None
        except LoginRequired:
            self.logged_in = False
            self.last_error = "Session expired. Sign in again."
            return self.last_error
        except Exception as exc:  # noqa: BLE001
            self.last_error = str(exc)
            return self.last_error
        finally:
            self.posting = None

    def _upload(self, item: QueueItem) -> Any:
        caption = item.caption[:2200]
        if item.kind == "video":
            if self.cfg.get("videos_as_reels", True):
                return self.client.clip_upload(item.path, caption)
            return self.client.video_upload(item.path, caption)
        return self.client.photo_upload(item.path, caption)

    def _move_used(self, media: Path, annotation: Path | None) -> None:
        dest_dir = self.done()
        dest_dir.mkdir(parents=True, exist_ok=True)
        shutil.move(str(media), str(_unique(dest_dir, media.name)))
        if annotation and annotation.exists():
            shutil.move(str(annotation), str(_unique(dest_dir, annotation.name)))

    def _record(self, item: QueueItem, destination: str, pk: str = "") -> None:
        self.log.insert(
            0,
            {
                "filename": item.filename,
                "kind": item.kind,
                "caption": item.caption,
                "destination": destination,
                "pk": pk,
                "finished_at": datetime.now().isoformat(timespec="seconds"),
            },
        )
        self._write_log()

    def snapshot(self) -> dict[str, Any]:
        queue = [asdict(i) for i in self.scan()]
        return {
            "running": self.running,
            "logged_in": self.logged_in,
            "needs_2fa": self.needs_2fa,
            "posting": self.posting,
            "next_post_at": self.next_post_at,
            "schedule": self.schedule,
            "last_error": self.last_error,
            "quiet": self.in_quiet_hours(),
            "queue": queue,
            "history": self.log[:80],
            "instagrapi": Client is not None,
        }

    async def loop(self) -> None:
        import asyncio

        while True:
            await asyncio.sleep(8)
            if not self.running or self.posting:
                continue
            self.roll_schedule()
            if self.in_quiet_hours():
                continue
            if not self.schedule or time.time() < self.next_post_at:
                continue
            ready = [i for i in self.scan() if i.status == "ready"]
            if not ready:
                self.next_post_at = time.time() + 120
                continue
            self.post(ready[0].id)


def in_quiet_hours(cfg: dict[str, Any], now: datetime) -> bool:
    if not cfg.get("quiet_hours"):
        return False
    start = cfg.get("quiet_start") or "23:00"
    end = cfg.get("quiet_end") or "07:30"
    sh, sm = [int(x) for x in start.split(":")]
    eh, em = [int(x) for x in end.split(":")]
    cur = now.hour * 60 + now.minute
    a, b = sh * 60 + sm, eh * 60 + em
    if a == b:
        return False
    if a < b:
        return a <= cur < b
    return cur >= a or cur < b


def plan_random_slots(cfg: dict[str, Any], now: datetime) -> list[float]:
    lo = max(1, min(3, int(cfg.get("posts_per_day_min") or 1)))
    hi = max(lo, min(3, int(cfg.get("posts_per_day_max") or 3)))
    count = random.randint(lo, hi)
    gap = max(30, int(cfg.get("min_gap_minutes") or 90)) * 60
    today = _window_for_day(cfg, now, now)
    picked = _pick_spaced(today, count, gap)
    if picked:
        return picked
    tomorrow = datetime(now.year, now.month, now.day) + timedelta(days=1)
    return _pick_spaced(_window_for_day(cfg, tomorrow, tomorrow), count, gap)


def _window_for_day(cfg: dict[str, Any], day: datetime, not_before: datetime) -> list[float]:
    start = datetime(day.year, day.month, day.day)
    end = start + timedelta(days=1)
    cursor = max(start, not_before + timedelta(minutes=1))
    cursor = cursor.replace(second=0, microsecond=0)
    extra = 5 - (cursor.minute % 5)
    if extra != 5:
        cursor += timedelta(minutes=extra)
    quiet = bool(cfg.get("quiet_hours"))
    out: list[float] = []
    while cursor < end:
        if not (quiet and in_quiet_hours(cfg, cursor)):
            out.append(cursor.timestamp())
        cursor += timedelta(minutes=5)
    return out


def _pick_spaced(candidates: list[float], count: int, gap: float) -> list[float]:
    if count <= 0 or not candidates:
        return []
    pool = list(candidates)
    random.shuffle(pool)
    picked: list[float] = []
    for ts in pool:
        if len(picked) >= count:
            break
        if all(abs(ts - p) >= gap for p in picked):
            picked.append(ts)
    if len(picked) < count:
        for ts in candidates:
            if len(picked) >= count:
                break
            if all(abs(ts - p) >= gap for p in picked):
                picked.append(ts)
    picked.sort()
    return picked


def read_annotation(media: Path) -> tuple[str, str, Path | None]:
    stem = media.with_suffix("")
    found: Path | None = None
    for ext in (".json", ".txt", ".caption"):
        candidate = Path(str(stem) + ext)
        if candidate.exists():
            found = candidate
            break
    if not found:
        return "", "", None
    text = found.read_text(encoding="utf-8", errors="replace").strip()
    if found.suffix.lower() == ".json":
        try:
            data = json.loads(text)
            caption = str(data.get("caption") or data.get("text") or "")
            comment = str(data.get("comment") or data.get("first_comment") or "")
            return caption, comment, found
        except json.JSONDecodeError:
            return text, "", found
    return text, "", found


def _unique(folder: Path, name: str) -> Path:
    dest = folder / name
    if not dest.exists():
        return dest
    stem, suffix = dest.stem, dest.suffix
    i = 1
    while True:
        cand = folder / f"{stem}_{i}{suffix}"
        if not cand.exists():
            return cand
        i += 1


engine = Engine()
