from torch import nn

EXCLUDED = ["ConvBlock", "ConvResizeX2"]


def weights_init(m: nn.Module):
    classname = m.__class__.__name__
    if classname in EXCLUDED:
        pass
    elif classname.find("Conv") != -1:
        nn.init.normal_(m.weight.data, 0.0, 0.02)
    elif classname.find("BatchNorm") != -1:
        nn.init.normal_(m.weight.data, 1.0, 0.02)
        nn.init.constant_(m.bias.data, 0)
