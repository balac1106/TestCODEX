# AI Agent Reporter

這是一個可部署到雲端平台的 Python 服務，會每天蒐集 AI Agent 相關資訊、整理成 Markdown 報告，並推送到微信生態通知渠道。

目前提供的 MVP 能力：

- 從可配置的 RSS / Atom 來源抓取內容
- 依關鍵字篩選 AI Agent 相關文章
- 產生每日 Markdown 報告
- 推送到 WeCom webhook 或 ServerChan，方便送進微信
- 提供 FastAPI 介面，方便部署到 Render、Railway、Fly.io 或自架容器平台
- 支援內建排程，也支援由外部 cron / scheduler 呼叫 `/run`
- 提供 `/preview` 預覽端點，方便先檢查報告內容

## 專案結構

```text
src/ai_agent_reporter/
  config.py
  sources.py
  report.py
  notifiers.py
  service.py
  main.py
```

## 本機啟動

1. 建立虛擬環境並安裝套件

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. 建立環境變數

```powershell
Copy-Item .env.example .env
```

3. 編輯 `.env`

- `FEEDS_JSON`: 你要追蹤的資訊來源
- `KEYWORDS`: 想關注的 AI Agent 關鍵字
- `WECOM_WEBHOOK_URL` 或 `SERVERCHAN_SENDKEY`: 至少設定一種推送方式

範例：

```env
FEEDS_JSON=[{"name":"Source A","url":"https://example.com/feed.xml"},{"name":"Source B","url":"https://example.com/atom.xml"}]
KEYWORDS=agent,agents,multi-agent,tool use,workflow
SERVERCHAN_SENDKEY=your_send_key
ENABLE_INTERNAL_SCHEDULER=true
DAILY_REPORT_HOUR=9
DAILY_REPORT_MINUTE=0
```

4. 啟動服務

```powershell
uvicorn ai_agent_reporter.main:app --host 0.0.0.0 --port 8000 --app-dir src
```

5. 手動觸發

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/run
```

6. 預覽報告但不推送

```powershell
Invoke-RestMethod http://localhost:8000/preview
```

## 雲端部署

### Docker

```powershell
docker build -t ai-agent-reporter .
docker run --env-file .env -p 8000:8000 ai-agent-reporter
```

### Render

專案已附 `render.yaml`，可以直接作為雲端部署起點。

## 建議的下一步

- 把 RSS 來源換成你真正要追的站點
- 如果你想要更像研究摘要，可以在 `service.py` 加入 LLM 摘要流程
- 如果你要接真正的微信公眾號或小程序能力，可以在 `notifiers.py` 新增 provider
