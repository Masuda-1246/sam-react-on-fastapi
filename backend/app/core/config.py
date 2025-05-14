from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # 環境変数
    AWS_REGION: str = "ap-northeast-1"
    BASIC_AUTH_USERNAME: str = "admin"
    # ローカル開発用の仮パスワード（実環境では環境変数から読み込む）
    BASIC_AUTH_PASSWORD: str = "password"  # noqa: S105
    DYNAMODB_TABLE_NAME: str = "Todos"
    APP_ENV: str = "dev"
    DYNAMODB_ENDPOINT: str = "http://localhost:8000"
    model_config = SettingsConfigDict()


settings = Settings()
