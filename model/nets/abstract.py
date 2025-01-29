from pathlib import Path
from typing import TypedDict
from abc import ABC, abstractmethod

from PIL.ImageFile import ImageFile
from torch import nn
import torch
from torchvision.transforms import v2


BASE_DIR = Path(__file__).parent
DataType = TypedDict(
    "DataType",
    {
        "content": ImageFile,
        "style": ImageFile,
        "alpha": float,
        "size": int,
    },
)


class AbstractModule(ABC, nn.Module):
    name: str

    def save(self, path: Path):
        """Сохраняет модель"""
        torch.save(
            self.state_dict(),
            path.joinpath("model"),
        )
        with open(path.joinpath("struct.txt"), "+w") as file:
            file.write(str(self))

    def get_count_params(self):
        return sum(p.numel() for p in self.parameters())

    @classmethod
    def load(cls, path: str):
        model = cls()
        model.load_state_dict(torch.load(path, weights_only=True))
        model.eval()
        return model


class AbstractNet(ABC):
    model: AbstractModule
    device: torch.device

    @staticmethod
    def resize_data(data: DataType) -> ImageFile:
        if data["size"] == -1:
            return data

        transform = v2.Resize((data["size"], data["size"]))
        data["content"] = transform(data["content"])
        data["style"] = transform(data["style"])
        return data

    @abstractmethod
    def __call__(self, data: DataType) -> ImageFile: ...
