#!/usr/bin/env bash
set -euo pipefail

docker stop yy-mobile-web 2>/dev/null || true
docker rm yy-mobile-web 2>/dev/null || true
echo "已停止并删除容器 yy-mobile-web（若存在）。"
