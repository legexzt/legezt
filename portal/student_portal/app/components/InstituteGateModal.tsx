"use client";

import React, { useState, useEffect, useRef } from "react";
import { Building2, Search, AlertCircle, ArrowRight, Database, ShieldCheck, Sparkles, Loader2 } from "lucide-react";

interface InstituteGateModalProps {
  onInstituteVerified: (instituteName: string, code: string) => void;
}

export const InstituteGateModal: React.FC<InstituteGateModalProps> = ({ onInstituteVerified }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [predictedInstitutes, setPredictedInstitutes] = useState<any[]>([]);
  const [verifiedData, setVerifiedData] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger search whenever query changes and length >= 3
  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    if (query.trim().length < 3) {
      setPredictedInstitutes([]);
      setIsDropdownOpen(false);
      setErrorMsg("");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    searchDebounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/institute/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query.trim() }),
        });

        const data = await res.json();
        if (res.ok && data.success && data.institute) {
          setPredictedInstitutes([data.institute]);
          setIsDropdownOpen(true);
        } else {
          setPredictedInstitutes([]);
          setIsDropdownOpen(false);
          setErrorMsg("No matching institution found in database. Try typing 'Lords' or 'LIET'.");
        }
      } catch (err) {
        setErrorMsg("Database search error. Please check connection.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [query]);

  const handleSelectInstitute = (inst: any) => {
    setVerifiedData(inst);
    setQuery(inst.name);
    setIsDropdownOpen(false);
    setErrorMsg("");
    localStorage.setItem("legezt_verified_institute", JSON.stringify(inst));
    onInstituteVerified(inst.name, inst.code);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 text-slate-900 font-sans selection:bg-slate-950 selection:text-white animate-fade-in overflow-y-auto overflow-x-hidden">
      {/* Subtle Background Radial Glow for Visual Depth */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Top Branding Navigation Header */}
      <div className="w-full max-w-[1500px] flex items-center justify-between z-10 pt-2 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-slate-950/20">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-950 flex items-center gap-1.5">
              LeGeZt <span className="text-emerald-600 font-bold">Intranet</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Institutional Access Portal
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Responsive Split Container (Desktop: Grand Large Character | Mobile: Stacked) */}
      <div className="w-full max-w-[1500px] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-12 relative z-10 my-auto py-4">
        
        {/* Left Column: Title, Subtitle, Search Input & Auto-Predict Card */}
        <div className="flex-1 w-full max-w-xl xl:max-w-2xl space-y-8 text-center lg:text-left z-20">
          
          {/* Heading Section */}
          <div className="space-y-3">
            <div className="inline-flex p-4 rounded-3xl bg-slate-100 border border-slate-200/80 text-slate-950 shadow-inner mb-1">
              <Building2 className="w-10 h-10 text-slate-950" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-950 tracking-tight leading-[1.1]">
              Institute Verification Gate
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Type your college name below to search and connect to your database workspace.
            </p>
          </div>

          {/* Search Box with Live 3-Character Auto-Predict */}
          <div className="relative text-left space-y-2">
            <div className="relative shadow-2xl shadow-slate-200/90 rounded-3xl transition-all border-2 border-slate-200 focus-within:border-slate-950 bg-slate-50 focus-within:bg-white">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your institute (e.g. Lords Institute or LIET)..."
                className="w-full pl-16 sm:pl-18 pr-14 py-5 sm:py-6 rounded-3xl bg-transparent text-slate-950 placeholder:text-slate-400 font-bold text-lg sm:text-xl focus:outline-none"
              />
              {loading && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-6 h-6 text-slate-950 animate-spin" />
                </div>
              )}
            </div>

            {/* Helper Text below input */}
            <div className="px-3 text-xs sm:text-sm font-semibold text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>Type at least 3 characters to auto-predict from database</span>
              {query.length >= 3 && (
                <span className="text-emerald-600 font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Database Auto-Predict Active
                </span>
              )}
            </div>

            {/* Live Auto-Predict Dropdown Card (Exact Mockup Match with 3D Lords Crest Logo) */}
            {isDropdownOpen && predictedInstitutes.length > 0 && (
              <div className="relative sm:absolute sm:top-full sm:left-0 sm:right-0 mt-3 bg-white border-2 border-slate-950 rounded-3xl p-4 sm:p-5 shadow-2xl z-30 animate-scale-up space-y-3">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 px-1">
                  DATABASE MATCH FOUND:
                </div>
                {predictedInstitutes.map((inst) => (
                  <div
                    key={inst.id}
                    onClick={() => handleSelectInstitute(inst)}
                    className="w-full p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-slate-950 hover:text-white text-slate-950 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer border border-slate-200/80 group"
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      {/* Official 3D Metallic Lords Crest Logo Image */}
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 p-1 border-2 border-slate-300 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={inst.logoUrl || "/lords_crest_logo.png"}
                          alt={inst.name}
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-base sm:text-xl tracking-tight leading-snug">
                          {inst.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 group-hover:text-slate-300">
                          Code: <span className="font-bold">{inst.code}</span> • {inst.city}, {inst.state}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectInstitute(inst);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shrink-0 transition-colors text-center shadow-md shadow-emerald-600/20"
                    >
                      Select ✓
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMsg && !isDropdownOpen && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold flex items-center gap-2.5 text-left">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}


        </div>

        {/* Right Column: LARGE & GRAND 3D Pointing Student Assistant Graphic */}
        <div className="w-full lg:w-[50%] flex justify-center lg:justify-end shrink-0 order-first lg:order-last z-10">
          <div className="relative group w-full flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-blue-100/60 rounded-full blur-3xl scale-100 group-hover:scale-110 transition-transform" />
            <img
              src="/student_3d_pointing.png"
              alt="LeGeZt 3D Student Assistant"
              className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[680px] xl:max-w-[780px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 lg:scale-110 xl:scale-125 lg:-translate-x-4"
            />
          </div>
        </div>

      </div>

      {/* 3. Footer Copyright Info */}
      <div className="w-full text-center text-[11px] sm:text-xs font-semibold text-slate-400 z-10 pt-4 pb-2">
        LeGeZt Intranet System • MongoDB & JSON Database Gate
      </div>
    </div>
  );
};
