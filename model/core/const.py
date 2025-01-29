from pathlib import Path
from typing import Literal

import torch


BASE_PATH = Path(__file__).parent.parent
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
HOST_URL = "http://127.0.0.1:8080"
MODE: Literal["dev", "prod"] = "dev"


def path_to_url(style: Path):
    return HOST_URL + "/media" + str(style).split("wikiart")[1].replace("\\", "/")


STYLE_URLS = list(map(path_to_url, list(BASE_PATH.joinpath("data/wikiart").glob("**/*.jpg"))))
