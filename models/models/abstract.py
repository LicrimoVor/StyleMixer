from pathlib import Path
from abc import ABC

from torch import nn
import torch

BASE_DIR = Path(__file__).parent


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
