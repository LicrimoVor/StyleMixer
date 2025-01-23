from io import BytesIO

from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy_file import File

from utils.converter_base64 import base64_to_pil
from utils.hash_buff import hash_buff

from models.image import Image


def create_or_get(img: str, session: Session) -> tuple[Image, bool]:
    pillow = base64_to_pil(img)
    buffer = BytesIO()
    pillow.save(buffer, format="JPEG")
    hash_img = hash_buff(buffer.getvalue())

    statement = select(Image).where(Image.hash == hash_img)
    if model := session.scalar(statement):
        return model, False
    else:
        filename = hash_img + ".jpeg"
        file = File(buffer.getvalue(), filename=filename, content_type="image/jpeg")
        model = Image(img=file, hash=hash_img)
        session.add(model)
        return model, True
