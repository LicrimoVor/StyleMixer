from PIL import ImageFilter
from PIL.ImageFile import ImageFile


def create_styled_img(content: ImageFile, style: ImageFile) -> ImageFile:
    # !!!!!!!!!!!!!!!!!!!!!!!!!
    img = content.filter(ImageFilter.BLUR)
    # !!!!!!!!!!!!!!!!!!!!!!!!!

    return img
