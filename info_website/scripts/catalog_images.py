import os
import glob
from PIL import Image, ImageStat

dir_path = r"c:\Users\mdjib\Desktop\legezt\portal\public\images\3d"
files = sorted(glob.glob(os.path.join(dir_path, "*.png")))

print("--- 3D CHARACTER IMAGE ANALYSIS ---")
for f in files:
    img = Image.open(f)
    stat = ImageStat.Stat(img)
    mean_color = stat.mean
    name = os.path.basename(f)
    print(f"Name: {name} | Size: {img.size} | Mode: {img.mode} | Avg RGB: ({mean_color[0]:.1f}, {mean_color[1]:.1f}, {mean_color[2]:.1f})")

# Also generate a simple preview HTML file so we can view them all in the browser!
html_content = """<!DOCTYPE html>
<html>
<head>
<style>
body { background: #0b0f19; color: white; font-family: sans-serif; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
.card { background: #1e293b; padding: 15px; border-radius: 12px; border: 1px solid #334155; text-align: center; }
.card img { max-width: 100%; max-height: 200px; object-fit: contain; }
</style>
</head>
<body>
<h1>LeGeZt 3D Character Catalog</h1>
<div class="grid">
"""

for f in files:
    name = os.path.basename(f)
    html_content += f"""
    <div class="card">
      <img src="/images/3d/{name}" alt="{name}" />
      <p><strong>{name}</strong></p>
    </div>
    """

html_content += """
</div>
</body>
</html>
"""

with open(r"c:\Users\mdjib\Desktop\legezt\portal\public\preview.html", "w") as out:
    out.write(html_content)

print("Generated preview HTML at portal/public/preview.html!")
