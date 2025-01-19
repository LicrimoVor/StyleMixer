from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from settings import API_TITLE, MODE, HOST
from api.routers import main_router


app = FastAPI(
    title=API_TITLE,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)
origins = [f"http://{HOST}"]
if MODE == "dev":
    origins += [
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:8000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(main_router)


if __name__ == "__main__":
    uvicorn.run(app, port="8000", host="127.0.0.1")
