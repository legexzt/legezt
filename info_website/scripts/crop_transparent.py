import os
import glob
from PIL import Image

dir_path = r"c:\Users\mdjib\Desktop\legezt\portal\public\images\3d"
files = sorted(glob.glob(os.path.join(dir_path, "*.png")))

print(f"Trimming transparent borders for {len(files)} images...")

for f in files:
    img = Image.open(f)
    bbox = img.getbbox()
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(f, "PNG")
        print(f"Trimmed {os.path.basename(f)}: new size = {cropped.size}")

print("Trim complete!")
