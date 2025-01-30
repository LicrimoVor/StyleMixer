import base64
from io import BytesIO
import re

from PIL import Image
from PIL.ImageFile import ImageFile


META_STRING = b"data:image/jpg;base64,"


def pil_to_base64(img: ImageFile, meta=False) -> bytes:
    """Преобразует pil Image в закодированную строку base64."""
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    result = base64.b64encode(buffered.getvalue())
    if meta:
        return b"data:image/jpg;base64," + result
    return result


def base64_to_pil(data: str, meta=True) -> ImageFile:
    """Преобразует акодированную строку base64 в pil Image."""
    if meta:
        data = re.sub("^data:image/.+;base64,", "", data)
    img = Image.open(BytesIO(base64.b64decode(data)))
    return img.convert("RGB")


def bytes_to_base64(bytes: bytes, meta=False) -> str:
    """Преобразует байты в base64."""
    result = base64.b64encode(bytes)
    if meta:
        return b"data:image/jpg;base64," + result
    return result
