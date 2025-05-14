"""OpenAPI仕様をJSONファイルとして出力するスクリプト

使用方法:
- backend ディレクトリ内で実行: python scripts/export_openapi.py
- または直接実行: ./scripts/export_openapi.py
"""

import logging
import sys
from pathlib import Path

logger = logging.getLogger(__name__)

# スクリプトのあるディレクトリの親ディレクトリをパスに追加
current_dir = Path(__file__).parent
parent_dir = current_dir.parent
sys.path.insert(0, str(parent_dir))


def export_openapi_json() -> None:
    try:
        # 必要なモジュールをインポート
        from fastapi.openapi.utils import get_openapi

        from main import app

        openapi_schema = get_openapi(title=app.title, version=app.version, openapi_version="3.1.0", routes=app.routes)

        output_dir = parent_dir
        openapi_path = output_dir / "openapi.json"

        with openapi_path.open("w") as f:
            import json

            json.dump(openapi_schema, f, indent=2)

        logger.info("OpenAPI仕様がファイルに出力されました: %s", openapi_path.absolute())
    except Exception:
        logger.exception("エラーが発生しました")


if __name__ == "__main__":
    export_openapi_json()
