from pathlib import Path

import torchvision.transforms.v2 as T
import torch
import matplotlib.pyplot as plt
from matplotlib.axes import Axes

from .denorm import denorm


transform = T.ToPILImage()


def save_picture(*args: list[torch.Tensor], path: Path = "test.png", title: str = None):
    """Сохраняет фотографии."""
    figure, axs = plt.subplots(len(args), len(args[0]))
    figure.set_figheight(len(args) * 1.5)
    figure.set_figwidth(len(args[0]) * 2)

    if title is not None:
        figure.suptitle(title)

    for i in range(len(args)):

        for j in range(len(args[0])):
            ax: Axes = axs[i][j]
            img = transform(denorm(args[i][j]))

            ax.imshow(img)
            ax.axis("off")
    figure.savefig(path, pad_inches=0)
