from pydantic import BaseModel


class ImageMix(BaseModel):
    base: bytes
    style: bytes
