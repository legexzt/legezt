import os
import glob
import numpy as np
from PIL import Image

dir_path = r"c:\Users\mdjib\Desktop\legezt\portal\public\images\3d"
files = sorted(glob.glob(os.path.join(dir_path, "*.png")))

print(f"Fast trimming {len(files)} 3D character images...")

for f in files:
    img = Image.open(f)
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    
    arr = np.array(img)
    alpha = arr[:, :, 3]
    
    # Find bounding box of non-transparent pixels
    nonzero_coords = np.argwhere(alpha > 10)
    if len(nonzero_coords) > 0:
        min_y, min_x = nonzero_coords.min(axis=0)
        max_y, max_x = nonzero_coords.max(axis=0)
        
        # Add small 4px padding so edges don't touch pixel boundary
        min_y = max(0, min_y - 4)
        min_x = max(0, min_x - 4)
        max_y = min(arr.shape[0], max_y + 4)
        max_x = min(arr.shape[1], max_x + 4)
        
        cropped_arr = arr[min_y:max_y, min_x:max_x]
        cropped_img = Image.fromarray(cropped_arr, mode="RGBA")
        cropped_img.save(f, "PNG", compress_level=1)
        print(f"Trimmed {os.path.basename(f)} -> new size: {cropped_img.size}")

print("Fast trim complete!")
