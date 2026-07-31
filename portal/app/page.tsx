"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Cpu,
  Download,
  ArrowRight,
  BookOpen,
  Send,
  Flame,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Heart,
  Lock,
  UserCheck,
  GraduationCap,
  Sparkles,
  RefreshCw,
  FileCheck2,
  MapPin,
  Clock,
  Layers,
  BarChart3,
  CheckCircle2,
  Globe2,
  Zap,
  Sliders,
  Save,
} from "lucide-react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Visual Studio Editor Mode State (OFF - Final Production Layout Saved)
  const [isEditMode, setIsEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"" | "saving" | "saved" | "error">("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Universal Element Custom Overrides Map (Text, Font Size, Scale, X, Y, Image)
  const [overrides, setOverrides] = useState<Record<string, {
    text?: string;
    fontSize?: number;
    scale?: number;
    x?: number;
    y?: number;
    image?: string;
  }>>({});

  // Legacy state fallbacks for top hero character & CS-3A card
  const [heroImage, setHeroImage] = useState("/images/3d/hero_student_laptop.png");
  const [heroScale, setHeroScale] = useState(100);
  const [heroX, setHeroX] = useState(0);
  const [heroY, setHeroY] = useState(0);

  const [cardScale, setCardScale] = useState(100);
  const [cardX, setCardX] = useState(0);
  const [cardY, setCardY] = useState(0);

  const [studentHubImage, setStudentHubImage] = useState("/images/3d/student_login_badge.png");
  const [facultyStudioImage, setFacultyStudioImage] = useState("/images/3d/peer_chat_students.png");
  const [nativeApkImage, setNativeApkImage] = useState("/images/3d/notes_library_books.png");

  // Header Logo Interactive Adjuster State
  const [logoHeight, setLogoHeight] = useState(52); // default height 52px (Slightly smaller, ultra sleek)
  const [logoX, setLogoX] = useState(0);
  const [logoY, setLogoY] = useState(0);
  const [isHeaderAdjusterOpen, setIsHeaderAdjusterOpen] = useState(false);

  // Mouse Grab-and-Drag State
  const [activeDragTarget, setActiveDragTarget] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  // Catalog of all 17 available 3D PNG images
  const all3DImages = [
    { label: "Hero Student at Laptop", value: "/images/3d/hero_student_laptop.png" },
    { label: "Student Login ID Badge", value: "/images/3d/student_login_badge.png" },
    { label: "Peer Chat Students", value: "/images/3d/peer_chat_students.png" },
    { label: "Notes & Library Books", value: "/images/3d/notes_library_books.png" },
    { label: "Student Hub Study Desk", value: "/images/3d/student_hub_study_desk.png" },
    { label: "Faculty Female Professor", value: "/images/3d/faculty_female_professor.png" },
    { label: "Native APK Student Shield", value: "/images/3d/native_apk_student_shield.png" },
    { label: "200m GPS Geofence Radar", value: "/images/3d/geofence_gps_radar.png" },
    { label: "3-Strike Proctor Shield", value: "/images/3d/proctor_warning_shield.png" },
    { label: "PDF Marksheet Dispatch", value: "/images/3d/pdf_marksheet_dispatch.png" },
    { label: "Vision Campus & Server", value: "/images/3d/vision_campus_building.png" },
    { label: "AI Syllabus Generator Robot", value: "/images/3d/ai_syllabus_generator.png" },
    { label: "Admin Dashboard Monitor", value: "/images/3d/admin_dashboard_monitoring.png" },
    { label: "Offline Network Inspector", value: "/images/3d/offline_network_cable.png" },
    { label: "Faculty Male Whiteboard", value: "/images/3d/faculty_classroom_whiteboard.png" },
    { label: "Campus Student Lifestyle", value: "/images/3d/campus_student_lifestyle.png" },
    { label: "LeGeZt 3D Emblem Shield", value: "/images/3d/legezt_3d_emblem_shield.png" }
  ];

  // Helper to read override property for any element
  const getProp = (id: string, field: "text" | "fontSize" | "scale" | "x" | "y" | "image", defaultVal: any) => {
    if (overrides[id] && overrides[id][field] !== undefined) {
      return overrides[id][field];
    }
    return defaultVal;
  };

  const updateProp = (id: string, field: string, value: any) => {
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value }
    }));
  };

  // Load Saved Layout on Initial Render
  React.useEffect(() => {
    const loadSavedLayout = async () => {
      try {
        const res = await fetch("/api/layout/save");
        if (res.ok) {
          const config = await res.json();
          if (config.overrides) setOverrides(config.overrides);
          if (config.hero) {
            setHeroImage(config.hero.image || "/images/3d/hero_student_laptop.png");
            setHeroScale(config.hero.scale || 100);
            setHeroX(config.hero.x || 0);
            setHeroY(config.hero.y || 0);
          }
          if (config.card) {
            setCardScale(config.card.scale || 100);
            setCardX(config.card.x || 0);
            setCardY(config.card.y || 0);
          }
          if (config.studentHub) setStudentHubImage(config.studentHub.image || "/images/3d/student_login_badge.png");
          if (config.facultyStudio) setFacultyStudioImage(config.facultyStudio.image || "/images/3d/peer_chat_students.png");
          if (config.nativeApk) setNativeApkImage(config.nativeApk.image || "/images/3d/notes_library_books.png");
          if (config.logo) {
            setLogoHeight(config.logo.height || 52);
            setLogoX(config.logo.x || 0);
            setLogoY(config.logo.y || 0);
          }
          return;
        }
      } catch (e) {
        console.log("Fallback loading from localStorage");
      }

      const local = localStorage.getItem("legezt_layout_config");
      if (local) {
        try {
          const config = JSON.parse(local);
          if (config.overrides) setOverrides(config.overrides);
          if (config.hero) {
            setHeroImage(config.hero.image);
            setHeroScale(config.hero.scale);
            setHeroX(config.hero.x);
            setHeroY(config.hero.y);
          }
          if (config.card) {
            setCardScale(config.card.scale);
            setCardX(config.card.x);
            setCardY(config.card.y);
          }
          if (config.studentHub) setStudentHubImage(config.studentHub.image);
          if (config.facultyStudio) setFacultyStudioImage(config.facultyStudio.image);
          if (config.nativeApk) setNativeApkImage(config.nativeApk.image);
          if (config.logo) {
            setLogoHeight(config.logo.height || 52);
            setLogoX(config.logo.x || 0);
            setLogoY(config.logo.y || 0);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    loadSavedLayout();
  }, []);

  // Autoplay Slide Deck (Cycles every 5 seconds with smooth 3D animations)
  React.useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev < 4 - 1 ? prev + 1 : 0));
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  // Save Layout Permanently to API & localStorage
  const saveLayoutPermanently = async () => {
    setSaveStatus("saving");
    const layoutConfig = {
      overrides,
      hero: { image: heroImage, scale: heroScale, x: heroX, y: heroY },
      card: { scale: cardScale, x: cardX, y: cardY },
      studentHub: { image: studentHubImage },
      facultyStudio: { image: facultyStudioImage },
      nativeApk: { image: nativeApkImage },
      logo: { height: logoHeight, x: logoX, y: logoY }
    };

    localStorage.setItem("legezt_layout_config", JSON.stringify(layoutConfig));

    try {
      const res = await fetch("/api/layout/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(layoutConfig)
      });
      if (res.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 3500);
      } else {
        setSaveStatus("error");
      }
    } catch (e) {
      console.error(e);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3500);
    }
  };

  const handleMouseDown = (target: string, e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setSelectedId(target);
    setActiveDragTarget(target);
    setDragStart({ x: e.clientX, y: e.clientY });

    if (target === "hero") {
      setInitialPos({ x: heroX, y: heroY });
    } else if (target === "card") {
      setInitialPos({ x: cardX, y: cardY });
    } else {
      setInitialPos({
        x: getProp(target, "x", 0),
        y: getProp(target, "y", 0)
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!activeDragTarget) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    if (activeDragTarget === "hero") {
      setHeroX(initialPos.x + deltaX);
      setHeroY(initialPos.y + deltaY);
    } else if (activeDragTarget === "card") {
      setCardX(initialPos.x + deltaX);
      setCardY(initialPos.y + deltaY);
    } else {
      updateProp(activeDragTarget, "x", initialPos.x + deltaX);
      updateProp(activeDragTarget, "y", initialPos.y + deltaY);
    }
  };

  const handleMouseUp = () => {
    setActiveDragTarget(null);
  };

  const slides = [
    {
      title: "200m GPS Geofencing Lock",
      subtitle: "Haversine Distance Formula Security",
      description:
        "Exams automatically unlock only when the student's physical GPS coordinates are within 50m - 200m of the classroom latitude & longitude.",
      icon: MapPin,
      tag: "Spatial Security",
      stat: "50m - 200m Range",
    },
    {
      title: "6-Digit Faculty Entry PIN",
      subtitle: "Classroom Verification Gate",
      description:
        "Faculty generates a 6-digit PIN in the classroom. Students must satisfy both the GPS Geofence AND the Entry PIN to begin.",
      icon: Lock,
      tag: "Dual Verification",
      stat: "2-Factor Access",
    },
    {
      title: "3-Strike Anti-Cheating Guard",
      subtitle: "Un-Bypassable Proctor Listener",
      description:
        "Monitors tab switching, notification drawers, floating AI windows, and split screens. 3 strikes trigger instant auto-submission and faculty flagging.",
      icon: Flame,
      tag: "Automated Proctor",
      stat: "Auto Flag Alert",
    },
    {
      title: "Instant PDF Marksheet Dispatch",
      subtitle: "legezt@gmail.com Automated SMTP Relay",
      description:
        "Evaluates scores immediately upon submission, generates itemized PDF marksheets, and dispatches full class reports to Faculty email.",
      icon: FileCheck2,
      tag: "Auto Grading",
      stat: "0.1s Dispatch",
    },
  ];

  const handleRefreshSim = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  const resetLayoutAdjuster = () => {
    setHeroImage("/images/3d/hero_student_laptop.png");
    setHeroScale(100);
    setHeroX(0);
    setHeroY(0);
    setCardScale(100);
    setCardX(0);
    setCardY(0);
    setStudentHubImage("/images/3d/student_login_badge.png");
    setFacultyStudioImage("/images/3d/peer_chat_students.png");
    setNativeApkImage("/images/3d/notes_library_books.png");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative min-h-screen bg-[#0b0f19] text-white selection:bg-blue-600 selection:text-white overflow-x-hidden pb-32 select-none"
    >
      {/* Dynamic Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] bg-cyan-600/10 rounded-full blur-[160px]" />
      </div>

      {/* UNIVERSAL VISUAL STUDIO INSPECTOR TOOLBAR (Active Page Builder) */}
      {isEditMode && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-slate-900/95 backdrop-blur-2xl border-2 border-blue-500/70 rounded-3xl p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] space-y-3 transition-all">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-blue-400 animate-spin" />
              <div>
                <span className="text-blue-400 font-black text-sm block leading-none">
                  ⚡ Universal Visual Page Builder (Active Inspector)
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Click any element on the website to select & edit text, font size, scale, or drag position!
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS & SAVE STATUS */}
            <div className="flex items-center space-x-3 text-xs">
              {saveStatus === "saved" && (
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 animate-pulse">
                  ✓ Layout & Text Saved Permanently!
                </span>
              )}
              {saveStatus === "saving" && (
                <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40 animate-pulse">
                  ⏳ Saving...
                </span>
              )}
              
              <button
                onClick={saveLayoutPermanently}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black shadow-lg shadow-blue-600/40 border border-blue-300/30 flex items-center space-x-2 transition-all scale-105 active:scale-95"
              >
                <span>💾 SAVE PERMANENTLY</span>
              </button>

              <button
                onClick={resetLayoutAdjuster}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 transition-colors flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* INSPECTOR PANEL FOR SELECTED ELEMENT */}
          {selectedId ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-semibold">
              {/* Selected Element Label & Text Editor */}
              <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1.5 md:col-span-2">
                <div className="flex items-center justify-between text-blue-300 font-bold">
                  <span>Selected Element: <code className="text-white bg-slate-800 px-1.5 py-0.5 rounded">{selectedId}</code></span>
                  <span className="text-[10px] text-slate-400">Click any text or image on page to switch</span>
                </div>
                <input
                  type="text"
                  placeholder="Edit text content here..."
                  value={getProp(selectedId, "text", "")}
                  onChange={(e) => updateProp(selectedId, "text", e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Font Size & Element Scale Controls */}
              <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-indigo-300 font-bold">
                  <span>Font Size: {getProp(selectedId, "fontSize", 100)}%</span>
                  <span>Scale: {getProp(selectedId, "scale", 100)}%</span>
                </div>
                <div className="flex space-x-2 pt-1">
                  <input
                    type="range" min="50" max="250" value={getProp(selectedId, "fontSize", 100)}
                    onChange={(e) => updateProp(selectedId, "fontSize", Number(e.target.value))}
                    className="w-1/2 accent-indigo-500 cursor-pointer"
                    title="Font Size"
                  />
                  <input
                    type="range" min="50" max="200" value={getProp(selectedId, "scale", 100)}
                    onChange={(e) => updateProp(selectedId, "scale", Number(e.target.value))}
                    className="w-1/2 accent-blue-500 cursor-pointer"
                    title="Element Scale"
                  />
                </div>
              </div>

              {/* Position Offsets & Quick Actions */}
              <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1.5 flex flex-col justify-between">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>X: {getProp(selectedId, "x", 0)}px</span>
                  <span>Y: {getProp(selectedId, "y", 0)}px</span>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="range" min="-300" max="300" value={getProp(selectedId, "x", 0)}
                    onChange={(e) => updateProp(selectedId, "x", Number(e.target.value))}
                    className="w-1/2 accent-blue-400 cursor-pointer"
                  />
                  <input
                    type="range" min="-300" max="300" value={getProp(selectedId, "y", 0)}
                    onChange={(e) => updateProp(selectedId, "y", Number(e.target.value))}
                    className="w-1/2 accent-blue-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-slate-400 font-medium italic">
              👈 Click on any heading, paragraph, card, or image on the webpage to inspect and edit it live!
            </div>
          )}
        </div>
      )}

      {/* Rich Glowing Ambient Light Orbs for 3D Depth */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[35%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none z-0" />

      {/* Main Canvas Background Mesh */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0b0f19] to-black pointer-events-none" />

      {/* Full-Bleed Top Header Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f19]/80 border-b border-slate-800/80 px-6 lg:px-12 xl:px-16 py-4 shadow-2xl shadow-black/40">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between">
          {/* Single High-Res 3D Image Logo with Dynamic Height & Backlight Glow */}
          <div
            className="relative group flex items-center cursor-pointer py-1 transition-all duration-200"
            style={{
              transform: `translate(${logoX}px, ${logoY}px)`
            }}
          >
            {/* Ambient Cyan/Blue Backlight Glow Aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse pointer-events-none" />

            {/* User 3D Image Logo with Controlled Dynamic Height */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/3d/legezt_main_logo.png"
              alt="LeGeZt 3D Logo"
              style={{ height: `${logoHeight}px` }}
              className="relative z-10 w-auto max-w-[500px] object-contain drop-shadow-[0_10px_28px_rgba(6,182,212,0.9)] group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Navigation Links - 3D White Glass Pill Buttons Evenly Spread */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-5 text-xs font-bold">
            <a
              href="#services"
              className="btn-white-glass-3d px-4 py-2 flex items-center space-x-1.5 shadow-md shadow-white/10"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Services</span>
            </a>

            <a
              href="#portals"
              className="btn-white-glass-3d px-4 py-2 flex items-center space-x-1.5 shadow-md shadow-white/10"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Portals</span>
            </a>

            <a
              href="#deck"
              className="btn-white-glass-3d px-4 py-2 flex items-center space-x-1.5 shadow-md shadow-white/10"
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Platform Deck</span>
            </a>

            <a
              href="#vision"
              className="btn-white-glass-3d px-4 py-2 flex items-center space-x-1.5 shadow-md shadow-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Vision</span>
            </a>
          </nav>

          {/* Action CTAs - 3D Light Green & Sapphire Buttons Level Aligned */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Header Logo Adjuster Toggle Button */}
            <button
              onClick={() => setIsHeaderAdjusterOpen(!isHeaderAdjusterOpen)}
              className={`p-2.5 rounded-full transition-all border flex items-center justify-center shrink-0 ${
                isHeaderAdjusterOpen
                  ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/50"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-700/80"
              }`}
              title="Adjust Header Logo Size & Alignment"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              onClick={handleRefreshSim}
              className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-700/80 flex items-center justify-center shrink-0"
              title="Simulate Skeleton Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-emerald-400" : ""}`} />
            </button>

            <a
              href="#student-login"
              className="btn-emerald-3d text-xs sm:text-sm px-5 py-2.5 flex items-center space-x-2 shrink-0 shadow-lg shadow-emerald-600/30"
            >
              <UserCheck className="w-4 h-4 text-white" />
              <span className="text-white font-black tracking-wide">Student Login</span>
            </a>

            <a
              href="#faculty-login"
              className="btn-sapphire-3d text-xs sm:text-sm px-5 py-2.5 hidden sm:flex items-center space-x-2 shrink-0"
            >
              <Lock className="w-4 h-4 text-white" />
              <span className="text-white font-black tracking-wide">Faculty Studio</span>
            </a>

            <a
              href="#download-apk"
              className="btn-slate-3d text-xs sm:text-sm px-4 py-2.5 hidden md:flex items-center space-x-2 shrink-0 border-emerald-500/30 text-emerald-300 hover:border-emerald-400"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="text-white font-bold">Install APK</span>
            </a>
          </div>
        </div>

        {/* Floating Header Logo Adjuster Control Panel */}
        {isHeaderAdjusterOpen && (
          <div className="max-w-[1700px] mx-auto mt-3 p-4 rounded-2xl bg-slate-900/95 border border-blue-500/40 backdrop-blur-2xl shadow-2xl shadow-blue-500/20 text-white flex flex-wrap items-center justify-between gap-4 animate-fade-in z-50">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> Header Logo Adjuster:
              </span>
              
              {/* Quick Size Presets */}
              <div className="flex items-center space-x-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setLogoHeight(38)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${logoHeight === 38 ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  Compact (38px)
                </button>
                <button
                  onClick={() => setLogoHeight(52)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${logoHeight === 52 ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  Medium (52px)
                </button>
                <button
                  onClick={() => setLogoHeight(66)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${logoHeight === 66 ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  Large (66px)
                </button>
                <button
                  onClick={() => setLogoHeight(82)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${logoHeight === 82 ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                >
                  XL (82px)
                </button>
              </div>
            </div>

            {/* Precision Range Sliders */}
            <div className="flex items-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Height:</span>
                <input
                  type="range"
                  min="24"
                  max="110"
                  value={logoHeight}
                  onChange={(e) => setLogoHeight(Number(e.target.value))}
                  className="w-28 accent-blue-500 cursor-pointer"
                />
                <span className="font-mono text-blue-300 w-8">{logoHeight}px</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400">X-Shift:</span>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={logoX}
                  onChange={(e) => setLogoX(Number(e.target.value))}
                  className="w-20 accent-blue-500 cursor-pointer"
                />
                <span className="font-mono text-blue-300 w-8">{logoX}px</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Y-Shift:</span>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={logoY}
                  onChange={(e) => setLogoY(Number(e.target.value))}
                  className="w-20 accent-blue-500 cursor-pointer"
                />
                <span className="font-mono text-blue-300 w-8">{logoY}px</span>
              </div>
            </div>

            {/* Save Layout Action Button */}
            <button
              onClick={saveLayoutPermanently}
              disabled={saveStatus === "saving"}
              className="btn-emerald-3d text-xs px-4 py-2 flex items-center space-x-2 shadow-lg shadow-emerald-500/30"
            >
              <Save className="w-3.5 h-3.5 text-white" />
              <span>{saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Layout"}</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Full-Width Content Container */}
      <main className="relative z-10 max-w-[1750px] mx-auto px-6 lg:px-12 xl:px-16 py-10 space-y-28">

        {/* HERO SECTION - 3D Character & Floating Status Widget Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative">

          {/* Hero Left Column - Copy & Action Buttons */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <div
              onClick={() => setSelectedId("hero_badge")}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border text-blue-300 text-xs font-bold backdrop-blur-md transition-all ${
                isEditMode ? "cursor-pointer hover:border-blue-400" : "border-blue-400/30"
              } ${selectedId === "hero_badge" ? "ring-2 ring-blue-400 border-blue-400" : ""}`}
              style={{
                fontSize: getProp("hero_badge", "fontSize", 100) !== 100 ? `${getProp("hero_badge", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("hero_badge", "scale", 100) / 100}) translate(${getProp("hero_badge", "x", 0)}px, ${getProp("hero_badge", "y", 0)}px)`
              }}
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{getProp("hero_badge", "text", "Autonomous Intranet & 200m Geofenced Exam System")}</span>
            </div>

            <h1
              onClick={() => setSelectedId("hero_title")}
              onMouseDown={(e) => handleMouseDown("hero_title", e)}
              className={`text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] transition-all ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400/80 p-2 rounded-2xl" : ""
              } ${selectedId === "hero_title" ? "ring-2 ring-blue-500 p-2 rounded-2xl bg-blue-500/5" : ""}`}
              style={{
                fontSize: getProp("hero_title", "fontSize", 100) !== 100 ? `${getProp("hero_title", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("hero_title", "scale", 100) / 100}) translate(${getProp("hero_title", "x", 0)}px, ${getProp("hero_title", "y", 0)}px)`,
                transition: activeDragTarget === "hero_title" ? "none" : "transform 0.1s ease-out"
              }}
            >
              {getProp("hero_title", "text", "The Next-Gen Academic & Exam Portal")}
            </h1>

            <p
              onClick={() => setSelectedId("hero_desc")}
              onMouseDown={(e) => handleMouseDown("hero_desc", e)}
              className={`text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl transition-all ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400/80 p-2 rounded-2xl" : ""
              } ${selectedId === "hero_desc" ? "ring-2 ring-blue-500 p-2 rounded-2xl bg-blue-500/5" : ""}`}
              style={{
                fontSize: getProp("hero_desc", "fontSize", 100) !== 100 ? `${getProp("hero_desc", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("hero_desc", "scale", 100) / 100}) translate(${getProp("hero_desc", "x", 0)}px, ${getProp("hero_desc", "y", 0)}px)`,
                transition: activeDragTarget === "hero_desc" ? "none" : "transform 0.1s ease-out"
              }}
            >
              {getProp(
                "hero_desc",
                "text",
                "Architected by Md Jibran for ultra-secure Indian college examinations. Featuring 200m GPS geofence locking, randomized MCQ shuffling, un-bypassable 3-strike proctoring, and instant PDF marksheet dispatch."
              )}
            </p>

            {/* Quick Action Grid */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#student-login"
                className="btn-sapphire-crystal text-base px-8 py-4 flex items-center space-x-3 shadow-2xl shadow-blue-600/40"
              >
                <span>Student Hub Access</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#faculty-login"
                className="btn-silver-glass text-base px-7 py-4 flex items-center space-x-3 bg-slate-800/90 text-white border-slate-700 hover:bg-slate-700"
              >
                <Lock className="w-5 h-5 text-blue-400" />
                <span>Faculty Studio</span>
              </a>
              <a
                href="#download-apk"
                className="btn-silver-glass text-base px-6 py-4 flex items-center space-x-3 border-emerald-500/40 text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60"
              >
                <Download className="w-5 h-5 text-emerald-400" />
                <span>Install APK</span>
              </a>
            </div>

            {/* Live Metrics Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="glass-card p-4 rounded-2xl bg-slate-900/70 border-slate-800 flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-400 shrink-0" />
                <div>
                  <span className="text-xl font-black text-white block leading-none">200m</span>
                  <span className="text-[10px] font-bold text-slate-400">GPS Geofence</span>
                </div>
              </div>
              <div className="glass-card p-4 rounded-2xl bg-slate-900/70 border-slate-800 flex items-center space-x-3">
                <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-xl font-black text-white block leading-none">3-Strike</span>
                  <span className="text-[10px] font-bold text-slate-400">Proctor Guard</span>
                </div>
              </div>
              <div className="glass-card p-4 rounded-2xl bg-slate-900/70 border-slate-800 flex items-center space-x-3">
                <Zap className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xl font-black text-white block leading-none">0.1s</span>
                  <span className="text-[10px] font-bold text-slate-400">PDF Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Column - MASSIVE 3D Student Character Stage with Floating Mid-Term Card Overlay */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center relative z-20 min-h-[520px] lg:min-h-[660px]">

            {/* Ambient Background Radial Glow behind Main Character */}
            <div className="absolute inset-0 bg-blue-600/35 rounded-full blur-[110px] pointer-events-none scale-125" />

            {/* MAIN MASSIVE 3D HERO STUDENT CHARACTER (Mouse Grab-and-Drag enabled) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt="3D Hero Student at Laptop (Drag to Move)"
              onMouseDown={(e) => handleMouseDown("hero", e)}
              style={{
                transform: `scale(${heroScale / 100}) translate(${heroX}px, ${heroY}px)`,
                transition: activeDragTarget === "hero" ? "none" : "transform 0.1s ease-out"
              }}
              className={`w-[120%] max-w-[650px] lg:max-w-[820px] object-contain drop-shadow-[0_40px_60px_rgba(37,99,235,0.55)] relative z-10 ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-4 hover:ring-blue-500/50 rounded-3xl" : ""
              }`}
            />

            {/* Grounded 3D Shadow Ring */}
            <div className="w-[85%] h-10 bg-blue-500/25 rounded-[100%] blur-xl pointer-events-none -mt-6 relative z-0" />

            {/* FLOATING COMPACT CS-3A MID-TERM LIVE WORKSPACE GLASS CARD (Mouse Grab-and-Drag enabled) */}
            <div
              onMouseDown={(e) => handleMouseDown("card", e)}
              style={{
                transform: `scale(${cardScale / 100}) translate(${cardX}px, ${cardY}px)`,
                transition: activeDragTarget === "card" ? "none" : "transform 0.1s ease-out"
              }}
              className={`absolute top-2 sm:top-6 right-0 sm:right-4 z-30 max-w-[340px] sm:max-w-[380px] w-full ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-4 hover:ring-indigo-500/60 rounded-2xl" : ""
              }`}
            >
              {isLoading ? (
                <div className="glass-card p-5 rounded-2xl space-y-4 bg-slate-900/90 border-slate-800">
                  <div className="h-4 w-1/3 rounded skeleton-shimmer" />
                  <div className="h-6 w-3/4 rounded skeleton-shimmer" />
                </div>
              ) : (
                <div className="glass-card p-5 sm:p-6 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 space-y-4 shadow-2xl shadow-blue-950/80 hover:border-blue-400/60 transition-all duration-300 group">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Live Workspace Status</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Exam Ready
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors">
                      CS-3A Mid-Term Examination
                    </h3>
                    <div className="flex items-center space-x-3 text-[11px] font-semibold text-slate-300">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>45 Minutes</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span>Classroom 302 (18m)</span>
                      </span>
                    </div>
                  </div>

                  {/* Compact MCQ Preview Box */}
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/80 text-[11px] font-medium space-y-2">
                    <span className="font-bold text-blue-300 block">Q1 (Jumbled Seed #842):</span>
                    <p className="text-slate-300 text-xs">What is the time complexity of searching in a BST?</p>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400">A) O(N)</div>
                      <div className="p-2 rounded-lg bg-blue-600/30 border border-blue-500/60 font-bold text-[10px] text-blue-200">B) O(log N) ✓</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-0.5">
                    <span>Warnings: <strong className="text-emerald-400">0/3</strong></span>
                    <span className="flex items-center space-x-1 text-blue-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Auto-Saved</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* PORTALS & SERVICES GRID SECTION - 3D Character Stage Cards */}
        <section id="portals" className="space-y-12 pt-10">
          <div className="text-center space-y-3">
            <h2
              onClick={(e) => { e.stopPropagation(); setSelectedId("portals_title"); }}
              onMouseDown={(e) => handleMouseDown("portals_title", e)}
              className={`text-3xl sm:text-5xl font-black text-white tracking-tight transition-all ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400 p-2 rounded-2xl" : ""
              } ${selectedId === "portals_title" ? "ring-2 ring-blue-500 bg-blue-500/10 p-2 rounded-2xl" : ""}`}
              style={{
                fontSize: getProp("portals_title", "fontSize", 100) !== 100 ? `${getProp("portals_title", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("portals_title", "scale", 100) / 100}) translate(${getProp("portals_title", "x", 0)}px, ${getProp("portals_title", "y", 0)}px)`
              }}
            >
              {getProp("portals_title", "text", "Student & Faculty Gateways")}
            </h2>
            <p
              onClick={(e) => { e.stopPropagation(); setSelectedId("portals_desc"); }}
              onMouseDown={(e) => handleMouseDown("portals_desc", e)}
              className={`text-base sm:text-lg text-slate-400 font-medium max-w-2xl mx-auto transition-all ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400 p-2 rounded-2xl" : ""
              } ${selectedId === "portals_desc" ? "ring-2 ring-blue-500 bg-blue-500/10 p-2 rounded-2xl" : ""}`}
              style={{
                fontSize: getProp("portals_desc", "fontSize", 100) !== 100 ? `${getProp("portals_desc", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("portals_desc", "scale", 100) / 100}) translate(${getProp("portals_desc", "x", 0)}px, ${getProp("portals_desc", "y", 0)}px)`
              }}
            >
              {getProp("portals_desc", "text", "Partitioned workspace hubs ensuring complete data isolation by Branch, Year, and Section.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Hub Card with 3D Character Stage */}
            <div
              onClick={(e) => { e.stopPropagation(); setSelectedId("student_hub_card"); }}
              onMouseDown={(e) => handleMouseDown("student_hub_card", e)}
              className={`glass-card p-8 sm:p-10 rounded-3xl glass-card-hover bg-slate-900/80 border-slate-800 space-y-8 flex flex-col justify-between overflow-hidden relative group transition-all ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-4 hover:ring-blue-500/60" : ""
              } ${selectedId === "student_hub_card" ? "ring-4 ring-blue-500 border-blue-400 bg-blue-950/40" : ""}`}
              style={{
                fontSize: getProp("student_hub_card", "fontSize", 100) !== 100 ? `${getProp("student_hub_card", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("student_hub_card", "scale", 100) / 100}) translate(${getProp("student_hub_card", "x", 0)}px, ${getProp("student_hub_card", "y", 0)}px)`
              }}
            >
              <div className="space-y-6">
                {/* 3D Character Display Stage */}
                <div
                  onClick={(e) => { e.stopPropagation(); setSelectedId("student_hub_img"); }}
                  className="h-56 w-full rounded-2xl bg-gradient-to-b from-slate-950/90 to-slate-900/50 border border-slate-800 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={studentHubImage}
                    alt="3D Student Hub Badge Character"
                    className="h-48 object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {getProp("student_hub_title", "text", "Student Hub")}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {getProp("student_hub_desc", "text", "Access geofenced exams, instant PDF documents, WhatsApp-style classmate messaging, and NVIDIA AI Studio assistant.")}
                  </p>
                </div>
              </div>
              <a
                href="#student-login"
                className="btn-sapphire-crystal text-sm py-4 w-full flex items-center justify-center space-x-2"
              >
                <span>{getProp("student_hub_btn", "text", "Launch Student Hub")}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Faculty Hub Card with 3D Character Stage */}
            <div
              onClick={(e) => { e.stopPropagation(); setSelectedId("faculty_studio_card"); }}
              onMouseDown={(e) => handleMouseDown("faculty_studio_card", e)}
              className={`glass-card p-8 sm:p-10 rounded-3xl glass-card-hover bg-slate-900/80 border-slate-800 space-y-8 flex flex-col justify-between overflow-hidden relative group transition-all ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-4 hover:ring-indigo-500/60" : ""
              } ${selectedId === "faculty_studio_card" ? "ring-4 ring-indigo-500 border-indigo-400 bg-indigo-950/40" : ""}`}
              style={{
                fontSize: getProp("faculty_studio_card", "fontSize", 100) !== 100 ? `${getProp("faculty_studio_card", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("faculty_studio_card", "scale", 100) / 100}) translate(${getProp("faculty_studio_card", "x", 0)}px, ${getProp("faculty_studio_card", "y", 0)}px)`
              }}
            >
              <div className="space-y-6">
                {/* 3D Character Display Stage */}
                <div
                  onClick={(e) => { e.stopPropagation(); setSelectedId("faculty_studio_img"); }}
                  className="h-56 w-full rounded-2xl bg-gradient-to-b from-slate-950/90 to-slate-900/50 border border-slate-800 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={facultyStudioImage}
                    alt="3D Faculty Studio Character"
                    className="h-48 object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {getProp("faculty_studio_title", "text", "Faculty Studio")}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {getProp("faculty_studio_desc", "text", "Schedule MCQ exams, generate AI questions from syllabus notes, set 6-digit PINs, and monitor live proctoring grids.")}
                  </p>
                </div>
              </div>
              <a
                href="#faculty-login"
                className="btn-silver-glass text-sm py-4 w-full flex items-center justify-center space-x-2 bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                <span>{getProp("faculty_studio_btn", "text", "Open Faculty Studio")}</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </a>
            </div>

            {/* Android APK Card with 3D Character Stage */}
            <div
              onClick={(e) => { e.stopPropagation(); setSelectedId("native_apk_card"); }}
              onMouseDown={(e) => handleMouseDown("native_apk_card", e)}
              className={`glass-card p-8 sm:p-10 rounded-3xl glass-card-hover bg-slate-900/80 border-emerald-500/40 space-y-8 flex flex-col justify-between overflow-hidden relative group transition-all ${
                isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-4 hover:ring-emerald-500/60" : ""
              } ${selectedId === "native_apk_card" ? "ring-4 ring-emerald-500 border-emerald-400 bg-emerald-950/40" : ""}`}
              style={{
                fontSize: getProp("native_apk_card", "fontSize", 100) !== 100 ? `${getProp("native_apk_card", "fontSize", 100) / 100}em` : undefined,
                transform: `scale(${getProp("native_apk_card", "scale", 100) / 100}) translate(${getProp("native_apk_card", "x", 0)}px, ${getProp("native_apk_card", "y", 0)}px)`
              }}
            >
              <div className="space-y-6">
                {/* 3D Character Display Stage */}
                <div
                  onClick={(e) => { e.stopPropagation(); setSelectedId("native_apk_img"); }}
                  className="h-56 w-full rounded-2xl bg-gradient-to-b from-slate-950/90 to-slate-900/50 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nativeApkImage}
                    alt="3D Native APK Character"
                    className="h-48 object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      {getProp("native_apk_title", "text", "Native APKs")}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {getProp("native_apk_desc", "text", "Un-bypassable Student APK with screenshot block & 3-strike lock, plus portable Faculty Management APK.")}
                  </p>
                </div>
              </div>
              <a
                href="#download-apk"
                className="btn-silver-glass text-sm py-4 w-full flex items-center justify-center space-x-2 border-emerald-400/40 text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>{getProp("native_apk_btn", "text", "Download Student APK")}</span>
              </a>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SLIDE DECK SECTION - 3D Graphic Integration */}
        <section
          id="deck"
          onClick={(e) => { e.stopPropagation(); setSelectedId("deck_section"); }}
          onMouseDown={(e) => handleMouseDown("deck_section", e)}
          className={`glass-card p-8 sm:p-12 rounded-3xl bg-slate-900/85 border-slate-800 space-y-8 shadow-2xl transition-all ${
            isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400/60" : ""
          } ${selectedId === "deck_section" ? "ring-4 ring-blue-500 border-blue-400" : ""}`}
          style={{
            fontSize: getProp("deck_section", "fontSize", 100) !== 100 ? `${getProp("deck_section", "fontSize", 100) / 100}em` : undefined,
            transform: `scale(${getProp("deck_section", "scale", 100) / 100}) translate(${getProp("deck_section", "x", 0)}px, ${getProp("deck_section", "y", 0)}px)`
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {getProp("deck_tag", "text", "Platform Architecture Deck")}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                {getProp("deck_title", "text", "Core Security & Autonomy Modules")}
              </h2>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold px-4 text-slate-400">
                {activeSlide + 1} / {slides.length}
              </span>
              <button
                onClick={() => setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Slide Content with 3D Pop-out Graphic Stage */}
          {(() => {
            const slideImages = [
              "/images/3d/proctor_warning_shield.png", // Slide 1: 200m GPS Geofence Lock
              "/images/3d/student_login_badge.png",    // Slide 2: 6-Digit Faculty Entry PIN (Placeholder until generated)
              "/images/3d/student_hub_study_desk.png",   // Slide 3: 3-Strike Anti-Cheating Guard
              "/images/3d/faculty_female_professor.png"  // Slide 4: Instant PDF Marksheet Dispatch
            ];
            const current3DImg = slideImages[activeSlide] || "/images/3d/proctor_warning_shield.png";

            return (
              <div key={activeSlide} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
                <div className="md:col-span-4 flex justify-center">
                  <div
                    onClick={(e) => { e.stopPropagation(); setSelectedId("deck_img"); }}
                    className="w-full h-56 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-center p-4 relative overflow-visible"
                  >
                    <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={current3DImg}
                      src={current3DImg}
                      alt={slides[activeSlide].title}
                      className="h-56 object-contain relative z-20 -mt-8 sm:-mt-10 scale-110 drop-shadow-[0_20px_40px_rgba(37,99,235,0.45)] animate-pop-in hover:scale-120 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4 animate-fade-up">
                  <div className="inline-flex items-center space-x-3">
                    <span className="px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                      {slides[activeSlide].tag}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                      {slides[activeSlide].stat}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white">
                    {slides[activeSlide].title}
                  </h3>
                  <span className="text-base font-semibold text-blue-400 block">
                    {slides[activeSlide].subtitle}
                  </span>
                  <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-4xl">
                    {slides[activeSlide].description}
                  </p>
                </div>
              </div>
            );
          })()}
        </section>

        {/* FOUNDER VISION & CREDITS SECTION - 3D University Building Integration */}
        <section
          id="vision"
          onClick={(e) => { e.stopPropagation(); setSelectedId("vision_section"); }}
          onMouseDown={(e) => handleMouseDown("vision_section", e)}
          className={`glass-card p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-blue-950/80 border-slate-800 space-y-8 overflow-hidden relative transition-all ${
            isEditMode ? "cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400/60" : ""
          } ${selectedId === "vision_section" ? "ring-4 ring-blue-500 border-blue-400" : ""}`}
          style={{
            fontSize: getProp("vision_section", "fontSize", 100) !== 100 ? `${getProp("vision_section", "fontSize", 100) / 100}em` : undefined,
            transform: `scale(${getProp("vision_section", "scale", 100) / 100}) translate(${getProp("vision_section", "x", 0)}px, ${getProp("vision_section", "y", 0)}px)`
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-5">
              <span
                onClick={(e) => { e.stopPropagation(); setSelectedId("vision_tag"); }}
                className="text-xs font-bold uppercase tracking-wider text-blue-400 block cursor-pointer"
              >
                {getProp("vision_tag", "text", "Platform Blueprint & Vision")}
              </span>
              <h2
                onClick={(e) => { e.stopPropagation(); setSelectedId("vision_title"); }}
                className="text-3xl sm:text-5xl font-black text-white tracking-tight cursor-pointer"
              >
                {getProp("vision_title", "text", "Architected by Md Jibran")}
              </h2>
              <p
                onClick={(e) => { e.stopPropagation(); setSelectedId("vision_desc"); }}
                className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl cursor-pointer"
              >
                {getProp(
                  "vision_desc",
                  "text",
                  "LeGeZt was conceived to deliver a transparent, autonomous, and offline-resilient college management platform. Combining high-concurrency Go services, Next.js web applications, and secure native Android APKs to elevate institutional academic standards."
                )}
              </p>

              <div className="pt-4 flex items-center space-x-4">
                <a
                  href="#buy-coffee"
                  onClick={(e) => { e.stopPropagation(); setSelectedId("support_btn"); }}
                  className="btn-sapphire-crystal text-sm px-6 py-3.5 flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 border-amber-300 text-white shadow-amber-500/30"
                >
                  <Coffee className="w-5 h-5" />
                  <span>{getProp("support_btn", "text", "Support Development")}</span>
                </a>
              </div>
            </div>

            {/* Right Column - 3D Student & University Building Graphic Stage */}
            <div className="md:col-span-5 flex justify-center items-center relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/3d/vision_campus_building.png"
                alt="3D Student with University Campus Building & Server"
                className="w-full max-w-[480px] object-contain drop-shadow-[0_20px_40px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer
        onClick={(e) => { e.stopPropagation(); setSelectedId("footer_section"); }}
        className="relative z-10 border-t border-slate-800 bg-slate-950/90 backdrop-blur-xl py-10 px-6 text-center text-xs font-semibold text-slate-400 space-y-2 cursor-pointer"
      >
        <p className="text-slate-300 font-bold">
          {getProp("footer_text", "text", "© 2026 LeGeZt Academic Ecosystem. Created by Md Jibran.")}
        </p>
        <p className="text-slate-500">
          {getProp("footer_sub", "text", "All rights reserved. Powered by Next.js 15, Tailwind, and Golang Microservices.")}
        </p>
      </footer>
    </div>
  );
}
