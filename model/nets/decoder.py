from torch import nn, Tensor

from .abstract import AbstractModule


class ConvBlock(nn.Module):
    """Сверточный блок."""

    def __init__(self, inp: int, out: int, kernel_size: int, stride=1, padding=1):
        super().__init__()
        self.conv = nn.Conv2d(inp, out, kernel_size, stride, padding, bias=False)
        self.norm = nn.InstanceNorm2d(out)
        self.act = nn.ReLU(inplace=True)

    def forward(self, x: Tensor) -> Tensor:
        out = self.act(self.norm(self.conv(x)))
        return out


class Decoder(AbstractModule):
    name = "decoder"

    def __init__(self):
        super().__init__()

        self.main = nn.Sequential(
            ConvBlock(512, 256, 3, 1),
            nn.Upsample(scale_factor=2),
            ConvBlock(256, 256, 3, 1),
            ConvBlock(256, 128, 3, 1),
            nn.Upsample(scale_factor=2),
            ConvBlock(128, 128, 3, 1),
            ConvBlock(128, 128, 3, 1),
            ConvBlock(128, 64, 3, 1),
            nn.Upsample(scale_factor=2),
            ConvBlock(64, 64, 3, 1),
            ConvBlock(64, 64, 3, 1),
            nn.Conv2d(64, 3, 3, 1, padding=1, bias=False),
        )

    def forward(self, x: Tensor) -> Tensor:
        return self.main(x)
