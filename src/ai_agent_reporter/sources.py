from __future__ import annotations

from datetime import UTC, datetime, timedelta
from email.utils import parsedate_to_datetime
from typing import Any

import feedparser
from bs4 import BeautifulSoup

from .config import Settings
from .models import FeedSource, ReportItem


def _parse_datetime(entry: dict[str, Any]) -> datetime | None:
    for key in ("published", "updated", "created"):
        raw_value = entry.get(key)
        if not raw_value:
            continue
        try:
            parsed = parsedate_to_datetime(raw_value)
        except (TypeError, ValueError, IndexError):
            continue
        if parsed.tzinfo is None:
            return parsed.replace(tzinfo=UTC)
        return parsed.astimezone(UTC)
    return None


def _clean_html(value: str) -> str:
    text = BeautifulSoup(value or "", "html.parser").get_text(" ", strip=True)
    return " ".join(text.split())


def _collect_summary(entry: dict[str, Any]) -> str:
    candidates = [entry.get("summary"), entry.get("description")]
    content_items = entry.get("content") or []
    if content_items and isinstance(content_items, list):
        first_item = content_items[0]
        if isinstance(first_item, dict):
            candidates.append(first_item.get("value"))

    for candidate in candidates:
        cleaned = _clean_html(str(candidate or ""))
        if cleaned:
            return cleaned
    return ""


def _match_keywords(text: str, keywords: list[str]) -> list[str]:
    lowered = text.lower()
    return [keyword for keyword in keywords if keyword in lowered]


def _collect_from_source(
    source: FeedSource,
    keywords: list[str],
    since: datetime,
    max_items: int,
) -> list[ReportItem]:
    parsed = feedparser.parse(source.url)
    matched_items: list[ReportItem] = []

    for entry in parsed.entries:
        title = str(entry.get("title", "")).strip()
        summary = _collect_summary(entry)
        link = str(entry.get("link", "")).strip()
        published_at = _parse_datetime(entry)
        haystack = " ".join(part for part in [title, summary] if part)
        matched_keywords = _match_keywords(haystack, keywords)

        if not matched_keywords:
            continue
        if published_at and published_at < since:
            continue

        matched_items.append(
            ReportItem(
                source_name=source.name,
                title=title or "Untitled",
                link=link,
                summary=summary,
                published_at=published_at,
                matched_keywords=matched_keywords,
            )
        )

        if len(matched_items) >= max_items:
            break

    return matched_items


def collect_feed_items(settings: Settings) -> list[ReportItem]:
    since = datetime.now(UTC) - timedelta(hours=settings.lookback_hours)
    results: list[ReportItem] = []

    for source in settings.feed_sources:
        results.extend(
            _collect_from_source(
                source=source,
                keywords=settings.keyword_list,
                since=since,
                max_items=settings.max_items_per_feed,
            )
        )

    results.sort(key=lambda item: item.published_at or datetime.min.replace(tzinfo=UTC), reverse=True)
    return results[: settings.max_report_items]
