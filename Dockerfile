# --- 构建阶段 ---
FROM node:20-alpine AS builder

WORKDIR /app

# 仅拷贝依赖清单，利用层缓存
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# 构建时注入 Vite 变量（与仓库 .env.production 等价时可省略）
# 容器内由 Nginx 代理 /api 时，建议 VITE_API_URL 为空，使请求走同源
ARG VITE_API_URL=
ARG VITE_APP_TITLE=YY移动端
ARG VITE_APP_ENV=production

ENV VITE_API_URL=$VITE_API_URL \
    VITE_APP_TITLE=$VITE_APP_TITLE \
    VITE_APP_ENV=$VITE_APP_ENV

RUN npm run build

# --- 运行阶段 ---
FROM nginx:1.26-alpine

LABEL org.opencontainers.image.title="yy-mobile-web"

# Nginx 官方镜像会在启动时对 /etc/nginx/templates/*.template 做 envsubst（仅替换已定义的环境变量）
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

# 后端地址：可运行时覆盖。API 在宿主机上时，Linux 需配合 --add-host=host.docker.internal:host-gateway
ENV API_UPSTREAM_HOST=host.docker.internal \
    API_UPSTREAM_PORT=8888

EXPOSE 80
