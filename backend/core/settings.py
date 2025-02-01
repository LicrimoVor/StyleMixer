from typing import Literal
from pathlib import Path
import os

from dotenv import load_dotenv

from starlette.formparsers import MultiPartParser

load_dotenv()

MultiPartParser.max_part_size = 10 * 1024 * 1024  # MB
MultiPartParser.max_file_size = 20 * 1024 * 1024  # MB

PATH_BASE = Path(__file__).parent.parent
MODE: Literal["dev", "prod"] = os.getenv("MODE")

DATABASE_URL = "sqlite:///./storage/sqlite.db"
MODEL_URL = "http://localhost:8081" if MODE == "dev" else "http://model:8081"
HOST_URL = "127.0.0.1" if MODE == "dev" else os.getenv("HOST_URL")

API_TITLE = "StyleMixApi"
