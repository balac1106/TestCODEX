from __future__ import annotations

from datetime import datetime
from zoneinfo import ZoneInfo

from .models import ReportItem


def _truncate(value: str, limit: int = 180) -> str:
    compact = " ".join(value.split())
    if len(compact) <= limit:
        return compact
    return f"{compact[: limit - 1].rstrip()}..."


def build_markdown_report(items: list[ReportItem], timezone_name: str) -> str:
    now = datetime.now(ZoneInfo(timezone_name))
    lines = [
        "# AI Agent Daily Report",
        "",
        f"- Generated at: {now.strftime('%Y-%m-%d %H:%M %Z')}",
        f"- Items found: {len(items)}",
        "",
    ]

    if not items:
        lines.append("今天沒有抓到新的 AI Agent 相關資訊。")
        return "\n".join(lines)

    for index, item in enumerate(items, start=1):
        published_label = "Unknown time"
        if item.published_at is not None:
            published_label = item.published_at.astimezone(ZoneInfo(timezone_name)).strftime("%Y-%m-%d %H:%M")

        lines.extend(
            [
                f"## {index}. {item.title}",
                f"- Source: {item.source_name}",
                f"- Published: {published_label}",
                f"- Keywords: {', '.join(item.matched_keywords)}",
                f"- Link: {item.link or 'N/A'}",
                f"- Summary: {_truncate(item.summary)}",
                "",
            ]
        )

    return "\n".join(lines).strip()
