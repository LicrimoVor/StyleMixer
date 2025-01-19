from typing import Literal

MODE: Literal["dev", "prod"] = "dev"
DATABASE_URL = "sqlite:///./sqlite.db" if MODE == "dev" else None
API_TITLE = "StyleMixApi"
HOST = ""
