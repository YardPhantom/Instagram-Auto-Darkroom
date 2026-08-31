from __future__ import annotations

import asyncio
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from config import public_config
from engine import engine

WEB = Path(__file__).resolve().parent / "web"

app = FastAPI(title="Darkroom", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class SettingsIn(BaseModel):
    watch_folder: str | None = None
    done_folder: str | None = None
    instagram_username: str | None = None
    instagram_password: str | None = None
    posts_per_day_min: int | None = Field(default=None, ge=1, le=3)
    posts_per_day_max: int | None = Field(default=None, ge=1, le=3)
    min_gap_minutes: int | None = Field(default=None, ge=30, le=720)
    quiet_hours: bool | None = None
    quiet_start: str | None = None
    quiet_end: str | None = None
    videos_as_reels: bool | None = None
    also_first_comment: bool | None = None
    skip_without_caption: bool | None = None
    auto_post: bool | None = None


class LoginIn(BaseModel):
    username: str | None = None
    password: str | None = None
    verification_code: str | None = None


class ItemIn(BaseModel):
    id: str


@app.on_event("startup")
async def _startup() -> None:
    (Path(__file__).resolve().parent / "logs").mkdir(parents=True, exist_ok=True)
    Path(engine.cfg["done_folder"]).mkdir(parents=True, exist_ok=True)
    asyncio.create_task(engine.loop())


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/state")
def state() -> dict:
    snap = engine.snapshot()
    snap["settings"] = public_config(engine.cfg)
    return snap


@app.put("/api/settings")
def update_settings(body: SettingsIn) -> dict:
    patch = body.model_dump(exclude_none=True)
    engine.apply_settings(patch)
    return {"settings": public_config(engine.cfg)}


@app.post("/api/instagram/login")
def login(body: LoginIn) -> dict:
    err = engine.login(body.username, body.password, body.verification_code)
    if err:
        raise HTTPException(status_code=400, detail=err)
    return {"ok": True, "needs_2fa": engine.needs_2fa}


@app.post("/api/engine/start")
def start() -> dict:
    err = engine.start()
    if err:
        raise HTTPException(status_code=400, detail=err)
    return {"ok": True}


@app.post("/api/engine/stop")
def stop() -> dict:
    engine.stop()
    return {"ok": True}


@app.post("/api/queue/post")
def post_item(body: ItemIn | None = None) -> dict:
    err = engine.post(body.id if body else None)
    if err:
        raise HTTPException(status_code=400, detail=err)
    return {"ok": True}


@app.post("/api/queue/skip")
def skip_item(body: ItemIn) -> dict:
    err = engine.skip(body.id)
    if err:
        raise HTTPException(status_code=400, detail=err)
    return {"ok": True}


@app.get("/api/media")
def media(path: str):
    target = Path(path).resolve()
    watch = Path(engine.cfg["watch_folder"]).resolve()
    done = Path(engine.cfg["done_folder"]).resolve()
    if not (target.is_relative_to(watch) or target.is_relative_to(done)):
        raise HTTPException(status_code=403, detail="Path is outside the watch folders.")
    if not target.is_file():
        raise HTTPException(status_code=404, detail="Missing file.")
    return FileResponse(target)


@app.get("/")
def home():
    index = WEB / "index.html"
    return FileResponse(index)


if WEB.exists():
    app.mount("/static", StaticFiles(directory=WEB), name="static")
