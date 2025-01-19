from fastapi import APIRouter

from .image import image_router
from .user import user_router

main_router = APIRouter(prefix="/api")
main_router.include_router(image_router)
main_router.include_router(user_router)
