from fastapi import APIRouter

from .shared import shared_router
from .style_mix import style_mix_router

main_router = APIRouter(prefix="/api")
main_router.include_router(shared_router)
main_router.include_router(style_mix_router)
