# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

AI Agent Reporter — a single-service Python/FastAPI app that fetches RSS/Atom feeds, filters by keywords, generates a Markdown report, and pushes notifications to WeCom/ServerChan. No database or auxiliary services required.

### Running tests

```bash
source .venv/bin/activate
PYTHONPATH=src pytest tests/ -v
```

### Running the dev server

```bash
source .venv/bin/activate
uvicorn ai_agent_reporter.main:app --host 0.0.0.0 --port 8000 --app-dir src --reload
```

### Key endpoints

- `GET /health` — health check
- `GET /preview` — generate report without sending notifications
- `POST /run` — generate report and push to configured notifiers

### Important caveats

- **pydantic-settings caches at import time**: changing `.env` requires a full server restart (not just hot-reload). Kill the uvicorn process and re-launch.
- **No lint tool is configured**: the project does not include flake8, ruff, or mypy in `requirements.txt`. No lint command is available out of the box.
- **`.env` must exist**: copy `.env.example` to `.env` before starting. The app reads config from `.env` via `pydantic-settings`.
- **Notification providers are optional for `/preview` and `/health`**: only `/run` requires at least one of `WECOM_WEBHOOK_URL` or `SERVERCHAN_SENDKEY` to be set.
- **`python3.12-venv` must be installed**: on Ubuntu/Debian the system Python does not include `ensurepip`; `apt install python3.12-venv` is needed before creating a venv.
