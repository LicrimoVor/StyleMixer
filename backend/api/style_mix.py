from typing import Annotated

from fastapi import APIRouter, Form, Request, Response
from sqlalchemy import select
from PIL import Image

from schemas.style_mix import StyleMixSchema, ImageSettingsSchema
from core.database import SessionDep
from models.style_mix import StyleMix

from .utils.get_user import get_user
from .utils.create_or_get_img import create_or_get
from .utils.create_img_mix import create_img_mix


style_mix = APIRouter(prefix="/image")


@style_mix.post("")
async def create_style_mix(
    request: Request,
    form_data: Annotated[StyleMixSchema, Form()],
    session: SessionDep,
):
    if not (user := get_user(request, session)):
        return Response(status_code=401)
    content_model, is_created_content = create_or_get(form_data.content, session)
    style_model, is_created_style = create_or_get(form_data.style, session)

    if is_created_content or is_created_style:
        style_mix = StyleMix(user=user, content=content_model, style=style_model)
        session.add(style_mix)
    else:
        style_mix_statement = (
            select(StyleMix)
            .where(StyleMix.user == user)
            .where(StyleMix.content == content_model)
            .where(StyleMix.style == style_model)
        )
        style_mix = session.scalar(style_mix_statement)

        if not style_mix:
            style_mix = StyleMix(user=user, content=content_model, style=style_model)
            session.add(style_mix)

    session.commit()
    return {
        "id_api": style_mix.id,
        "content": f"/media/{content_model.img.file_id}",
        "style": f"/media/{style_model.img.file_id}",
    }


@style_mix.get("")
async def get_style_mixes(request: Request, session: SessionDep):
    if not (user := get_user(request, session)):
        return Response(status_code=401)

    result = {}
    for i, style_mix in enumerate(user.style_mixs):
        result[i] = {
            "id_api": style_mix.id,
            "content": f"/media/{style_mix.content.img.file_id}",
            "style": f"/media/{style_mix.style.img.file_id}",
            "mixs": [
                {"settings": image_mix.settings, "img": f"/media/{image_mix.img.file_id}"}
                for image_mix in style_mix.mixs
            ],
        }

    return result


@style_mix.delete("/{id}")
async def delete_style_mix(id: int, request: Request, session: SessionDep):
    if not (user := get_user(request, session)):
        return Response(status_code=401)

    statement = select(StyleMix).where(StyleMix.id == id).where(StyleMix.user == user)
    style_mix = session.scalar(statement)
    if not style_mix:
        return Response(status_code=404)
    session.delete(style_mix)
    session.commit()

    return Response(status_code=202)


@style_mix.post("/{id}/mix")
async def create_image_mix(
    id: int,
    request: Request,
    settings: ImageSettingsSchema,
    session: SessionDep,
):
    if not (user := get_user(request, session)):
        return Response(status_code=401)

    statement = select(StyleMix).where(StyleMix.id == id).where(StyleMix.user == user)
    style_mix = session.scalar(statement)
    if not style_mix:
        return Response(status_code=404)

    content = Image.open(style_mix.content.img.file)
    style = Image.open(style_mix.style.img.file)
    image_mix = create_img_mix(content, style, settings, user, style_mix)
    session.add(image_mix)
    session.commit()

    return {
        "settings": image_mix.settings,
        "img": f"/media/{image_mix.img.file_id}",
    }
