import requests
import io
import base64

from PIL.ImageFile import ImageFile
from PIL import Image

from schemas.style_mix import ImageSettingsSchema
from core.settings import MODEL_URL


async def post_to_style_mix(
    content: ImageFile, style: ImageFile, settings: ImageSettingsSchema
) -> ImageFile:
    """Создает микс."""
    content_bytes = io.BytesIO()
    style_bytes = io.BytesIO()
    content.save(content_bytes, format="JPEG")
    style.save(style_bytes, format="JPEG")
    content_base64 = base64.b64encode(content_bytes.getvalue())
    style_base64 = base64.b64encode(style_bytes.getvalue())

    data = {
        "content": content_base64.decode(),
        "style": style_base64.decode(),
        "settings": settings.model_dump(),
    }
    response = requests.post(MODEL_URL + "/api/mix", json=data)
    img_bytes = response.json()["image"]
    img = Image.open(io.BytesIO(base64.b64decode(img_bytes)))
    return img
