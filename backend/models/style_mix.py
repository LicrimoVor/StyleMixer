from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy import Column, PickleType, ForeignKey, Integer
from sqlalchemy.orm import Mapped, relationship, validates, reconstructor
from sqlalchemy_file import FileField

from schemas.style_mix import ImageSettingsSchema
from core.database import Base
from .image import Image

if TYPE_CHECKING:
    from .user import User


class ImageMix(Base):
    """Конкретный экземпляр микса."""

    img = Column(FileField, nullable=False)
    settings = Column(PickleType, nullable=False)

    user_id: Mapped[int] = Column(Integer, ForeignKey("user.id"))
    user: Mapped[User] = relationship(back_populates="image_mixs")

    style_mix_id: Mapped[int] = Column(Integer, ForeignKey("stylemix.id"))
    style_mix: Mapped[StyleMix] = relationship(back_populates="mixs")

    @validates("settings")
    def validate_name(self, key, value):
        ImageSettingsSchema(**value)
        return value

    @reconstructor
    def post_processing(self):
        self.settings = ImageSettingsSchema(self.settings)


class StyleMix(Base):
    """Обертка перед миксами."""

    content_id: Mapped[int] = Column(Integer, ForeignKey("image.id"))
    content: Mapped[Image] = relationship(
        back_populates="style_mix_contents",
        foreign_keys="StyleMix.content_id",
    )
    style_id: Mapped[int] = Column(Integer, ForeignKey("image.id"))
    style: Mapped[Image] = relationship(
        back_populates="style_mix_styles",
        foreign_keys="StyleMix.style_id",
    )
    mixs: Mapped[List[ImageMix]] = relationship(back_populates="style_mix")

    user_id: Mapped[int] = Column(Integer, ForeignKey("user.id"))
    user: Mapped[User] = relationship(back_populates="style_mixs")
