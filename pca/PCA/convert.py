import os

from django.conf import settings
from PIL import Image


def save(X, format, file):
    im = Image.fromarray(X)
    if im.mode != "RGB":
        im = im.convert("RGB")
    name = file + "converted_image." + format.lower()
    new_image = os.path.join(settings.MEDIA_ROOT, name)
    im.save(new_image)
    return name


def convert(jpg_file, y, x):
    jpg_file = os.path.join(settings.MEDIA_ROOT, jpg_file)
    jpg = Image.open(jpg_file).convert("L")
    jpg = jpg.resize((y, x), Image.BILINEAR)
    file_name, _, org_format = jpg_file.partition(".")
    name = file_name + ".pgm"
    b_w=file_name+"."+org_format
    new_image = os.path.join(settings.MEDIA_ROOT, name)
    new_image_b_w = os.path.join(settings.MEDIA_ROOT, b_w)
    jpg.save(new_image)
    jpg.save(new_image_b_w)
    return name
