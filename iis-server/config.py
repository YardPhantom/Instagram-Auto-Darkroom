from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
CONFIG_PATH = ROOT / "config.json"
SESSION_PATH = ROOT / "session.json"
LOG_PATH = ROOT / "logs" / "posts.json"
SCHEDULE_PATH = ROOT / "logs" / "schedule.json"
DEFAULTS: dict[str, Any] = {
    "watch_folder": r"C:\projects\InstagramAuto",
    "done_folder": r"C:\projects\InstagramAuto\done",
    "instagram_username": "Lookinggoodmodel",
    "instagram_password": "",
    "posts_per_day_min": 1,
    "posts_per_day_max": 3,
    "min_gap_minutes": 90,
    "quiet_hours": True,
    "quiet_start": "23:00",
    "quiet_end": "07:30",
    "videos_as_reels": True,
    "also_first_comment": False,
    "skip_without_caption": True,
    "auto_post": False,
}


def load_config() -> dict[str, Any]:
    data = dict(DEFAULTS)
    if CONFIG_PATH.exists():
        try:
            data.update(json.loads(CONFIG_PATH.read_text(encoding="utf-8")))
        except json.JSONDecodeError:
            pass
    if not str(data.get("instagram_username") or "").strip():
        data["instagram_username"] = "Lookinggoodmodel"
    data["posts_per_day_min"] = max(1, min(3, int(data.get("posts_per_day_min") or 1)))
    data["posts_per_day_max"] = max(
        data["posts_per_day_min"], min(3, int(data.get("posts_per_day_max") or 3))
    )
    return data


def save_config(data: dict[str, Any]) -> dict[str, Any]:
    merged = load_config()
    merged.update({k: v for k, v in data.items() if k in DEFAULTS or k.endswith("_password") or k.endswith("_username")})
    CONFIG_PATH.write_text(json.dumps(merged, indent=2), encoding="utf-8")
    return merged


def public_config(data: dict[str, Any] | None = None) -> dict[str, Any]:
    cfg = dict(data or load_config())
    cfg["has_password"] = bool(cfg.get("instagram_password"))
    cfg.pop("instagram_password", None)
    return cfg
