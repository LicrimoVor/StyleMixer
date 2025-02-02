import os


from nets.StyleNet import StyleNet
from nets.abstract import AbstractNet

from .const import DEVICE


MODELS: dict[str, AbstractNet] = {
    "VGG16": StyleNet(DEVICE),
}

if os.getenv("MODEL_VGG_19") == "True":
    from nets.OtherNet import OtherNet

    MODELS["VGG19"] = OtherNet(DEVICE)
