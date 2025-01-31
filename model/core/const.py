from pathlib import Path
from typing import Literal
import os

import torch
from dotenv import load_dotenv

load_dotenv()

MODE: Literal["dev", "prod"] = os.getenv("MODE")
BASE_PATH = Path(__file__).parent.parent
DEVICE = ("cuda" if torch.cuda.is_available() else "cpu") if MODE == "dev" else "cpu"
MODEL_URL = "http://127.0.0.1:8080" if MODE == "dev" else "http://model:8080"


def path_to_url(style: Path):
    return "/media" + str(style).split("styles")[1].replace("\\", "/")


STYLE_URLS = list(map(path_to_url, list(BASE_PATH.joinpath("data/styles").glob("**/*.jpg"))))
