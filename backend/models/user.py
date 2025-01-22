from __future__ import annotations

from typing import List
import datetime as dt

from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy.sql import func

from core.consts import MAX_AGE_TOKEN
from core.database import Base
from .style_mix import ImageMix, StyleMix


class User(Base):
    """Модель пользователя."""

    token = Column(String, unique=True, nullable=False)
    created = Column(DateTime(timezone=True), server_default=func.now())
    image_mixs: Mapped[List[ImageMix]] = relationship(back_populates="user")
    style_mixs: Mapped[List[StyleMix]] = relationship(back_populates="user")

    @property
    def vilocity(self):
        """Возвращает оставшееся время жизни токена типа %D:%H:%M."""
        date_now = dt.datetime.now()
        dt_max = dt.timedelta(seconds=MAX_AGE_TOKEN)
        dt_fact = date_now - self.created
        return max(dt_max - dt_fact, 0)
