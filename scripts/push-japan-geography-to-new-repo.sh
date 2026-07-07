#!/usr/bin/env bash
# 將日本地理 App 推送到新的 GitHub repository
#
# 使用前請先在 GitHub 建立空 repo，例如：
#   https://github.com/balac1106/japan-geography-app
#
# 用法：
#   ./scripts/push-japan-geography-to-new-repo.sh balac1106/japan-geography-app

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "用法: $0 <github-owner/repo>"
  echo "範例: $0 balac1106/japan-geography-app"
  exit 1
fi

TARGET_REPO="$1"
BRANCH="japan-geography-app-standalone"

echo "→ 推送到 https://github.com/${TARGET_REPO}.git"
git push "https://github.com/${TARGET_REPO}.git" "${BRANCH}:main"

echo ""
echo "✅ 完成！"
echo "   Repo: https://github.com/${TARGET_REPO}"
