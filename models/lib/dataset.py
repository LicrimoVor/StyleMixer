from typing import Literal
from pathlib import Path

import torch
from PIL import Image

from torch.utils.data import Dataset
from torchvision.transforms import v2

SIZE = 128, 128
type ModeType = Literal["train", "valid", "test"]
# доступно только в python 3.12.0+


class DatasetPhoto(Dataset):

    def __init__(self, paths: list[Path], mode: ModeType):
        super().__init__()
        self.paths = paths

        if mode == "train":
            self.transformers = v2.Compose(
                [
                    v2.PILToTensor(),
                    v2.Resize(SIZE),
                    v2.CenterCrop(SIZE),
                    v2.RandomHorizontalFlip(0.5),
                    v2.ToDtype(torch.float32, scale=True),
                    v2.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
                ]
            )
        else:
            self.transformers = v2.Compose(
                [
                    v2.PILToTensor(),
                    v2.Resize(SIZE),
                    v2.ToDtype(torch.float32, scale=True),
                    v2.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
                ]
            )

    def load_img(self, path: Path):
        img = Image.open(path)
        img.load()
        return img

    def __len__(self):
        return len(self.paths)

    def __getitem__(self, index: int):
        path = self.paths[index]
        photo = self.load_img(path)
        photo = self.transformers(photo)

        return photo
