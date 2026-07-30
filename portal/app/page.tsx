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

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Rich Glowing Ambient Light Orbs for 3D Depth */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/20 blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[35%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none z-0" />

      {/* Main Canvas Background Mesh */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0b0f19] to-black pointer-events-none" />

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
        
        {/* HERO SECTION - 3D Character Split Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 relative">
          
          {/* Hero Left Column */}
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

          {/* Hero Center Column - HUGE 3D Student Character */}
          <div className="lg:col-span-3 flex flex-col justify-center items-center relative z-20 min-h-[480px] lg:min-h-[620px]">
            {/* Ambient Background Radial Glow behind Character */}
            <div className="absolute inset-0 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none scale-125" />
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/3d/3d_character_1.png"
              alt="3D Hero Student at Laptop"
              className="w-[125%] max-w-[580px] lg:max-w-[720px] object-contain drop-shadow-[0_35px_50px_rgba(37,99,235,0.5)] hover:scale-110 transition-transform duration-500 relative z-10 -my-8"
            />

            {/* Grounded 3D Shadow Ring */}
            <div className="w-[80%] h-8 bg-blue-500/20 rounded-[100%] blur-xl pointer-events-none -mt-4 relative z-0" />
          </div>

          {/* Hero Right Column - Live Workspace Card Preview */}
          <div className="lg:col-span-4 z-10">
            {isLoading ? (
              /* Skeleton Shimmer Loading Card */
              <div className="glass-card p-8 rounded-3xl space-y-6 bg-slate-900/80 border-slate-800">
                <div className="h-6 w-1/3 rounded-lg skeleton-shimmer" />
                <div className="h-10 w-3/4 rounded-xl skeleton-shimmer" />
                <div className="space-y-3 pt-4">
                  <div className="h-4 w-full rounded-md skeleton-shimmer" />
                  <div className="h-4 w-5/6 rounded-md skeleton-shimmer" />
                  <div className="h-4 w-4/6 rounded-md skeleton-shimmer" />
                </div>
                <div className="h-12 w-full rounded-full skeleton-shimmer pt-6" />
              </div>
            ) : (
              /* Live Workspace Card Preview */
              <div className="glass-card p-7 sm:p-8 rounded-3xl bg-slate-900/90 border-slate-800 space-y-6 relative overflow-hidden shadow-2xl shadow-black/70">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Workspace Status</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Exam Ready
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white">
                    CS-3A Mid-Term Examination
                  </h3>
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-300">
                    <span className="flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>45 Minutes</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>Classroom 302 (18m away)</span>
                    </span>
                  </div>
                </div>

                {/* Shuffled Question Box Preview */}
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs font-medium space-y-3">
                  <span className="font-bold text-blue-300 block">Q1 (Jumbled Seed #842):</span>
                  <p className="text-slate-200 text-sm">What is the time complexity of searching in a balanced Binary Search Tree?</p>
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-semibold text-slate-300">A) O(N)</div>
                    <div className="p-3 rounded-xl bg-blue-600/30 border border-blue-500/60 font-bold text-blue-200">B) O(log N) ✓</div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-semibold text-slate-300">C) O(1)</div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-semibold text-slate-300">D) O(N²)</div>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span>Proctor Warnings: <strong className="text-emerald-400">0/3</strong></span>
                  <span className="flex items-center space-x-1 text-blue-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Auto-Saved Locally</span>
                  </span>
                </div>
              </div>
            )}
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
                    src="/images/3d/3d_character_2.png"
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
                    src="/images/3d/3d_character_3.png"
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
                    src="/images/3d/3d_character_4.png"
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
            const SlideIcon = slides[activeSlide].icon;
            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-full h-56 rounded-3xl bg-slate-950/80 border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/3d/3d_character_6.png"
                      alt="3D Security Radar"
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
                src="/images/3d/3d_character_10.png"
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
