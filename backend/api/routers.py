from fastapi import APIRouter

from .style_mix import style_mix_router
from .user import user_router
from .shared import shared_router

main_router = APIRouter(prefix="/api")
main_router.include_router(style_mix_router)
main_router.include_router(user_router)
main_router.include_router(shared_router)
