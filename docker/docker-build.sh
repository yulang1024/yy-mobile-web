#!/usr/bin/env bash
set -euo pipefail

# 在项目根目录执行；可选传入镜像名与 tag
IMAGE_NAME="${1:-yy-mobile-web}"
TAG="${2:-latest}"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# 若后端由容器内 Nginx 代理，VITE_API_URL 应为空
docker build \
  --build-arg VITE_API_URL="${VITE_API_URL:-}" \
  --build-arg VITE_APP_TITLE="${VITE_APP_TITLE:-YY移动端}" \
  --build-arg VITE_APP_ENV="${VITE_APP_ENV:-production}" \
  -t "${IMAGE_NAME}:${TAG}" \
  .

echo "镜像已构建: ${IMAGE_NAME}:${TAG}"
