import uuid
from datetime import datetime

from pydantic import BaseModel


class TodoCreate(BaseModel):
    """Todoアイテム作成用のモデル"""

    title: str
    description: str | None = None
    completed: bool = False


class TodoUpdate(BaseModel):
    """Todoアイテム更新用のモデル"""

    title: str | None = None
    description: str | None = None
    completed: bool | None = None


class TodoResponse(BaseModel):
    """Todoアイテムのレスポンスモデル"""

    id: str
    title: str
    description: str | None = None
    completed: bool
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        """モデル設定クラス"""

        from_attributes = True


def generate_id() -> str:
    """ユニークなIDを生成する"""
    return str(uuid.uuid4())
