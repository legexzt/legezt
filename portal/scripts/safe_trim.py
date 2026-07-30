import os
import glob
from PIL import Image

dir_path = r"c:\Users\mdjib\Desktop\legezt\portal\public\images\3d"
files = sorted(glob.glob(os.path.join(dir_path, "*.png")))

print(f"Trimming padding for {len(files)} semantically named 3D PNGs...")

for f in files:
    with Image.open(f) as img:
        img_rgba = img.convert("RGBA")
        bbox = img_rgba.getbbox()
        if bbox:
            cropped = img_rgba.crop(bbox)
            cropped.save(f, "PNG")
            print(f"Trimmed {os.path.basename(f)}: Original={img_rgba.size} -> Cropped={cropped.size}")

print("Trim complete!")
