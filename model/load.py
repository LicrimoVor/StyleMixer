"""Загрузка датасета"""

import requests
from pathlib import Path
import zipfile


def download_dataset():
    """Вызвать ее, чтобы скачать датасет."""
    import kagglehub

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
    data_path = Path(__file__).parent.joinpath("data/nets")
    data_path.mkdir(exist_ok=True)
    file_path_1 = data_path.joinpath("StyleNet.pth")
    file_path_2 = data_path.joinpath("OtherNet.pth")

    if file_path_1.exists() and file_path_2.exists():
        return

    response = requests.get(
        "https://drive.usercontent.google.com/u/0/uc?id=1MUNsqLdWWWW-gwQy99ZhnjRrKi9U_xKB&export=download"  # noqa
    )

    with open(file_path_1, "+wb") as f:
        f.write(response.content)
    print("Success!")

    response = requests.get(
        "https://drive.usercontent.google.com/u/0/uc?id=1aTS_O3FfLzq5peh20vbWfU4kNAnng6UT&export=download"  # noqa
    )

    with open(file_path_2, "+wb") as f:
        f.write(response.content)
    print("Success!")


def download_styles():
    data_path = Path(__file__).parent.joinpath("data/styles")
    data_path.mkdir(exist_ok=True)
    file_path = data_path.joinpath("styles.zip")
    if file_path.exists():
        return

    response = requests.get(
        "https://drive.usercontent.google.com/u/0/uc?id=1o0xgXfy9GdIdm9gDi4HqSq3wBKulLDQS&export=download"  # noqa
    )

    with open(file_path, "+wb") as f:
        f.write(response.content)

    with zipfile.ZipFile(file_path, "r") as zip_ref:
        zip_ref.extractall(data_path)
    print("Success!")


# download()
# check_count()
download_model()
download_styles()
