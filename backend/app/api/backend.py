import secrets
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from app.core.config import settings
from app.core.db import DynamoDBClient
from app.core.models import TodoCreate, TodoResponse, TodoUpdate, generate_id

router = APIRouter(prefix="/api/todos", tags=["todos"])

# 認証関連
basic = HTTPBasic()


def get_current_username(credentials: HTTPBasicCredentials = Depends(basic)) -> str:
    correct_username = secrets.compare_digest(credentials.username, settings.BASIC_AUTH_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, settings.BASIC_AUTH_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


# DynamoDBクライアントのインスタンスを取得する依存関数
def get_dynamodb() -> DynamoDBClient:
    client = DynamoDBClient(table_name=settings.DYNAMODB_TABLE_NAME)
    client.create_table_if_not_exists()
    return client


@router.post("")
async def create_todo(
    todo: TodoCreate,
    db: Annotated[DynamoDBClient, Depends(get_dynamodb)],
    _: Annotated[str, Depends(get_current_username)],
) -> TodoResponse:
    """新しいTodoアイテムを作成する"""
    todo_data = todo.model_dump()
    todo_data["id"] = generate_id()

    return db.create_todo(todo_data)


@router.get("")
async def get_todos(
    db: Annotated[DynamoDBClient, Depends(get_dynamodb)], _: Annotated[str, Depends(get_current_username)]
) -> list[TodoResponse]:
    """すべてのTodoアイテムを取得する"""
    return db.list_todos()


@router.get("/{todo_id}")
async def get_todo(
    todo_id: str, db: Annotated[DynamoDBClient, Depends(get_dynamodb)], _: Annotated[str, Depends(get_current_username)]
) -> TodoResponse:
    """指定したIDのTodoアイテムを取得する"""
    todo = db.get_todo(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.put("/{todo_id}")
async def update_todo(
    todo_id: str,
    todo: TodoUpdate,
    db: Annotated[DynamoDBClient, Depends(get_dynamodb)],
    _: Annotated[str, Depends(get_current_username)],
) -> TodoResponse:
    """指定したIDのTodoアイテムを更新する"""
    # 更新するフィールドのみを抽出
    update_data = {k: v for k, v in todo.model_dump().items() if v is not None}

    updated_todo = db.update_todo(todo_id, update_data)
    if not updated_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated_todo


@router.delete("/{todo_id}", response_model=dict)
async def delete_todo(
    todo_id: str, db: Annotated[DynamoDBClient, Depends(get_dynamodb)], _: Annotated[str, Depends(get_current_username)]
) -> dict[str, str]:
    """指定したIDのTodoアイテムを削除する"""
    success = db.delete_todo(todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted successfully"}
