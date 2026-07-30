import os
import glob
from PIL import Image

dir_path = r"c:\Users\mdjib\Desktop\legezt\portal\public\images\3d"
files = sorted(glob.glob(os.path.join(dir_path, "*.png")))

print("Trimming alpha boundaries for all 17 PNGs...")

for f in files:
    img = Image.open(f)
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    
    # Get alpha bounding box
    bbox = img.getbbox()
    if bbox:
        # Crop tight to non-zero alpha region
        cropped = img.crop(bbox)
        cropped.save(f, "PNG")
        print(f"Trimmed {os.path.basename(f)}: Original={img.size} -> Cropped={cropped.size}")

print("Trim completed!")
