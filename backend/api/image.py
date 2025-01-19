from typing import Annotated

from fastapi import APIRouter, Form, Request
from PIL import ImageFilter

from models.image_mix import ImageMix
from utils.base64_to_pil import base64_to_pil
from utils.pil_to_base64 import pil_to_base64


image_router = APIRouter(prefix="/image")


@image_router.post("")
async def image_mix(request: Request, form_data: Annotated[ImageMix, Form()]):
    img = base64_to_pil(form_data.content)
    img = img.filter(ImageFilter.BLUR)
    base64 = pil_to_base64(img)

    return {"img": base64, "settings": form_data.settings}
