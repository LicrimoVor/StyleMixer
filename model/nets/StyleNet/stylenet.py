from pathlib import Path

import torch
from torchvision.transforms import v2
from PIL.ImageFile import ImageFile

from utils.denorm import denorm
from core.const import BASE_PATH

from ..abstract import DataType, AbstractNet
from .decoder import Decoder
from .encoder import Encoder
from .net import ModelNet


PATH_MODEL = BASE_PATH.joinpath("data/nets/StyleNet.pth")
trans_1 = v2.Compose(
    [
        v2.ToImage(),
        v2.ToDtype(torch.float32, scale=True),
        v2.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225)),
    ]
)
trans_2 = v2.ToPILImage()


class StyleNet(AbstractNet):

    def __init__(self, device: torch.device) -> None:
        self.decoder = Decoder.load(PATH_MODEL)
        self.encoder = Encoder().to(device)
        self.model = ModelNet(self.encoder, self.decoder).to(device)
        self.model.eval()
        self.device = device

    def __call__(self, data: DataType) -> ImageFile:
        data = self.resize_data(data)
        content = trans_1(data["content"]).unsqueeze(0).to(self.device)
        style = trans_1(data["style"]).unsqueeze(0).to(self.device)

        with torch.no_grad():
            out = self.model(content, style, data["alpha"])

        return trans_2(denorm(out.cpu()[0]))
