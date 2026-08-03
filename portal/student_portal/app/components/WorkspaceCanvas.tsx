"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Bell,
  Sparkles,
  Target,
  CheckCircle2,
} from "lucide-react";

interface WorkspaceCanvasProps {
  theme: "dark" | "light";
  activeDocId: string;
  geofenceVerified: boolean;
  userLat: number;
  userLon: number;
  openGeofenceModal: () => void;
  openOtpModal: () => void;
}

export const WorkspaceCanvas: React.FC<WorkspaceCanvasProps> = ({
  theme,
  activeDocId,
  geofenceVerified,
  userLat,
  userLon,
  openGeofenceModal,
  openOtpModal,
}) => {
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setAiResponse(`AI Assistant Answer for "${aiQuery}": Review key topics in Unit 3 (Trees & Graphs) and focus on time complexity algorithms.`);
  };

  return (
    <main
      className={`flex-1 h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-6 lg:p-8 font-sans transition-colors ${
        theme === "light"
          ? "bg-[#f4f6f9] text-slate-900"
          : "bg-[#0a0c10] text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HERO WELCOME BANNER (Matching Screenshot Exactly) */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white p-6 sm:p-8 overflow-hidden shadow-xl shadow-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                AUTONOMOUS INTRANET WORKSPACE
              </span>
              <span className="text-xs text-blue-100 font-bold">
                Lords Institute of Engineering & Technology
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Welcome back, Mohd Jibraan 👋
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
              Access your test history, course syllabus progress, 200m GPS security checks, and AI study tutor below.
            </p>
          </div>

          {/* Right Hero Graphic & Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 relative overflow-hidden drop-shadow-2xl">
              <img
                src="/box1_student_desk.png"
                alt="Student 3D Graphic"
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            <button
              onClick={openOtpModal}
              className="px-5 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-950/20 flex items-center gap-2 shrink-0 border border-emerald-300"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Live Test Hub</span>
            </button>
          </div>

          {/* Decorative background glow */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* 6 FEATURE DASHBOARD CARDS GRID (Exact Layout & Pill Styling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD 1: TEST TAKEN & EXAM STUDIO */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-sm ${
              theme === "light"
                ? "bg-white border-slate-100"
                : "bg-[#0f1219] border-slate-800/80"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-2 border border-blue-100 dark:border-blue-900/40 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src="/box1_student_desk.png"
                    alt="Exam Studio Graphic"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-[10px] font-black uppercase tracking-wider">
                  BOX 1 • EXAMS
                </span>
              </div>

              <div>
                <h3 className="text-base font-black tracking-tight">
                  Test Taken & Exam Studio
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                  Track completed MCQ exams, average scores, and upcoming test schedules.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      DSA Final Exam (CS-302)
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Score: 85/100 (85%)
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">
                    PASSED ✓
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      Operating Systems Mid-Term
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Score: 45/50 (90%)
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px]">
                    PASSED ✓
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={openOtpModal}
              className="w-full py-3 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100/80 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-900/40 font-bold text-xs transition-colors flex items-center justify-between group"
            >
              <span>Launch Exam Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 2: SYLLABUS & COURSE PROGRESS */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-sm ${
              theme === "light"
                ? "bg-white border-slate-100"
                : "bg-[#0f1219] border-slate-800/80"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-2 border border-emerald-100 dark:border-emerald-900/40 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src="/student_3d_pointing.png"
                    alt="Syllabus Graphic"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                  BOX 2 • SYLLABUS
                </span>
              </div>

              <div>
                <h3 className="text-base font-black tracking-tight">
                  Syllabus & Course Progress
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                  Monitor completed units and syllabus completion across subjects.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Data Structures (CSE-302)</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Computer Networks (CSE-306)</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">90%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Operating Systems (CSE-304)</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">70%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs font-bold text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80">
              <span>Unit 4 of 5 Completed</span>
              <span className="text-emerald-500 font-extrabold flex items-center gap-1">
                On Track ↗
              </span>
            </div>
          </div>

          {/* CARD 3: ENVIRONMENT SECURITY CHECK */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-sm ${
              theme === "light"
                ? "bg-white border-slate-100"
                : "bg-[#0f1219] border-slate-800/80"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 p-2 border border-indigo-100 dark:border-indigo-900/40 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src="/box3_security_shield.png"
                    alt="Geofence Security Graphic"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-[10px] font-black uppercase tracking-wider">
                  BOX 3 • SECURITY
                </span>
              </div>

              <div>
                <h3 className="text-base font-black tracking-tight">
                  Environment Security Check
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                  Verify 200m GPS Geofence and device protection security parameters.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">200m GPS Campus Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-extrabold flex items-center gap-1">
                    VERIFIED ✓
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  LIET Campus Center: 17.385044, 78.486617 (Distance: 31m)
                </div>
              </div>
            </div>

            <button
              onClick={openGeofenceModal}
              className="w-full py-3 px-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 font-bold text-xs transition-colors flex items-center justify-between"
            >
              <span>Inspect GPS Radar</span>
              <Target className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 4: AI STUDY ASSISTANT */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-sm ${
              theme === "light"
                ? "bg-white border-slate-100"
                : "bg-[#0f1219] border-slate-800/80"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-950/40 p-2 border border-purple-100 dark:border-purple-900/40 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src="/box4_ai_robot.png"
                    alt="AI Robot Graphic"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-[10px] font-black uppercase tracking-wider">
                  BOX 4 • AI TUTOR
                </span>
              </div>

              <div>
                <h3 className="text-base font-black tracking-tight">
                  AI Study Assistant
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                  Ask doubt questions and get instant AI study summaries.
                </p>
              </div>

              <form onSubmit={handleAiAsk} className="space-y-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask AI tutor a question..."
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 rounded-xl text-xs font-medium focus:outline-none focus:border-purple-500"
                />
              </form>

              {aiResponse && (
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 text-xs font-medium">
                  {aiResponse}
                </div>
              )}
            </div>

            <button
              onClick={handleAiAsk}
              className="w-full py-3 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100/80 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300 font-bold text-xs transition-colors flex items-center justify-between"
            >
              <span>Start AI Chat</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 5: FACULTY DIRECTORY & OFFICE HOURS */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-sm ${
              theme === "light"
                ? "bg-white border-slate-100"
                : "bg-[#0f1219] border-slate-800/80"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-2 border border-amber-100 dark:border-amber-900/40 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src="/box5_professor_whiteboard.png"
                    alt="Professor Graphic"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  BOX 5 • FACULTY
                </span>
              </div>

              <div>
                <h3 className="text-base font-black tracking-tight">
                  Faculty Directory & Office Hours
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                  Connect with department head and view faculty office hours.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-1 text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  Dr. K. S. Sharma (HOD CSE)
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Office Hours: 2:00 PM - 4:00 PM
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100/80 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300 font-bold text-xs transition-colors flex items-center justify-between">
              <span>View Directory</span>
              <Users className="w-4 h-4" />
            </button>
          </div>

          {/* CARD 6: CAMPUS BROADCASTS & NOTICES */}
          <div
            className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 transition-all shadow-sm ${
              theme === "light"
                ? "bg-white border-slate-100"
                : "bg-[#0f1219] border-slate-800/80"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-2 border border-rose-100 dark:border-rose-900/40 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src="/box6_mail_broadcast.png"
                    alt="Mail Broadcast Graphic"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider">
                  BOX 6 • NOTICES
                </span>
              </div>

              <div>
                <h3 className="text-base font-black tracking-tight">
                  Campus Broadcasts & Notices
                </h3>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">
                  Official LIET autonomous announcements & exam time table updates.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-1 text-xs">
                <div className="font-bold text-slate-950 dark:text-white">
                  📢 Semester 6 Registration Open
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Course registration closes on August 10, 2026.
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100/80 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 font-bold text-xs transition-colors flex items-center justify-between">
              <span>View All Notices</span>
              <Bell className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </main>
  );
};
