"use client";

import React, { useState } from "react";
import { X, Check, Sun, Moon, ShieldCheck, User, Sparkles, Building2, BookOpen, GraduationCap } from "lucide-react";

interface ManageProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
  theme: "dark" | "light";
  toggleTheme: () => void;
  currentAvatar: string;
  onSelectAvatar: (avatarUrl: string) => void;
  onOpenIdCardModal?: () => void;
}

const AVATAR_OPTIONS = [
  { id: "avatar-1", url: "/student_3d_pointing.png", label: "Student Assistant" },
  { id: "avatar-2", url: "/faculty_classroom_whiteboard.png", label: "Classroom Scholar" },
  { id: "avatar-3", url: "/lords_crest_logo.png", label: "Lords Metallic Crest" },
  { id: "avatar-4", url: "/geofence_gps_radar.png", label: "Radar Pioneer" },
];

export const ManageProfileModal: React.FC<ManageProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  theme,
  toggleTheme,
  currentAvatar,
  onSelectAvatar,
  onOpenIdCardModal,
}) => {
  if (!isOpen) return null;

  const studentName = student?.name || "Mohd Jibraan";
  const studentRollNo = student?.rollNo || "21LIETCS301";
  const studentEmail = student?.email || "student@lords.ac.in";
  const studentDept = student?.department || "CSE";

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-sans">
      <div className="bg-white border-2 border-slate-950 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-scale-up text-slate-900">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xl flex items-center justify-center">
              P
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Manage Student Profile</h2>
              <p className="text-xs text-slate-400 font-medium">Customize avatar badges & workspace theme</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Profile Overview Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 p-1 border-2 border-slate-950 overflow-hidden shrink-0 shadow-md">
              <img
                src={currentAvatar}
                alt="Selected Profile Avatar"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-slate-950">{studentName}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-black uppercase">
                  Permanent Member ✓
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500">
                Roll No: <span className="text-slate-950 font-extrabold">{studentRollNo}</span> • Dept: <span className="text-slate-950 font-extrabold">{studentDept}</span>
              </p>
              <p className="text-xs text-slate-400 font-medium">{studentEmail}</p>
            </div>
          </div>

          {/* Avatar Icon Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Select 3D Profile Avatar Badge
            </label>
            <div className="grid grid-cols-4 gap-3">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onSelectAvatar(opt.url)}
                  className={`relative p-2 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                    currentAvatar === opt.url
                      ? "bg-blue-50 border-slate-950 shadow-md scale-105"
                      : "bg-slate-50 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 p-1 flex items-center justify-center overflow-hidden">
                    <img src={opt.url} alt={opt.label} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-700 text-center leading-tight">
                    {opt.label}
                  </span>
                  {currentAvatar === opt.url && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Background Wall Theme Switcher */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Workspace Architectural Wall Theme
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* White Matte Wall Option */}
              <button
                onClick={() => theme !== "light" && toggleTheme()}
                className={`p-4 rounded-2xl border-2 text-left transition-all space-y-2 relative overflow-hidden ${
                  theme === "light"
                    ? "border-slate-950 bg-slate-100 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-950 font-black text-xs">
                    <Sun className="w-4 h-4 text-amber-500" /> White Matte Wall
                  </div>
                  {theme === "light" && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  High-definition white plaster wall texture theme.
                </p>
              </button>

              {/* Black Matte Wall Option */}
              <button
                onClick={() => theme !== "dark" && toggleTheme()}
                className={`p-4 rounded-2xl border-2 text-left transition-all space-y-2 relative overflow-hidden ${
                  theme === "dark"
                    ? "border-slate-950 bg-slate-900 text-white shadow-md"
                    : "border-slate-200 bg-slate-50 hover:border-slate-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs">
                    <Moon className="w-4 h-4 text-blue-400" /> Black Matte Wall
                  </div>
                  {theme === "dark" && <Check className="w-4 h-4 text-emerald-400 font-bold" />}
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  High-definition dark slate charcoal wall texture theme.
                </p>
              </button>
            </div>
          </div>

          {/* Digital ID Card Preview Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenIdCardModal && onOpenIdCardModal();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Preview & Export Official Digital ID Card</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs transition-all shadow-md"
          >
            SAVE & CLOSE PREFERENCES
          </button>
        </div>

      </div>
    </div>
  );
};
