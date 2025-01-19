import base64
from io import BytesIO

from PIL.ImageFile import ImageFile


def pil_to_base64(img: ImageFile) -> str:
    """Преобразует pil Image в закодированную строку base64."""
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    return b"data:image/png;base64," + base64.b64encode(buffered.getvalue())
