import random

from fastapi import APIRouter

from core.const import STYLE_URLS


shared_router = APIRouter()


@shared_router.post("/style/{count}")
async def gen_style(count: int):
    return random.choices(STYLE_URLS, k=count)
