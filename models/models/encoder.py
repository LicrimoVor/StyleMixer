from torch import nn, Tensor
from torchvision.models import vgg19

from .abstract import AbstractModule
from .libs.weights_init import weights_init


class Encoder(AbstractModule):
    name = "encoder"

    def __init__(self):
        super().__init__()
        model = vgg19(pretrained=True).features
        map(lambda p: setattr(p, "requires_grad", False), model.parameters())
        self.blocks = nn.Sequential(
            model[:4],
            model[4:9],
            model[9:18],
            model[18:27],
            model[27:],
        )
        self.apply(weights_init)

    def forward(self, x: Tensor) -> Tensor:
        result = []
        for block in self.blocks:
            x = block(x)

        return result
