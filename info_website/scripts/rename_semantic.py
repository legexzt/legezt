import os
import glob
import shutil

src_dir = r"c:\Users\mdjib\Desktop\legezt\images-legezt"
dst_dir = r"c:\Users\mdjib\Desktop\legezt\portal\public\images\3d"

os.makedirs(dst_dir, exist_ok=True)

# List sorted files in images-legezt
files = sorted(glob.glob(os.path.join(src_dir, "*.png")))

print(f"Total raw files found: {len(files)}")

# Semantic name mapping based on prompt sequence & image content analysis
semantic_names = [
    "hero_student_laptop.png",             # 01: Hero Main Student at Laptop
    "student_hub_study_desk.png",         # 02: Student Hub Desk with Lamp & Plant
    "faculty_female_professor.png",       # 03: Faculty Studio Female Professor
    "native_apk_student_shield.png",       # 04: Student holding Smartphone & Security Shield
    "geofence_gps_radar.png",             # 05: 200m GPS Geofence Radar Pin Graphic
    "proctor_warning_shield.png",         # 06: 3-Strike Proctor Warning Shield
    "pdf_marksheet_dispatch.png",         # 07: PDF Marksheet Report Card & Envelope
    "notes_library_books.png",            # 08: Student on Textbooks reading Tablet
    "peer_chat_students.png",             # 09: Two Students Chatting with Speech Bubbles
    "vision_campus_building.png",         # 10: Student in front of College Building & Server
    "ai_syllabus_generator.png",          # 11: AI Assistant Robot & Syllabus Hologram
    "admin_dashboard_monitoring.png",     # 12: Admin with Headset & Analytics Charts
    "offline_network_cable.png",          # 13: Student inspecting Disconnected Cable
    "student_login_badge.png",            # 14: Student holding Digital ID Badge
    "faculty_classroom_whiteboard.png",   # 15: Male Professor at Digital Whiteboard
    "campus_student_lifestyle.png",       # 16: Student walking on University Campus
    "legezt_3d_emblem_shield.png"         # 17: LeGeZt 3D Crest Emblem & Shield
]

# Clear existing files in dst_dir
for existing in glob.glob(os.path.join(dst_dir, "*.png")):
    os.remove(existing)

for idx, f in enumerate(files):
    if idx < len(semantic_names):
        name = semantic_names[idx]
    else:
        name = f"character_extra_{idx+1}.png"
    
    target_path = os.path.join(dst_dir, name)
    shutil.copy(f, target_path)
    print(f"Mapped [{idx+1:02d}] {os.path.basename(f)} -> {name}")

print("SEMANTIC RENAMING COMPLETE!")
