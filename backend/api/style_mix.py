from typing import Annotated
from io import BytesIO

from fastapi import APIRouter, Form, Request, Response
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy_file import File
from PIL import ImageFilter

from schemas.style_mix import StyleMixSchema
from core.consts import COOKIE_ANONYMUS_SESSIONKEY
from core.database import SessionDep
from utils.base64_to_pil import base64_to_pil
from utils.pil_to_base64 import pil_to_base64
from utils.hash_buff import hash_buff
from models.style_mix import StyleMix, ImageMix
from models.image import Image
from models.user import User


style_mix = APIRouter(prefix="/image")


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


@style_mix.post("")
async def create_image_mix(
    request: Request,
    form_data: Annotated[StyleMixSchema, Form()],
    session: SessionDep,
):
    if not (token := request.cookies.get(COOKIE_ANONYMUS_SESSIONKEY)):
        return Response(status_code=401)

    statement = select(User).where(User.token == token)
    user = session.scalar(statement)
    content_model, is_created_content = create_or_get(form_data.content, session)
    style_model, is_created_style = create_or_get(form_data.style, session)

    if is_created_content or is_created_style:
        style_mix = StyleMix(user=user, content=content_model, style=style_model)
        session.add(style_mix)
    else:
        style_mix_statement = select(StyleMix).where(StyleMix.user == user)
        style_mix = session.scalar(style_mix_statement)

    # !!!!!!!!!!!!!!!!!!!!!!!!!
    img = base64_to_pil(form_data.content)
    img = img.filter(ImageFilter.BLUR)
    buff_img = BytesIO()
    img.save(buff_img, format="JPEG")
    # !!!!!!!!!!!!!!!!!!!!!!!!!

    filename = "mix_" + hash_buff(buff_img.getvalue()) + ".jpeg"
    file = File(buff_img.getvalue(), filename=filename, content_type="image/jpeg")
    image_mix = ImageMix(
        img=file,
        settings=form_data.settings,
        user=user,
        style_mix=style_mix,
    )
    session.add(image_mix)
    session.commit()
    return {
        "img": pil_to_base64(img),
        "settings": form_data.settings,
        "id_content": 1,
        "id_style": 2,
    }


@style_mix.get("")
async def get_style_mixes(request: Request):
    if request.cookies.get(COOKIE_ANONYMUS_SESSIONKEY):
        return Response(status_code=401)

    # img = base64_to_pil(form_data.content)
    # img = img.filter(ImageFilter.BLUR)
    # base64 = pil_to_base64(img)
