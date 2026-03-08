from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI, HTTPException

from .config import settings
from .notifiers import NotificationError
from .service import generate_daily_report, run_daily_report

logger = logging.getLogger(__name__)
scheduler: AsyncIOScheduler | None = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global scheduler

    if settings.enable_internal_scheduler:
        scheduler = AsyncIOScheduler(timezone=settings.app_timezone)
        scheduler.add_job(
            run_daily_report,
            trigger="cron",
            hour=settings.daily_report_hour,
            minute=settings.daily_report_minute,
            id="daily-ai-agent-report",
            replace_existing=True,
        )
        scheduler.start()
        logger.info("Internal scheduler started")

    if settings.run_on_startup:
        try:
            await run_daily_report()
        except Exception:  # noqa: BLE001
            logger.exception("Startup report run failed")

    try:
        yield
    finally:
        if scheduler is not None:
            scheduler.shutdown(wait=False)


app = FastAPI(title=settings.app_name, lifespan=lifespan)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/run")
async def run() -> dict:
    try:
        return await run_daily_report()
    except NotificationError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/preview")
async def preview() -> dict:
    return generate_daily_report()
