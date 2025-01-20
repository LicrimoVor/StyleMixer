from fastapi import APIRouter

from .style_mix import style_mix
from .user import user_router

main_router = APIRouter(prefix="/api")
main_router.include_router(style_mix)
main_router.include_router(user_router)
