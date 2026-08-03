"use client";

import React, { useState } from "react";
import {
  PanelLeft,
  PanelLeftClose,
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
} from "lucide-react";

interface TopNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  geofenceVerified: boolean;
  openGeofenceModal: () => void;
  openOtpModal: () => void;
  activeDocTitle: string;
  verifiedInstituteName?: string;
  openInstituteGate?: () => void;
  openProfileModal: () => void;
  currentAvatar?: string;
  studentName?: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  theme,
  toggleTheme,
  geofenceVerified,
  openGeofenceModal,
  openOtpModal,
  activeDocTitle,
  verifiedInstituteName = "Lords Institute of Engineering and Technology",
  openInstituteGate,
  openProfileModal,
  currentAvatar = "/student_3d_pointing.png",
  studentName = "Mohd Jibraan",
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className={`h-16 border-b flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 transition-colors ${
        theme === "light"
          ? "bg-white border-slate-100 text-slate-800"
          : "bg-[#0f1219] border-slate-800/80 text-slate-100"
      }`}
    >
      {/* Left Section: Sidebar Toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-xl transition-colors ${
            theme === "light"
              ? "hover:bg-slate-100 text-slate-600 border border-slate-200/80"
              : "hover:bg-slate-800 text-slate-300 border border-slate-800"
          }`}
          title="Toggle Sidebar"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Middle Section: Search Bar matching screenshot */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div
          className={`flex items-center px-4 py-2 rounded-full border transition-all ${
            theme === "light"
              ? "bg-slate-50 border-slate-200/80 text-slate-600 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
              : "bg-slate-900/80 border-slate-800 text-slate-300 focus-within:border-blue-500"
          }`}
        >
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent text-xs font-medium focus:outline-none placeholder-slate-400"
          />
          <kbd className="text-[10px] px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md font-mono shrink-0 ml-2">
            Ctrl + /
          </kbd>
        </div>
      </div>

      {/* Right Section: Theme Toggle, Notifications & Profile Avatar matching screenshot */}
      <div className="flex items-center space-x-3 shrink-0">
        {/* Sun/Moon Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full border transition-all ${
            theme === "light"
              ? "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100"
              : "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
          }`}
          title="Toggle Light/Dark Theme"
        >
          {theme === "light" ? (
            <Sun className="w-4 h-4 text-amber-500" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400" />
          )}
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-full border transition-colors ${
              theme === "light"
                ? "bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-white dark:border-slate-950">
              3
            </span>
          </button>

          {/* Notifications Dropdown Popup */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white border border-slate-100 p-4 shadow-2xl z-50 text-slate-900 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-bold text-xs text-slate-900">Campus Intranet Notices</h4>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Live Feed
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <div className="font-bold text-slate-900">📝 DSA Final Exam Scheduled</div>
                  <div className="text-slate-500 text-[11px]">Computer Science & Eng. • Today</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <div className="font-bold text-slate-900">📄 PDF Marksheet Dispatched</div>
                  <div className="text-slate-500 text-[11px]">Semester 5 Grade Card released.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Account Profile Pill matching screenshot */}
        <button
          onClick={openProfileModal}
          className={`flex items-center space-x-2.5 px-2.5 py-1.5 rounded-full border transition-all ${
            theme === "light"
              ? "bg-slate-50 border-slate-200/80 hover:bg-slate-100"
              : "bg-slate-900 border-slate-800 hover:bg-slate-800"
          }`}
          title="Profile & Account Settings"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 p-0.5 overflow-hidden shrink-0">
            <img
              src={currentAvatar}
              alt="User Avatar"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="text-left hidden md:block leading-tight">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {studentName}
            </div>
            <div className="text-[10px] font-medium text-slate-400">
              Student
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
};
