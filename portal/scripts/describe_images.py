import os
import glob
from PIL import Image

src_dir = r"c:\Users\mdjib\Desktop\legezt\portal\public\images\3d"
files = sorted(glob.glob(os.path.join(src_dir, "*.png")))

print("Analyzing all 17 transparent 3D character images...")

# Let's inspect image properties
for idx, f in enumerate(files):
    img = Image.open(f)
    w, h = img.size
    aspect = w / float(h)
    basename = os.path.basename(f)
    print(f"[{idx+1:02d}] {basename}: Size={w}x{h}, AspectRatio={aspect:.2f}")

