#!/usr/bin/env bash
set -euo pipefail

# CentOS 7：在项目根目录执行。优先使用 Docker Compose V2（docker compose），否则尝试 V1（docker-compose）。

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if docker compose version &>/dev/null; then
  exec docker compose up -d --build
elif command -v docker-compose &>/dev/null; then
  exec docker-compose up -d --build
else
  echo "未找到 docker compose 或 docker-compose，请先安装 Docker CE 与 Compose 插件。" >&2
  exit 1
fi
