from __future__ import annotations
from typing_extensions import Annotated

from pydantic import BaseModel, BeforeValidator

from utils.as_form import as_form
from utils.form_to_dict import form_to_dict


class StyleSettings(BaseModel):
    """Настройик преобразования"""

    model: str
    size: int


class ImageMix(BaseModel):
    """Сущность экземпляра одного преобразования."""

    content: str
    style: str
    settings: Annotated[StyleSettings, BeforeValidator(form_to_dict)]
