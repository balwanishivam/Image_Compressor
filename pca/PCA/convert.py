import os

from PIL import Image


def convert(im, format):
    converted = im.convert("RGB")
    extension = "converted_image." + format.lower()
    converted.save(extension)
    return converted
