from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from api.routers import main_router


app = FastAPI()
app.mount("/media", StaticFiles(directory="data/styles"))
app.include_router(main_router)
