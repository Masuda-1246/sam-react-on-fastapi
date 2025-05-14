from datetime import UTC, datetime
from typing import Any

import boto3
from boto3.resources.base import ServiceResource
from botocore.exceptions import ClientError

from .config import settings


class DynamoDBClient:
    """DynamoDBクライアントクラス"""

    def __init__(self, table_name: str) -> None:
        """DynamoDBクライアントの初期化

        Args:
            table_name: 使用するテーブル名（デフォルト: Todos）

        """
        # ローカル開発環境用の設定
        self.local_mode = settings.APP_ENV == "dev"
        self.table_name = table_name

        if self.local_mode:
            # ローカルDynamoDBエンドポイントの設定
            self.dynamodb = boto3.resource(
                "dynamodb",
                endpoint_url=settings.DYNAMODB_ENDPOINT,
                region_name=settings.AWS_REGION,
                aws_access_key_id="dummy",  # ローカル開発用ダミー値
                aws_secret_access_key="dummy",  # ローカル開発用ダミー値 # noqa: S106
            )
        else:
            # 本番環境用のDynamoDB設定（環境変数から認証情報を取得）
            self.dynamodb = boto3.resource("dynamodb", region_name=settings.AWS_REGION)

        self.table_name = table_name
        self.table = self.dynamodb.Table(self.table_name)

    def create_table_if_not_exists(self) -> ServiceResource:
        """テーブルが存在しない場合に作成する"""
        # 既存のテーブル一覧を取得
        existing_tables = self.dynamodb.meta.client.list_tables()["TableNames"]

        if self.table_name not in existing_tables:
            # テーブルが存在しない場合は作成
            self.dynamodb.create_table(
                TableName=self.table_name,
                KeySchema=[
                    {"AttributeName": "id", "KeyType": "HASH"}  # パーティションキー
                ],
                AttributeDefinitions=[{"AttributeName": "id", "AttributeType": "S"}],
                ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
            )
            # テーブルが利用可能になるまで待機
            self.dynamodb.meta.client.get_waiter("table_exists").wait(TableName=self.table_name)

        return self.table

    # Create操作
    def create_todo(self, todo_data: dict[str, Any]) -> dict[str, Any]:
        """新しいTodoアイテムを作成する

        Args:
            todo_data: 作成するTodoアイテムのデータ

        Returns:
            作成したTodoアイテムのデータ

        """
        # 現在時刻を文字列形式で取得
        now = datetime.now(tz=UTC).isoformat()

        # アイテムデータを作成
        item = {**todo_data, "created_at": now, "updated_at": now}

        # DynamoDBにアイテムを追加
        self.table.put_item(Item=item)
        return item

    # Read操作（単一アイテム）
    def get_todo(self, todo_id: str) -> dict[str, Any] | None:
        """指定したIDのTodoアイテムを取得する

        Args:
            todo_id: 取得するTodoアイテムのID

        Returns:
            取得したTodoアイテムのデータ、存在しない場合はNone

        """
        try:
            response = self.table.get_item(Key={"id": todo_id})
            return response.get("Item")
        except ClientError:
            return None

    # Read操作（全アイテム）
    def list_todos(self) -> list[dict[str, Any]]:
        """すべてのTodoアイテムを取得する

        Returns:
            取得したTodoアイテムのリスト

        """
        response = self.table.scan()
        return response.get("Items", [])

    # Update操作
    def update_todo(self, todo_id: str, update_data: dict[str, Any]) -> dict[str, Any] | None:
        """指定したIDのTodoアイテムを更新する

        Args:
            todo_id: 更新するTodoアイテムのID
            update_data: 更新するデータ

        Returns:
            更新後のTodoアイテムデータ、存在しない場合はNone

        """
        # 更新対象のアイテムが存在するか確認
        existing_item = self.get_todo(todo_id)
        if not existing_item:
            return None

        # 更新用の式を構築
        update_expression_parts = []
        expression_attribute_values = {}

        for key, value in update_data.items():
            if key != "id":  # IDは更新しない
                update_expression_parts.append(f"#{key} = :{key}")
                expression_attribute_values[f":{key}"] = value

        # 更新日時を追加
        update_expression_parts.append("#updated_at = :updated_at")
        expression_attribute_values[":updated_at"] = datetime.now(tz=UTC).isoformat()

        # 属性名のマッピングを作成
        expression_attribute_names = {f"#{k}": k for k in update_data if k != "id"}
        expression_attribute_names["#updated_at"] = "updated_at"

        # 更新を実行
        update_expression = "SET " + ", ".join(update_expression_parts)

        try:
            response = self.table.update_item(
                Key={"id": todo_id},
                UpdateExpression=update_expression,
                ExpressionAttributeNames=expression_attribute_names,
                ExpressionAttributeValues=expression_attribute_values,
                ReturnValues="ALL_NEW",
            )
            return response.get("Attributes")
        except ClientError:
            return None

    # Delete操作
    def delete_todo(self, todo_id: str) -> bool:
        """指定したIDのTodoアイテムを削除する

        Args:
            todo_id: 削除するTodoアイテムのID

        Returns:
            削除が成功したかどうか

        """
        try:
            self.table.delete_item(Key={"id": todo_id})
        except ClientError:
            return False
        else:
            return True
