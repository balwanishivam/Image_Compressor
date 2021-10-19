from PIL import Image
import os
  
def convert(im,format):
    converted = im.convert("RGB")
    extension="converted_image."+format.lower()
    converted.save(extension)
    return converted
