from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class FeedSource:
    name: str
    url: str


@dataclass(slots=True)
class ReportItem:
    source_name: str
    title: str
    link: str
    summary: str
    published_at: datetime | None
    matched_keywords: list[str]
