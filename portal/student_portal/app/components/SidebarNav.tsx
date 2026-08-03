"use client";

import React from "react";
import {
  Home,
  FileText,
  MessageSquare,
  Award,
  MapPin,
  User,
  Users,
  ShieldCheck,
  Shield,
  CheckCircle,
} from "lucide-react";

interface SidebarNavProps {
  theme: "dark" | "light";
  activeDocId: string;
  setActiveDocId: (id: string) => void;
  openGeofenceModal: () => void;
  openOtpModal: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  theme,
  activeDocId,
  setActiveDocId,
  openGeofenceModal,
  openOtpModal,
}) => {
  const navItems = [
    {
      id: "doc-1",
      label: "Home Dashboard",
      icon: Home,
      badge: "HOME",
      badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    },
    {
      id: "doc-2",
      label: "Tests & Live Exams",
      icon: FileText,
      badge: "LIVE",
      badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    },
    {
      id: "doc-3",
      label: "Student Profile & ID",
      icon: User,
    },
    {
      id: "doc-4",
      label: "PDF Marksheets & Reports",
      icon: Award,
    },
    {
      id: "doc-5",
      label: "Faculty Directory & Connect",
      icon: Users,
    },
    {
      id: "doc-6",
      label: "Messages & Broadcasts",
      icon: MessageSquare,
    },
    {
      id: "doc-7",
      label: "Environment Security Check",
      icon: MapPin,
    },
  ];

  return (
    <aside
      className={`w-64 sm:w-72 border-r flex flex-col h-[calc(100vh-4rem)] shrink-0 transition-colors select-none ${
        theme === "light"
          ? "bg-white border-slate-100 text-slate-800"
          : "bg-[#0f1219] border-slate-800/80 text-slate-200"
      }`}
    >
      {/* 1. Header Branding with Shield Logo */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          <Shield className="w-5 h-5 fill-white/20" />
        </div>
        <div className="overflow-hidden">
          <h2
            className={`text-sm font-black tracking-tight leading-snug truncate ${
              theme === "light" ? "text-slate-900" : "text-slate-100"
            }`}
          >
            Lords Institute
          </h2>
          <p className="text-[11px] font-bold text-slate-400 truncate">
            of Engineering & Technology
          </p>
        </div>
      </div>

      {/* 2. Sub-header Portal Label */}
      <div className="px-5 pt-4 pb-2">
        <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
          LIET INTRANET PORTAL
        </span>
        <div className="flex items-center space-x-1.5 mt-1 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>JIGK AUTONOMOUS</span>
        </div>
      </div>

      {/* 3. Navigation Links Grid matching screenshot */}
      <div className="p-3 space-y-1.5 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeDocId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveDocId(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? theme === "light"
                    ? "bg-blue-50/80 text-blue-600 border border-blue-100 shadow-sm"
                    : "bg-blue-950/60 text-blue-300 border border-blue-900/60"
                  : theme === "light"
                  ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              />
              <span className="flex-1 text-left truncate">{item.label}</span>
              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Bottom System Operational Card */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
        <div
          className={`p-3 rounded-2xl border flex items-center justify-between transition-colors ${
            theme === "light"
              ? "bg-slate-50/60 border-slate-100 text-slate-700"
              : "bg-slate-900/60 border-slate-800 text-slate-300"
          }`}
        >
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5 text-xs font-black">
              <span>System Status</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-[10px] font-bold text-slate-400">
              All Systems Operational
            </p>
          </div>
          <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
      </div>
    </aside>
  );
};
