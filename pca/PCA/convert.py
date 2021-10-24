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
    # plt.image.imsave(new_image, array)
    return name


def convert(jpg_file, y, x):
    jpg_file = os.path.join(settings.MEDIA_ROOT, jpg_file)
    jpg = Image.open(jpg_file).convert("L")
    jpg = jpg.resize((y, x), Image.BILINEAR)
    file_name, _, _ = jpg_file.partition(".")
    name = file_name + ".pgm"
    new_image = os.path.join(settings.MEDIA_ROOT, name)
    jpg.save(new_image)
    return name
