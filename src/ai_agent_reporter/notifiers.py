from __future__ import annotations

from dataclasses import dataclass

import httpx

from .config import Settings


class NotificationError(RuntimeError):
    pass


@dataclass(slots=True)
class NotificationResult:
    provider: str
    delivered: bool
    detail: str


async def notify_report(settings: Settings, title: str, markdown: str) -> list[NotificationResult]:
    results: list[NotificationResult] = []

    if settings.wecom_webhook_url:
        results.append(await _send_wecom(settings.wecom_webhook_url, title, markdown))

    if settings.serverchan_sendkey:
        results.append(await _send_serverchan(settings.serverchan_sendkey, title, markdown))

    if not results:
        raise NotificationError("No notification provider configured.")

    return results


async def _send_wecom(webhook_url: str, title: str, markdown: str) -> NotificationResult:
    payload = {
        "msgtype": "markdown",
        "markdown": {
            "content": f"## {title}\n\n{markdown}",
        },
    }
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.post(webhook_url, json=payload)
        response.raise_for_status()
    return NotificationResult(provider="wecom", delivered=True, detail="Delivered to WeCom webhook")


async def _send_serverchan(sendkey: str, title: str, markdown: str) -> NotificationResult:
    endpoint = f"https://sctapi.ftqq.com/{sendkey}.send"
    payload = {
        "title": title,
        "desp": markdown,
    }
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.post(endpoint, data=payload)
        response.raise_for_status()
    return NotificationResult(provider="serverchan", delivered=True, detail="Delivered to ServerChan")
