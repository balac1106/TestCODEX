from datetime import UTC, datetime

from ai_agent_reporter.models import ReportItem
from ai_agent_reporter.report import build_markdown_report


def test_build_markdown_report_includes_items() -> None:
    items = [
        ReportItem(
            source_name="Example Feed",
            title="A new agent workflow",
            link="https://example.com/post",
            summary="This post describes a useful AI agent workflow for automation.",
            published_at=datetime(2026, 3, 9, 0, 0, tzinfo=UTC),
            matched_keywords=["agent", "workflow"],
        )
    ]

    result = build_markdown_report(items, "Asia/Tokyo")

    assert "AI Agent Daily Report" in result
    assert "A new agent workflow" in result
    assert "Example Feed" in result
