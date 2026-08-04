#!/usr/bin/env bash

# 出错立即停止执行
set -e

# 确保脚本在 trading-landing-page 根目录下运行
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

# 1. 加载 .env 配置文件
if [ -f .env ]; then
  echo "🔍 加载 .env 配置文件..."
  # 过滤注释行和空行后导出环境变量
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
  echo "⚠️ 未找到 .env 文件，请参考 .env.example 进行配置！"
  exit 1
fi

# 检查必需变量
if [ -z "${DOCKER_REGISTRY}" ] || [ -z "${DOCKER_USERNAME}" ]; then
  echo "❌ 错误: .env 中未配置 DOCKER_REGISTRY 或 DOCKER_USERNAME！"
  exit 1
fi

# 2. 从 package.json 中获取版本信息
VERSION=$(node -e "console.log(JSON.parse(require('fs').readFileSync('package.json', 'utf8')).version)" 2>/dev/null || grep '"version":' package.json | head -1 | cut -d '"' -f 4 || echo "1.0.0")

# 组合镜像 Tag (例如: v1.0.0)
# 若 VERSION 以 v 开头则直接使用，否则加上 v 前缀
if [[ "${VERSION}" == v* ]]; then
  TAG="${VERSION}"
else
  TAG="v${VERSION}"
fi

IMAGE_BASE="${DOCKER_REGISTRY}/trading-landing-page"
FULL_TAG_IMAGE="${IMAGE_BASE}:${TAG}"

echo "=================================================="
echo "📦 开始构建 Docker 镜像"
echo "  镜像仓库: ${DOCKER_REGISTRY}"
echo "  镜像名称: ${IMAGE_BASE}"
echo "  版本标签: ${TAG}"
echo "=================================================="

# 3. 自动登录私有镜像仓库
if [ -n "${DOCKER_PASSWORD}" ]; then
  echo "🔐 正在登录私有仓库 ${DOCKER_REGISTRY}..."
  echo "${DOCKER_PASSWORD}" | docker login "${DOCKER_REGISTRY}" -u "${DOCKER_USERNAME}" --password-stdin
fi

# 4. 执行 Docker 构建与推送 (linux/amd64)
echo "🔨 正在使用 buildx 打包并推送 Docker 镜像 (linux/amd64)..."
docker buildx build --platform linux/amd64 -t "${FULL_TAG_IMAGE}" --push .

echo "=================================================="
echo "🎉 镜像构建与推送完成！"
echo ""
echo "📌 镜像地址:"
echo "   ${FULL_TAG_IMAGE}"
echo "=================================================="
