from typing import Literal
from typing_extensions import Annotated

from pydantic import BaseModel, AfterValidator, PositiveFloat


SIZE_VALUES = {128, 256, 512}


def validate_size(value):
    if value not in SIZE_VALUES:
        raise ValueError(f"Значение должно быть одним из: {SIZE_VALUES}")
    return value


class ImageSettingsSchema(BaseModel):
    """Настройик преобразования"""

    model: Literal["VGG16", "VGG19"]
    size: Annotated[int, AfterValidator(validate_size)]
    alpha: PositiveFloat


class StyleMixSchema(BaseModel):
    """Сущность экземпляра одного преобразования."""

    content: str
    style: str
