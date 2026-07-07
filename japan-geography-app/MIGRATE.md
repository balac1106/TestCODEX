# 將日本地理 App 移至獨立 Repository

本 App 已從 `TestCODEX` 拆出，可作為獨立專案使用。

## 方法一：從 export 分支推送（推薦）

### 1. 在 GitHub 建立新 repo

前往 https://github.com/new 建立空 repository，例如：

- **Repository name:** `japan-geography-app`
- **不要**勾選「Add a README file」

### 2. 推送程式碼

在本 repo（TestCODEX）根目錄執行：

```bash
git fetch origin japan-geography-app-standalone
git push https://github.com/balac1106/japan-geography-app.git japan-geography-app-standalone:main
```

或使用腳本：

```bash
chmod +x scripts/push-japan-geography-to-new-repo.sh
./scripts/push-japan-geography-to-new-repo.sh balac1106/japan-geography-app
```

### 3. 在新 repo 中執行

```bash
git clone https://github.com/balac1106/japan-geography-app.git
cd japan-geography-app
npm install
npm run dev
```

## 方法二：使用已打包的 standalone 目錄

`/tmp/japan-geography-app-standalone` 目錄已包含完整獨立 git 歷史，可手動推送：

```bash
cd /path/to/japan-geography-app-standalone
git remote add origin https://github.com/balac1106/japan-geography-app.git
git push -u origin main
```

## 獨立 repo 結構

推送後，新 repo 根目錄即為 App 本體（非子資料夾）：

```
japan-geography-app/          ← repo 根目錄
├── src/
├── public/
├── package.json
├── README.md
└── ...
```

## 從 TestCODEX 移除（可選）

若不再需要將 App 放在 TestCODEX，可關閉 PR #2 並刪除 `japan-geography-app/` 子目錄。
