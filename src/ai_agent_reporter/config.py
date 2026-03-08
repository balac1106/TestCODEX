from __future__ import annotations

import json
from functools import cached_property

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

from .models import FeedSource


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = Field(default="ai-agent-reporter", alias="APP_NAME")
    app_timezone: str = Field(default="Asia/Tokyo", alias="APP_TIMEZONE")
    enable_internal_scheduler: bool = Field(default=False, alias="ENABLE_INTERNAL_SCHEDULER")
    run_on_startup: bool = Field(default=False, alias="RUN_ON_STARTUP")
    daily_report_hour: int = Field(default=9, alias="DAILY_REPORT_HOUR")
    daily_report_minute: int = Field(default=0, alias="DAILY_REPORT_MINUTE")
    lookback_hours: int = Field(default=24, alias="LOOKBACK_HOURS")
    max_items_per_feed: int = Field(default=5, alias="MAX_ITEMS_PER_FEED")
    max_report_items: int = Field(default=8, alias="MAX_REPORT_ITEMS")
    keywords: str = Field(
        default="agent,agents,ai agent,autonomous,workflow,llm,tool use,multi-agent",
        alias="KEYWORDS",
    )
    feeds_json: str = Field(default="[]", alias="FEEDS_JSON")
    wecom_webhook_url: str | None = Field(default=None, alias="WECOM_WEBHOOK_URL")
    serverchan_sendkey: str | None = Field(default=None, alias="SERVERCHAN_SENDKEY")

    @cached_property
    def feed_sources(self) -> list[FeedSource]:
        raw_items = json.loads(self.feeds_json or "[]")
        sources: list[FeedSource] = []
        for item in raw_items:
            name = str(item.get("name", "")).strip()
            url = str(item.get("url", "")).strip()
            if name and url:
                sources.append(FeedSource(name=name, url=url))
        return sources

    @cached_property
    def keyword_list(self) -> list[str]:
        return [keyword.strip().lower() for keyword in self.keywords.split(",") if keyword.strip()]


settings = Settings()
