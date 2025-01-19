import re
from io import BytesIO
from PIL import Image
from PIL.ImageFile import ImageFile
import base64


def base64_to_pil(data: str) -> ImageFile:
    """Преобразует акодированную строку base64 в pil Image."""
    image_data = re.sub("^data:image/.+;base64,", "", data)
    img = Image.open(BytesIO(base64.b64decode(image_data)))
    return img.convert("RGB")
