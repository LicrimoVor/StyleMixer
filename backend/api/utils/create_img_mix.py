from io import BytesIO

from sqlalchemy_file import File
from PIL.ImageFile import ImageFile

from schemas.style_mix import ImageSettingsSchema
from utils.hash_buff import hash_buff
from utils.post_to_style_mix import post_to_style_mix
from models.style_mix import StyleMix, ImageMix
from models.user import User


async def create_img_mix(
    content: ImageFile,
    style: ImageFile,
    settings: ImageSettingsSchema,
    user: User,
    style_mix: StyleMix,
):
    img = await post_to_style_mix(content, style, settings)
    buff_img = BytesIO()
    img.save(buff_img, format="JPEG")

    filename = "mix_" + hash_buff(buff_img.getvalue()) + ".jpeg"
    file = File(buff_img.getvalue(), filename=filename, content_type="image/jpeg")
    return ImageMix(
        img=file,
        settings=settings,
        user=user,
        style_mix=style_mix,
    )
