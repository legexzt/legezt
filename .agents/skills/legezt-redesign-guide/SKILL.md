---
name: legezt-redesign-guide
description: Complete redesign guide, UI specifications, logo prompts, asset checklist, and credits for LeGeZt academic platform. Use this skill when modifying, redesigning, or enhancing the web portal or Android app UI.
---

# 🚀 LeGeZt Platform Redesign Guide & Reference Blueprint

## 📜 Credits & Founder Vision
- **Founder & Chief Architect**: **Md Jibran**
- **Vision**: Autonomous, offline-first, intranet-native academic management ecosystem bridging high-performance Web Portals (Student Hub & Faculty Hub) with a native Android application.

---

## 🎨 Design System & Aesthetics (Option 1 - Clean Light UI)

### 1. Color Palette & Canvas
- **Background Theme**: Lightly Silver White (`#f8fafc` canvas with `#f1f5f9` subtle silver gradients)
- **Primary Text**: Deep Royal Slate (`#0f172a` / `#1e293b`) - 100% crisp contrast readability
- **Accent Color**: Glowing Royal Indigo (`#6366f1` / `#4f46e5`) & Vibrant Purple (`#8b5cf6`)
- **Card Backdrop**: Pure Glass White (`rgba(255, 255, 255, 0.95)` with `1px solid rgba(226, 232, 240, 0.8)`)

### 2. 3D Crystal White Glow Button Utility (`btn-crystal-white`)
```css
.btn-crystal-white {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 243, 248, 0.85));
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 10px 25px -5px rgba(255, 255, 255, 0.8),
    0 4px 12px rgba(99, 102, 241, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -2px 4px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(12px);
  color: #0f172a;
  font-weight: 700;
  border-radius: 9999px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-crystal-white:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 15px 30px -5px rgba(255, 255, 255, 1),
    0 8px 20px rgba(99, 102, 241, 0.25),
    inset 0 1px 2px rgba(255, 255, 255, 1);
}
```

### 3. Skeleton Refreshing Loading State (Shimmer UI)
During page loading or data fetch, display animated shimmer placeholder blocks to prevent UI layout collapse.

```tsx
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-sm animate-pulse">
      <div className="h-6 w-1/3 rounded-lg bg-slate-200/70 mb-4"></div>
      <div className="h-4 w-full rounded-md bg-slate-100 mb-2"></div>
      <div className="h-4 w-4/5 rounded-md bg-slate-100 mb-6"></div>
      <div className="h-10 w-28 rounded-full bg-slate-200/80"></div>
    </div>
  );
}
```

---

## 📸 AI Logo Generation Prompts

- **3D Crystal Glass Crest Logo**:
  `Minimalist modern 3D glassmorphic crest logo for LeGeZt academic platform. Sharp emblem with letter 'L' embedded in a futuristic shield crest, 3D frosted white crystal glass effect, subtle silver glowing highlights, clean white studio backdrop, vector logo design, isolated on white background.`
- **Academic Shield Emblem**:
  `Vector crest logo for LeGeZt college portal. Clean minimalist shield emblem featuring a stylized letter L and academic heraldry lines, frosted silver glass aesthetic, high contrast, flat 3D shading, premium educational SaaS branding, white background.`

---

## 📂 Asset & Icon Requirements Checklist

### Required Images:
1. `logo.png` / `logo.svg` - Institutional Crest Logo (512x512px transparent PNG)
2. `hero_dashboard_mockup.png` - Workspace preview card (16:10 aspect ratio)
3. `student_portal_preview.png` - Student Hub card preview (4:3 aspect ratio)
4. `faculty_portal_preview.png` - Faculty Hub card preview (4:3 aspect ratio)
5. `system_concept_banner.png` - Intranet LMS concept diagram (21:9 aspect ratio)
6. `founder_avatar.png` - Circular founder profile picture (Md Jibran)

### Required Icons (Lucide):
- `Sparkles` (AI Studio)
- `ShieldCheck` (Autonomous Network Security)
- `Download` (Android APK Direct Installer)
- `FileText` (0.1s PDF Document Engine)
- `MessageSquare` (WhatsApp-style Classmate Chat)
- `Flame` (Surprise Exams & Geofenced Proctoring)
- `ChevronLeft` / `ChevronRight` (Presentation Slide Switcher)
- `Coffee` / `Heart` (Support Development)

---

## 🔒 Backend Safety Guarantee
When implementing UI changes:
1. **DO NOT** modify Prisma schemas (`prisma/schema.prisma`), database connection strings, or backend API contracts (`app/api/*`).
2. Only update presentation components (`page.tsx`, `layout.tsx`, `globals.css`, UI views).
3. Ensure all dynamic data props, API endpoint URLs, and authentication handlers remain intact.
