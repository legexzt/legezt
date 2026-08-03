"use client";

import React from "react";
import { GraduationCap, Users, ArrowRight, Database, Building2 } from "lucide-react";

interface RoleSelectionModalProps {
  instituteName: string;
  instituteCode: string;
  onSelectRole: (role: "student" | "faculty") => void;
  onBackToInstituteGate: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  instituteName,
  instituteCode,
  onSelectRole,
  onBackToInstituteGate,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 text-slate-900 font-sans selection:bg-slate-950 selection:text-white animate-fade-in overflow-y-auto">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="w-full max-w-6xl flex items-center justify-between z-10 pt-2">
        <button
          onClick={onBackToInstituteGate}
          className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-all flex items-center gap-2"
        >
          ← Change Institute
        </button>

        {/* TOP MAIN LEGEZT BRAND LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/legezt_main_logo.png"
            alt="LeGeZt Main Logo"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-md"
          />
        </div>

      </div>

      {/* Main Centered Content */}
      <div className="w-full max-w-5xl my-auto py-8 text-center space-y-10 z-10">
        
        {/* Banner Title Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-base sm:text-lg lg:text-xl font-black uppercase tracking-wider shadow-sm">
            <img src="/lords_logo_official.png" alt="Institute Logo" className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-sm" />
            <span>{instituteName}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            Select Your Portal Access Role
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto font-medium leading-relaxed">
            Choose whether you are entering as a registered Student or Faculty member.
          </p>
        </div>

        {/* 2 LARGE SQUARE ROLE SELECTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          {/* SQUARE OPTION 1: STUDENT PORTAL (Large pop-out whiteboard graphic) */}
          <div
            onClick={() => onSelectRole("student")}
            className="group relative bg-white border-2 border-slate-200 hover:border-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left cursor-pointer overflow-visible transform hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <GraduationCap className="w-32 h-32 text-slate-950" />
            </div>

            <div className="space-y-6 relative z-10">
              {/* 3D Student Classroom Whiteboard Graphic (Large Frame Breakout) */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-slate-100 border-2 border-slate-200 shadow-lg group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors flex items-center justify-center">
                <img
                  src="/faculty_classroom_whiteboard.png"
                  alt="Student Classroom Graphic"
                  className="w-[125%] h-[125%] max-w-none object-contain transform -translate-y-3 scale-110 group-hover:scale-125 transition-transform duration-300 drop-shadow-xl"
                />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider">
                  Option 1 • Student Account
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Student Portal
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                  Access course workspaces, live MCQ exams, automated PDF marksheet dispatches, and advisor messaging.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between font-extrabold text-sm text-slate-950 group-hover:text-emerald-600 transition-colors relative z-10">
              <span>Enter Student Access Gate</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* SQUARE OPTION 2: FACULTY PORTAL (Cropped Geofence Radar 3D Graphic) */}
          <div
            onClick={() => onSelectRole("faculty")}
            className="group relative bg-white border-2 border-slate-200 hover:border-slate-950 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Users className="w-32 h-32 text-slate-950" />
            </div>

            <div className="space-y-6 relative z-10">
              {/* 3D Faculty Graphic (Clean light container matching student card) */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-slate-100 border-2 border-slate-200 shadow-lg group-hover:bg-emerald-50 group-hover:border-emerald-300 transition-colors flex items-center justify-center">
                <img
                  src="/geofence_gps_radar.png"
                  alt="Faculty Geofence Radar Graphic"
                  className="w-[125%] h-[125%] max-w-none object-contain transform -translate-y-3 scale-110 group-hover:scale-125 transition-transform duration-300 drop-shadow-xl"
                />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider">
                  Option 2 • Faculty & Dean
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Faculty Studio
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                  Faculty exam controller studio, proctoring log monitors, student gradebook management, and course dispatch.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between font-extrabold text-sm text-slate-950 group-hover:text-emerald-600 transition-colors relative z-10">
              <span>Enter Faculty Access Gate</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>

      {/* Footer Info */}
      <div className="w-full text-center text-xs font-semibold text-slate-400 z-10 pt-4">
        LeGeZt Autonomous Intranet • Role Access Gatekeeper
      </div>
    </div>
  );
};
