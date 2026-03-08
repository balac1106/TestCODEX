from __future__ import annotations

from datetime import datetime

from .config import settings
from .notifiers import notify_report
from .report import build_markdown_report
from .sources import collect_feed_items


def generate_daily_report() -> dict:
    items = collect_feed_items(settings)
    markdown = build_markdown_report(items, settings.app_timezone)
    title = f"AI Agent Daily Report {datetime.now().strftime('%Y-%m-%d')}"

    return {
        "title": title,
        "items": len(items),
        "markdown": markdown,
    }


async def run_daily_report() -> dict:
    report = generate_daily_report()
    results = await notify_report(settings, report["title"], report["markdown"])

    return {
        "title": report["title"],
        "items": report["items"],
        "providers": [result.provider for result in results],
        "markdown": report["markdown"],
    }
