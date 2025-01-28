from typing import Generator

from torch import Tensor
from torch.utils.data import DataLoader


def loader(content: DataLoader, style: DataLoader) -> Generator[tuple[Tensor, Tensor], None, None]:
    """Генератор контента и стиля."""
    iter_content = iter(content)
    iter_style = iter(style)
    assert len(style) == len(content)

    for content_img in iter_content:
        style_img = next(iter_style)
        yield content_img, style_img


def create_loader(content: DataLoader, style: DataLoader):
    """Позволяет создать лоадер, объединяющий 2 DataLoader."""

    def wrapper():
        return loader(content, style)

    wrapper.__setattr__("length", len(content))
    return wrapper
