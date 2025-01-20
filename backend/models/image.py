from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy import String, Column
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy_file import FileField, ImageField

from core.database import Base

if TYPE_CHECKING:
    from .style_mix import StyleMix


class Image(Base):
    """Фотография."""

    img = Column(ImageField, nullable=False)
    hash = Column(String, unique=True, nullable=False)
    style_mix_contents: Mapped[List[StyleMix]] = relationship(
        back_populates="content",
        foreign_keys="StyleMix.content_id",
    )
    style_mix_styles: Mapped[List[StyleMix]] = relationship(
        back_populates="style",
        foreign_keys="StyleMix.style_id",
    )
