from __future__ import annotations

from typing import List

from sqlalchemy import Column, String
from sqlalchemy.orm import Mapped, relationship

from core.database import Base
from .style_mix import ImageMix, StyleMix


class User(Base):
    """Модель пользователя."""

    token = Column(String, unique=True, nullable=False)
    image_mixs: Mapped[List[ImageMix]] = relationship(back_populates="user")
    style_mixs: Mapped[List[StyleMix]] = relationship(back_populates="user")
