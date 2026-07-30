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
} from "lucide-react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Interactive Visual Layout Controls State (User live editing access)
  const [isEditMode, setIsEditMode] = useState(true);
  
  // Hero 3D Character Adjustments
  const [heroScale, setHeroScale] = useState(100);
  const [heroX, setHeroX] = useState(0);
  const [heroY, setHeroY] = useState(0);

  // Floating CS-3A Card Adjustments
  const [cardScale, setCardScale] = useState(100);
  const [cardX, setCardX] = useState(0);
  const [cardY, setCardY] = useState(0);

  // Mouse Grab-and-Drag State
  const [activeDragTarget, setActiveDragTarget] = useState<"hero" | "card" | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (target: "hero" | "card", e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setActiveDragTarget(target);
    setDragStart({ x: e.clientX, y: e.clientY });
    if (target === "hero") {
      setInitialPos({ x: heroX, y: heroY });
    } else {
      setInitialPos({ x: cardX, y: cardY });
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
    setHeroScale(100);
    setHeroX(0);
    setHeroY(0);
    setCardScale(100);
    setCardX(0);
    setCardY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative min-h-screen bg-[#0b0f19] text-white selection:bg-blue-600 selection:text-white overflow-x-hidden pb-24 select-none"
    >
      {/* Dynamic Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] bg-cyan-600/10 rounded-full blur-[160px]" />
      </div>

      {/* INTERACTIVE VISUAL LAYOUT ADJUSTMENT OVERLAY TOOLBAR */}
      {isEditMode && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-slate-900/95 backdrop-blur-2xl border-2 border-blue-500/60 rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-3 transition-all">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-blue-400 font-black text-sm">
              <Sparkles className="w-5 h-5 text-blue-400 animate-spin" />
              <span>🎨 Live Visual Adjuster Mode (Active)</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={resetLayoutAdjuster}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 transition-colors flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                className="px-3.5 py-1.5 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/40 font-bold border border-red-500/40 transition-colors"
              >
                ✖ Hide Adjuster
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold">
            {/* 3D Student Character Size & Position Controls */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-blue-300 font-bold">
                <span>3D Character Size:</span>
                <span>{heroScale}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={heroScale}
                onChange={(e) => setHeroScale(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>X Offset: {heroX}px</span>
                <span>Y Offset: {heroY}px</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="range"
                  min="-250"
                  max="250"
                  value={heroX}
                  onChange={(e) => setHeroX(Number(e.target.value))}
                  className="w-1/2 accent-blue-400"
                />
                <input
                  type="range"
                  min="-250"
                  max="250"
                  value={heroY}
                  onChange={(e) => setHeroY(Number(e.target.value))}
                  className="w-1/2 accent-blue-400"
                />
              </div>
            </div>

            {/* Floating CS-3A Card Size & Position Controls */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between text-indigo-300 font-bold">
                <span>CS-3A Card Size:</span>
                <span>{cardScale}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="180"
                value={cardScale}
                onChange={(e) => setCardScale(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>X Offset: {cardX}px</span>
                <span>Y Offset: {cardY}px</span>
              </div>
              <div className="flex space-x-2">
                <input
                  type="range"
                  min="-350"
                  max="350"
                  value={cardX}
                  onChange={(e) => setCardX(Number(e.target.value))}
                  className="w-1/2 accent-indigo-400"
                />
                <input
                  type="range"
                  min="-300"
                  max="300"
                  value={cardY}
                  onChange={(e) => setCardY(Number(e.target.value))}
                  className="w-1/2 accent-indigo-400"
                />
              </div>
            </div>

            {/* Summary & Live CSS Code Output */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 flex flex-col justify-between">
              <span className="font-bold text-emerald-400 block">Live Coordinates Output:</span>
              <code className="text-[10px] text-slate-300 bg-slate-900 p-2 rounded block overflow-x-auto">
                Character: size({heroScale}%), pos({heroX}px, {heroY}px)<br />
                Floating Card: size({cardScale}%), pos({cardX}px, {cardY}px)
              </code>
              <span className="text-[10px] text-slate-400 italic">Adjust sliders to find perfect balance!</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Re-enable Editor Toggle (Shown when toolbar is hidden) */}
      {!isEditMode && (
        <button
          onClick={() => setIsEditMode(true)}
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-2xl border border-blue-400/40 flex items-center space-x-2 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Open Visual Adjuster</span>
        </button>
      )}

      {/* Full-Bleed Top Header Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f19]/80 border-b border-slate-800/80 px-6 lg:px-12 xl:px-16 py-4 shadow-2xl shadow-black/40">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between">
          {/* Logo & Emblem */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 border border-white/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white block leading-none">
                LeGeZt
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 mt-1 inline-block">
                v4.0 Enterprise
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10 text-sm font-semibold text-slate-300">
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#portals" className="hover:text-blue-400 transition-colors">Portals</a>
            <a href="#deck" className="hover:text-blue-400 transition-colors">Platform Deck</a>
            <a href="#vision" className="hover:text-blue-400 transition-colors">Vision</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefreshSim}
              className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-800"
              title="Simulate Skeleton Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-400" : ""}`} />
            </button>
            <a
              href="#student-login"
              className="btn-sapphire-crystal text-xs sm:text-sm px-6 py-2.5 flex items-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Login</span>
            </a>
            <a
              href="#faculty-login"
              className="btn-silver-glass text-xs sm:text-sm px-6 py-2.5 hidden sm:flex items-center space-x-2 bg-slate-800/90 text-white border-slate-700 hover:bg-slate-700"
            >
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Faculty Studio</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Full-Width Content Container */}
      <main className="relative z-10 max-w-[1750px] mx-auto px-6 lg:px-12 xl:px-16 py-10 space-y-28">
        
        {/* HERO SECTION - 3D Character & Floating Status Widget Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative">
          
          {/* Hero Left Column - Copy & Action Buttons */}
          <div className="lg:col-span-5 space-y-8 z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Autonomous Intranet & 200m Geofenced Exam System</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
              The Next-Gen <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Academic & Exam Portal
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Architected by <strong className="text-white font-semibold">Md Jibran</strong> for ultra-secure Indian college examinations. 
              Featuring 200m GPS geofence locking, randomized MCQ shuffling, un-bypassable 3-strike proctoring, and instant PDF marksheet dispatch.
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
              src="/images/3d/hero_student_laptop.png"
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
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Student & Faculty Gateways
            </h2>
            <p className="text-base sm:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
              Partitioned workspace hubs ensuring complete data isolation by Branch, Year, and Section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Hub Card with 3D Character Stage */}
            <div className="glass-card p-8 sm:p-10 rounded-3xl glass-card-hover bg-slate-900/80 border-slate-800 space-y-8 flex flex-col justify-between overflow-hidden relative group">
              <div className="space-y-6">
                {/* 3D Character Display Stage */}
                <div className="h-56 w-full rounded-2xl bg-gradient-to-b from-slate-950/90 to-slate-900/50 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/3d/student_hub_study_desk.png"
                    alt="3D Student Hub Character"
                    className="h-48 object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Student Hub</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    Access geofenced exams, instant PDF documents, WhatsApp-style classmate messaging, and NVIDIA AI Studio assistant.
                  </p>
                </div>
              </div>
              <a
                href="#student-login"
                className="btn-sapphire-crystal text-sm py-4 w-full flex items-center justify-center space-x-2"
              >
                <span>Launch Student Hub</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Faculty Hub Card with 3D Character Stage */}
            <div className="glass-card p-8 sm:p-10 rounded-3xl glass-card-hover bg-slate-900/80 border-slate-800 space-y-8 flex flex-col justify-between overflow-hidden relative group">
              <div className="space-y-6">
                {/* 3D Character Display Stage */}
                <div className="h-56 w-full rounded-2xl bg-gradient-to-b from-slate-950/90 to-slate-900/50 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/3d/faculty_female_professor.png"
                    alt="3D Faculty Studio Character"
                    className="h-48 object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(99,102,241,0.3)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 flex items-center justify-center">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Faculty Studio</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    Schedule MCQ exams, generate AI questions from syllabus notes, set 6-digit PINs, and monitor live proctoring grids.
                  </p>
                </div>
              </div>
              <a
                href="#faculty-login"
                className="btn-silver-glass text-sm py-4 w-full flex items-center justify-center space-x-2 bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                <span>Open Faculty Studio</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </a>
            </div>

            {/* Android APK Card with 3D Character Stage */}
            <div className="glass-card p-8 sm:p-10 rounded-3xl glass-card-hover bg-slate-900/80 border-emerald-500/40 space-y-8 flex flex-col justify-between overflow-hidden relative group">
              <div className="space-y-6">
                {/* 3D Character Display Stage */}
                <div className="h-56 w-full rounded-2xl bg-gradient-to-b from-slate-950/90 to-slate-900/50 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/3d/native_apk_student_shield.png"
                    alt="3D Native APK Character"
                    className="h-48 object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-white">Native APKs</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    Un-bypassable Student APK with screenshot block & 3-strike lock, plus portable Faculty Management APK.
                  </p>
                </div>
              </div>
              <a
                href="#download-apk"
                className="btn-silver-glass text-sm py-4 w-full flex items-center justify-center space-x-2 border-emerald-400/40 text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Student APK</span>
              </a>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SLIDE DECK SECTION - 3D Graphic Integration */}
        <section id="deck" className="glass-card p-8 sm:p-12 rounded-3xl bg-slate-900/85 border-slate-800 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Platform Architecture Deck</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                Core Security & Autonomy Modules
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

          {/* Active Slide Content with 3D Graphic Stage */}
          {(() => {
            const slideImages = [
              "/images/3d/geofence_gps_radar.png",
              "/images/3d/faculty_classroom_whiteboard.png",
              "/images/3d/proctor_warning_shield.png",
              "/images/3d/pdf_marksheet_dispatch.png"
            ];
            const current3DImg = slideImages[activeSlide] || "/images/3d/geofence_gps_radar.png";

            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-full h-56 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current3DImg}
                      alt={slides[activeSlide].title}
                      className="h-44 object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(37,99,235,0.4)]"
                    />
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
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
        <section id="vision" className="glass-card p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-blue-950/80 border-slate-800 space-y-8 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Platform Blueprint & Vision</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Architected by Md Jibran
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
                LeGeZt was conceived to deliver a transparent, autonomous, and offline-resilient college management platform. 
                Combining high-concurrency Go services, Next.js web applications, and secure native Android APKs to elevate institutional academic standards.
              </p>
              
              <div className="pt-4 flex items-center space-x-4">
                <a
                  href="#buy-coffee"
                  className="btn-sapphire-crystal text-sm px-6 py-3.5 flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 border-amber-300 text-white shadow-amber-500/30"
                >
                  <Coffee className="w-5 h-5" />
                  <span>Support Development</span>
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
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/90 backdrop-blur-xl py-10 px-6 text-center text-xs font-semibold text-slate-400 space-y-2">
        <p className="text-slate-300 font-bold">© 2026 LeGeZt Academic Ecosystem. Created by Md Jibran.</p>
        <p className="text-slate-500">All rights reserved. Powered by Next.js 15, Tailwind, and Golang Microservices.</p>
      </footer>
    </div>
  );
}
