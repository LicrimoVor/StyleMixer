from pathlib import Path

import torch
from torchvision.transforms import v2
from PIL.ImageFile import ImageFile

from core.const import BASE_PATH

from ..abstract import DataType, AbstractNet
from .model import Model
from .handler import handler


PATH_MODEL = BASE_PATH.joinpath("data/nets/OtherNet.pth")
transforms = v2.ToPILImage()


class OtherNet(AbstractNet):

    def __init__(self, device: torch.device) -> None:
        self.model = Model.load(PATH_MODEL).to(device)
        self.model.eval()
        self.device = device

    def __call__(self, data: DataType) -> ImageFile:
        data = self.resize_data(data)
        out = handler(self.model, data, self.device)
        return transforms(out[0])
