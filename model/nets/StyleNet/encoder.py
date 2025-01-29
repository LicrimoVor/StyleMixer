from torch import nn, Tensor
from torchvision.models import vgg16
from torchvision.models.vgg import VGG16_Weights

from ..abstract import AbstractModule


class Encoder(AbstractModule):
    name = "encoder"

    def __init__(self):
        super().__init__()
        model = vgg16(weights=VGG16_Weights.DEFAULT).features
        for p in model.parameters():
            p.requires_grad = False

        # self.blocks = nn.Sequential(
        #     model[:4],
        #     model[4:9],
        #     model[9:16],
        #     model[16:23],
        # )
        self.blocks = nn.Sequential(
            model[:2],
            model[2:7],
            model[7:12],
            model[12:21],
        )
        for p in self.parameters():
            p.requires_grad = False

    def forward(self, x: Tensor) -> Tensor:
        result = []
        for block in self.blocks:
            x = block(x)
            result.append(x)

        return result
