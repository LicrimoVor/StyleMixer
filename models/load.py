def download():
    import kagglehub

    path = kagglehub.dataset_download("steubk/wikiart")
    print(path)
    path = kagglehub.dataset_download("awsaf49/coco-2017-dataset")
    print(path)


def check_count():
    from pathlib import Path

    data_path = Path(__file__).parent.joinpath("data")
    content = list(data_path.joinpath("coco2017").glob("**/*.jpg"))
    style = list(data_path.joinpath("wikiart").glob("**/*.jpg"))

    print(f"Content count: {len(content)}")
    print(f"Style count: {len(style)}")


check_count()
