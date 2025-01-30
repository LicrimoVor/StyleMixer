import requests

from PIL.ImageFile import ImageFile

from schemas.style_mix import ImageSettingsSchema
from core.settings import MODEL_URL

from .converter_base64 import pil_to_base64, base64_to_pil


async def post_to_style_mix(
    content: ImageFile, style: ImageFile, settings: ImageSettingsSchema
) -> ImageFile:
    """Создает микс."""
    content_base64 = pil_to_base64(content)
    style_base64 = pil_to_base64(style)

    data = {
        "content": content_base64.decode(),
        "style": style_base64.decode(),
        "settings": settings.model_dump(),
    }
    response = requests.post(MODEL_URL + "/api/mix", json=data)
    img_bytes = response.json()["image"]
    img = base64_to_pil(img_bytes, meta=False)
    return img
