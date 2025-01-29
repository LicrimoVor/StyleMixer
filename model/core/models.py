from nets.OtherNet import OtherNet
from nets.StyleNet import StyleNet
from nets.abstract import AbstractNet

from .const import DEVICE


MODELS: dict[str, AbstractNet] = {
    "VGG16": StyleNet(DEVICE),
    "VGG19": OtherNet(DEVICE),
}
