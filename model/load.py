"""Загрузка датасета"""

import requests
from pathlib import Path

import kagglehub


def download_dataset():
    """Вызвать ее, чтобы скачать датасет."""
    path = kagglehub.dataset_download("steubk/wikiart")
    print(path)
    path = kagglehub.dataset_download("awsaf49/coco-2017-dataset")
    print(path)

    print("Необходимо перенести датасет в директорию ./data")


def check_count():
    """Вызвать ее, чтобы проверить количество файлов."""
    data_path = Path(__file__).parent.joinpath("data")
    content = list(data_path.joinpath("coco2017").glob("**/*.jpg"))
    style = list(data_path.joinpath("wikiart").glob("**/*.jpg"))

    print(f"Content count: {len(content)}")
    print(f"Style count: {len(style)}")


def download_model():
    response = requests.get(
        "https://drive.usercontent.google.com/u/0/uc?id=1MUNsqLdWWWW-gwQy99ZhnjRrKi9U_xKB&export=download"  # noqa
    )
    path = Path(__file__).parent.joinpath("nets/StyleNet/model.pth")
    with open(path, "+wb") as f:
        f.write(response.content)
    print("Success!")

    response = requests.get(
        "https://drive.usercontent.google.com/u/0/uc?id=1aTS_O3FfLzq5peh20vbWfU4kNAnng6UT&export=download"  # noqa
    )
    path = Path(__file__).parent.joinpath("nets/OtherNet/model.pth")
    with open(path, "+wb") as f:
        f.write(response.content)
    print("Success!")


# download()
# check_count()
download_model()
