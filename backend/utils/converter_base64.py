import base64
from io import BytesIO, FileIO
import re

from PIL import Image
from PIL.ImageFile import ImageFile


def pil_to_base64(img: ImageFile) -> str:
    """Преобразует pil Image в закодированную строку base64."""
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    return b"data:image/jpg;base64," + base64.b64encode(buffered.getvalue())


def base64_to_pil(data: str) -> ImageFile:
    """Преобразует акодированную строку base64 в pil Image."""
    image_data = re.sub("^data:image/.+;base64,", "", data)
    img = Image.open(BytesIO(base64.b64decode(image_data)))
    return img.convert("RGB")


def file_to_base64(file: FileIO) -> str:
    """Преобразует файл изображения в base64."""
    result = base64.b64encode(file.read())
    return b"data:image/jpg;base64," + result
