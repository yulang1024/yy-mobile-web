#!/usr/bin/env bash
set -euo pipefail

# 在 CentOS 7 / Linux 上运行前端容器。
# 后端在宿主机时务必使用 host.docker.internal 映射（Docker 20.10+）。

IMAGE_NAME="${1:-yy-mobile-web:latest}"
HOST_PORT="${HOST_PORT:-8080}"
API_HOST="${API_UPSTREAM_HOST:-host.docker.internal}"
API_PORT="${API_UPSTREAM_PORT:-8888}"

docker run -d \
  --name yy-mobile-web \
  -p "${HOST_PORT}:80" \
  -e API_UPSTREAM_HOST="$API_HOST" \
  -e API_UPSTREAM_PORT="$API_PORT" \
  --add-host=host.docker.internal:host-gateway \
  --restart unless-stopped \
  "$IMAGE_NAME"

echo "已启动: http://127.0.0.1:${HOST_PORT}"
echo "API 反代目标: ${API_HOST}:${API_PORT}（路径 /api 会去掉前缀后转发）"
