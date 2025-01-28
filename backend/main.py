from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.settings import API_TITLE, MODE, HOST_URL
from api.routers import main_router


app = FastAPI(
    title=API_TITLE,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)
origins = [f"http://{HOST_URL}"]
if MODE == "dev":
    origins += [
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://127.0.0.1:3000",
    ]

    from fastapi.staticfiles import StaticFiles

    app.mount("/api/media/", StaticFiles(directory="storage/images"))


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(main_router)
