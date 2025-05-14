from pathlib import Path
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.security import HTTPBasicCredentials
from fastapi.staticfiles import StaticFiles

from app.api.backend import get_current_username
from app.api.backend import router as todo_router

load_dotenv()

app = FastAPI(title="FastAPI React Backend")

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Todoルーターの登録
app.include_router(todo_router)


@app.get("/api/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


# 静的ファイルの提供設定
static_dir = Path(__file__).parent / "app" / "static"
if static_dir.exists():
    # 静的アセットの提供
    if (static_dir / "assets").exists():
        app.mount("/assets", StaticFiles(directory=static_dir / "assets"), name="assets")
    icon_name = "vite.svg"
    icon_path = static_dir / icon_name
    if icon_path.exists():
        @app.get(f"/{icon_name}")
        async def serve_icon() -> FileResponse:
            return FileResponse(icon_path)

    @app.get("/{full_path:path}")
    async def serve_react_app(
        full_path: str,
        _: Annotated[HTTPBasicCredentials, Depends(get_current_username)],
    ) -> FileResponse:
        index_path = static_dir / "index.html"
        if index_path.exists():
            return FileResponse(index_path)
        raise HTTPException(status_code=404, detail="File not found")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8080,
        reload=True,
    )
