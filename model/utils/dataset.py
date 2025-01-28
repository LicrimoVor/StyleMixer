from pathlib import Path

import torch
from PIL import Image

from torch.utils.data import Dataset
from torchvision.transforms import v2


class StyleDataset(Dataset):
    """Датасет фото."""

    def __init__(self, paths: list[Path], size: tuple[int, int] = (256, 256)):
        super().__init__()
        self.length = len(paths)
        self.paths = paths

        self.transformers = v2.Compose(
            [
                v2.Resize(size),
                v2.ToImage(),
                v2.ToDtype(torch.float32, scale=True),
                v2.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
            ]
        )

    def __len__(self):
        return self.length

    def __getitem__(self, index: int) -> torch.Tensor:
        img_path = self.paths[index]
        img = self.transformers(Image.open(img_path))
        return img
