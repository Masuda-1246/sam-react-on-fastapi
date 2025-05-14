# ステージ1: フロントエンドのビルド
FROM node:22-slim AS frontend-builder

WORKDIR /app/frontend

# パッケージ依存関係をコピーしてインストール
COPY frontend/package*.json ./
RUN npm ci

# フロントエンドのソースコードをコピー
COPY frontend/ ./

# フロントエンドをビルド
RUN npm run build

# ステージ2: バックエンドのビルドと実行
FROM python:3.12-slim

WORKDIR /app

ENV POETRY_VERSION=2.1.2
ENV POETRY_HOME="/opt/poetry"
ENV POETRY_VIRTUALENVS_CREATE=false
ENV POETRY_VIRTUALENVS_IN_PROJECT=false
ENV PATH="$POETRY_HOME/bin:$PATH"

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Poetryをインストール
RUN curl -sSL https://install.python-poetry.org | python3 - \
    && poetry --version

# AWS Lambda Adapterをコピー
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

# バックエンドの依存関係をコピーしてインストール
COPY backend/pyproject.toml backend/poetry.lock* ./
RUN poetry install --no-root --no-interaction --no-ansi

# バックエンドのソースコードをコピー
COPY backend/ .

# フロントエンドのビルド結果をバックエンドの静的ファイルディレクトリにコピー
COPY --from=frontend-builder /app/frontend/dist/ ./app/static/

# アプリケーションを実行するユーザーを設定
RUN mkdir -p /tmp/.cache
ENV HOME="/tmp"
ENV PYTHONUNBUFFERED=1

# アプリケーションを実行
CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:8080", "-w", "2", "-k", "uvicorn.workers.UvicornWorker"] 
