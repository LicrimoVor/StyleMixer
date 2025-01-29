import io
import base64

from fastapi import APIRouter, Response
from PIL import Image

from core.models import MODELS
from core.schemas import DataMixSchema
from nets.abstract import DataType

style_mix_router = APIRouter(prefix="/mix")


@style_mix_router.post("")
async def gen_mix(data: DataMixSchema):
    model = MODELS.get(data.settings.model)
    if not model:
        return Response(contnent="model not found", status_code=404)

    content = Image.open(io.BytesIO(base64.b64decode(data.content)))
    style = Image.open(io.BytesIO(base64.b64decode(data.style)))
    data_model: DataType = {
        "content": content,
        "style": style,
        "alpha": data.settings.alpha,
        "size": data.settings.size,
    }

    out = model(data_model)
    img_bytes = io.BytesIO()
    out.save(img_bytes, format="JPEG")
    img_base64 = base64.b64encode(img_bytes.getvalue())

    return {"image": img_base64.decode()}
