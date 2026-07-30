"use client";

import React, { useState, useEffect } from "react";
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
    },
    {
      title: "6-Digit Faculty Entry PIN",
      subtitle: "Classroom Verification Gate",
      description:
        "Faculty generates a 6-digit PIN in the classroom. Students must satisfy both the GPS Geofence AND the Entry PIN to begin.",
      icon: Lock,
      tag: "Dual Verification",
    },
    {
      title: "3-Strike Anti-Cheating Guard",
      subtitle: "Un-Bypassable Proctor Listener",
      description:
        "Monitors tab switching, notification drawers, floating AI windows, and split screens. 3 strikes trigger instant auto-submission and faculty flagging.",
      icon: Flame,
      tag: "Automated Proctor",
    },
    {
      title: "Instant PDF Marksheet Dispatch",
      subtitle: "legezt@gmail.com Automated SMTP Relay",
      description:
        "Evaluates scores immediately upon submission, generates itemized PDF marksheets, and dispatches full class reports to Faculty email.",
      icon: FileCheck2,
      tag: "Auto Grading",
    },
  ];

  const handleRefreshSim = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Background CS Engineering Lab Photography Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2000')`,
        }}
      />
      
      {/* Ambient Gradient Mesh Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-tr from-slate-200/90 via-slate-100/95 to-blue-50/70 pointer-events-none" />

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-slate-200/80 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Emblem */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border border-white/40">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
                LeGeZt
              </span>
              <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                v4.0 Enterprise
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#portals" className="hover:text-blue-600 transition-colors">Portals</a>
            <a href="#deck" className="hover:text-blue-600 transition-colors">Platform Deck</a>
            <a href="#vision" className="hover:text-blue-600 transition-colors">Vision</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefreshSim}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-200/60 transition-colors"
              title="Simulate Skeleton Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-600" : ""}`} />
            </button>
            <a
              href="#student-login"
              className="btn-sapphire-crystal text-xs sm:text-sm px-5 py-2.5 flex items-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Login</span>
            </a>
            <a
              href="#faculty-login"
              className="btn-silver-glass text-xs sm:text-sm px-5 py-2.5 hidden sm:flex items-center space-x-2"
            >
              <Lock className="w-4 h-4 text-slate-700" />
              <span>Faculty Portal</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-20">
        
        {/* HERO SECTION - Asymmetric Split Screen */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Autonomous Intranet & Geofenced Exam System</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              The Next-Gen <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800">
                Academic & Exam Portal
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
              Engineered by <strong className="text-slate-900">Md Jibran</strong> for high-integrity college examinations. 
              Featuring 200m GPS geofence locking, randomized MCQ shuffling, un-bypassable 3-strike proctoring, and instant PDF marksheet dispatch.
            </p>

            {/* Quick Action Grid */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#student-login"
                className="btn-sapphire-crystal text-sm px-7 py-3.5 flex items-center space-x-2 shadow-xl shadow-blue-600/20"
              >
                <span>Student Hub Access</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#faculty-login"
                className="btn-silver-glass text-sm px-7 py-3.5 flex items-center space-x-2"
              >
                <Lock className="w-4 h-4 text-slate-700" />
                <span>Faculty Studio</span>
              </a>
              <a
                href="#download-apk"
                className="btn-silver-glass text-sm px-5 py-3.5 flex items-center space-x-2 border-emerald-300 text-emerald-900 bg-emerald-50/80 hover:bg-emerald-100"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Install APK</span>
              </a>
            </div>

            {/* Live Metrics Cards */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg">
              <div className="glass-card p-4 rounded-2xl">
                <span className="text-2xl font-black text-blue-700 block">200m</span>
                <span className="text-xs font-semibold text-slate-500">GPS Geofence</span>
              </div>
              <div className="glass-card p-4 rounded-2xl">
                <span className="text-2xl font-black text-indigo-700 block">3-Strike</span>
                <span className="text-xs font-semibold text-slate-500">Proctor Guard</span>
              </div>
              <div className="glass-card p-4 rounded-2xl">
                <span className="text-2xl font-black text-emerald-700 block">0.1s</span>
                <span className="text-xs font-semibold text-slate-500">PDF Document Engine</span>
              </div>
            </div>
          </div>

          {/* Hero Right Column - Interactive Card Preview / Skeleton Toggle */}
          <div className="lg:col-span-5">
            {isLoading ? (
              /* Skeleton Shimmer Loading Card */
              <div className="glass-card p-8 rounded-3xl space-y-6">
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
              <div className="glass-card p-8 rounded-3xl glass-card-hover border border-white/90 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Workspace Status</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Exam Ready
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    CS-3A Mid-Term Examination
                  </h3>
                  <div className="flex items-center space-x-4 text-xs font-semibold text-slate-600">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>45 Minutes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>Classroom 302 (18m away)</span>
                    </span>
                  </div>
                </div>

                {/* Shuffled Question Box Preview */}
                <div className="p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-xs font-medium space-y-2">
                  <span className="font-bold text-slate-900 block">Q1 (Jumbled Seed #842):</span>
                  <p className="text-slate-700">What is the time complexity of searching in a balanced Binary Search Tree?</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded bg-white border border-slate-200 font-semibold text-slate-800">A) O(N)</div>
                    <div className="p-2 rounded bg-blue-50 border border-blue-300 font-bold text-blue-900">B) O(log N) ✓</div>
                    <div className="p-2 rounded bg-white border border-slate-200 font-semibold text-slate-800">C) O(1)</div>
                    <div className="p-2 rounded bg-white border border-slate-200 font-semibold text-slate-800">D) O(N²)</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Proctor Warning Count: <strong className="text-emerald-600">0/3</strong></span>
                  <span>Answer Auto-Saved locally</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PORTALS & SERVICES GRID SECTION */}
        <section id="portals" className="space-y-8 pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Student & Faculty Gateways
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto">
              Partitioned workspace hubs ensuring complete data isolation by Branch, Year, and Section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Hub Card */}
            <div className="glass-card p-8 rounded-3xl glass-card-hover space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Student Hub</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Access geofenced exams, instant PDF documents, WhatsApp-style classmate messaging, and NVIDIA AI Studio assistant.
                </p>
              </div>
              <a
                href="#student-login"
                className="btn-sapphire-crystal text-xs py-3 w-full flex items-center justify-center space-x-2"
              >
                <span>Launch Student Hub</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Faculty Hub Card */}
            <div className="glass-card p-8 rounded-3xl glass-card-hover space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Faculty Studio</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Schedule MCQ exams, generate AI questions from syllabus notes, set 6-digit PINs, and monitor live proctoring grids.
                </p>
              </div>
              <a
                href="#faculty-login"
                className="btn-silver-glass text-xs py-3 w-full flex items-center justify-center space-x-2"
              >
                <span>Open Faculty Studio</span>
                <ArrowRight className="w-4 h-4 text-slate-700" />
              </a>
            </div>

            {/* Android APK Card */}
            <div className="glass-card p-8 rounded-3xl glass-card-hover space-y-6 flex flex-col justify-between border-emerald-200">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Native Android APKs</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Un-bypassable Student APK with screenshot block & 3-strike lock, plus portable Faculty Management APK.
                </p>
              </div>
              <a
                href="#download-apk"
                className="btn-silver-glass text-xs py-3 w-full flex items-center justify-center space-x-2 border-emerald-300 text-emerald-900 bg-emerald-50 hover:bg-emerald-100"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Download Student APK</span>
              </a>
            </div>
          </div>
        </section>

        {/* INTERACTIVE SLIDE DECK SECTION */}
        <section id="deck" className="glass-card p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Platform Architecture Deck</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Core Security & Autonomy Modules
              </h2>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                className="p-2.5 rounded-full bg-slate-200/80 hover:bg-slate-300 transition-colors text-slate-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold px-3 text-slate-600">
                {activeSlide + 1} / {slides.length}
              </span>
              <button
                onClick={() => setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                className="p-2.5 rounded-full bg-slate-200/80 hover:bg-slate-300 transition-colors text-slate-800"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Slide Content */}
          {(() => {
            const SlideIcon = slides[activeSlide].icon;
            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                <div className="md:col-span-3 flex justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-blue-600/30">
                    <SlideIcon className="w-12 h-12" />
                  </div>
                </div>

                <div className="md:col-span-9 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    {slides[activeSlide].tag}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {slides[activeSlide].title}
                  </h3>
                  <span className="text-sm font-semibold text-blue-700 block">
                    {slides[activeSlide].subtitle}
                  </span>
                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
                    {slides[activeSlide].description}
                  </p>
                </div>
              </div>
            );
          })()}
        </section>

        {/* FOUNDER VISION & CREDITS SECTION */}
        <section id="vision" className="glass-card p-8 sm:p-12 rounded-3xl space-y-8 bg-gradient-to-br from-white/90 to-blue-50/60">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Platform Blueprint & Vision</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Architected by Md Jibran
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                LeGeZt was conceived to deliver a transparent, autonomous, and offline-resilient college management platform. 
                Combining high-concurrency Go services, Next.js web applications, and secure native Android APKs to elevate institutional academic standards.
              </p>
              
              <div className="pt-4 flex items-center space-x-4">
                <a
                  href="#buy-coffee"
                  className="btn-sapphire-crystal text-xs px-5 py-2.5 flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 border-amber-300 text-white shadow-amber-500/20"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Support Development</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-200 to-blue-200 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-slate-700">
                  <GraduationCap className="w-16 h-16 text-blue-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white/60 backdrop-blur-md py-8 px-6 mt-20 text-center text-xs font-semibold text-slate-500 space-y-2">
        <p>© 2026 LeGeZt Academic Ecosystem. Created by Md Jibran.</p>
        <p className="text-slate-400">All rights reserved. Powered by Next.js 15, Tailwind, and Golang Microservices.</p>
      </footer>
    </div>
  );
}
