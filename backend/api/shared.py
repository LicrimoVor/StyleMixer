import requests
import asyncio

from fastapi import APIRouter

from utils.converter_base64 import bytes_to_base64
from core.settings import MODEL_URL


shared_router = APIRouter()


@shared_router.get("/styles/{count}")
async def gen_styles(count: int):
    resp = requests.post(MODEL_URL + f"/api/style/{count}")
    urls = resp.json()
    images = []
    for url in urls:
        resp = requests.get(MODEL_URL + url, verify=False)
        await asyncio.sleep(0.1)
        images.append(bytes_to_base64(resp.content, meta=True))

    return images
