# Backend

FastAPIを使用したバックエンドアプリケーション

## 環境設定

Python 3.13以上が必要です。

## インストール

```bash
# Poetryを使ったインストール
poetry install
```

## 実行方法

```bash
# 開発サーバーの起動
poetry run uvicorn app.main:app --reload
```

## API ドキュメント

サーバー起動後、以下のURLでSwagger UIベースのAPIドキュメントにアクセスできます：

- http://localhost:8080/docs
- http://localhost:8080/redoc 