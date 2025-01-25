from pathlib import Path

import torch
from PIL import Image

from torch.utils.data import Dataset
from torchvision.transforms import v2

SIZE = 256, 256


class StyleDataset(Dataset):

    def __init__(self, contents: list[Path], styles: list[Path], size: tuple[int, int] = SIZE):
        super().__init__()
        self.length = min(len(contents), len(styles))
        self.contents = contents[: self.length]
        self.styles = styles[: self.length]

        self.transformers = v2.Compose(
            [
                v2.PILToTensor(),
                v2.Resize(size),
                v2.ToDtype(torch.float32, scale=True),
                v2.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
            ]
        )

    def load_img(self, path: Path):
        img = Image.open(path)
        img.load()
        return img

    def __len__(self):
        return self.length

    def __getitem__(self, index: int) -> tuple[torch.Tensor, torch.Tensor]:
        content_path = self.contents[index]
        style_path = self.styles[index]
        content = self.transformers(self.load_img(content_path))
        style = self.transformers(self.load_img(style_path))

        return content, style
