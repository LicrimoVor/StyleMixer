from typing import Literal
from starlette.formparsers import MultiPartParser

MultiPartParser.max_part_size = 10 * 1024 * 1024  # MB
MultiPartParser.max_file_size = 20 * 1024 * 1024  # MB
MODE: Literal["dev", "prod"] = "dev"
DATABASE_URL = "sqlite:///./sqlite.db" if MODE == "dev" else None
API_TITLE = "StyleMixApi"
HOST = "127.0.0.1"
