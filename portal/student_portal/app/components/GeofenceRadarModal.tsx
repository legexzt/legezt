"use client";

import React, { useState } from "react";
import { X, MapPin, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";

interface GeofenceRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  userLat: number;
  userLon: number;
  geofenceVerified: boolean;
  setGeofenceVerified: (v: boolean) => void;
}

export const GeofenceRadarModal: React.FC<GeofenceRadarModalProps> = ({
  isOpen,
  onClose,
  theme,
  userLat,
  userLon,
  geofenceVerified,
  setGeofenceVerified,
}) => {
  const [testing, setTesting] = useState(false);
  const [distanceMeters, setDistanceMeters] = useState<number>(0);

  if (!isOpen) return null;

  const handleTestGeofence = async () => {
    setTesting(true);
    try {
      const res = await fetch("/api/geofence/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "legezt@gmail.com", userLat, userLon }),
      });
      const data = await res.json();
      if (data.success && data.data?.verified) {
        setGeofenceVerified(true);
        setDistanceMeters(data.data.distanceMeters);
      } else {
        setGeofenceVerified(false);
        setDistanceMeters(data.data?.distanceMeters || 999);
      }
    } catch (err) {
      console.error("Geofence test error:", err);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-up">
      <div
        className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-5 relative ${
          theme === "light"
            ? "bg-white border-slate-200 text-slate-900"
            : "bg-[#161922] border-[#293046] text-white"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">200m GPS Geofence Radar</h3>
            <p className="text-xs opacity-75">Target: LIET Campus (17.385044, 78.486671)</p>
          </div>
        </div>

        {/* Radar Graphic Simulation */}
        <div className="relative w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
          <div className="absolute w-36 h-36 rounded-full border border-emerald-500/30 animate-radar" />
          <div className="absolute w-24 h-24 rounded-full border border-emerald-500/50" />
          <div className="absolute w-12 h-12 rounded-full border border-emerald-500/80" />

          {/* Student GPS Dot */}
          <div className="relative z-10 text-center space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center font-black text-[9px] shadow-lg shadow-emerald-500/50">
              📍
            </div>
            <span className="text-[10px] font-mono font-extrabold text-emerald-400 block">
              {userLat.toFixed(6)}, {userLon.toFixed(6)}
            </span>
          </div>
        </div>

        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
            geofenceVerified
              ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
              : "bg-amber-950/60 border-amber-800 text-amber-300"
          }`}
        >
          <div className="flex items-center space-x-2">
            {geofenceVerified ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400" />
            )}
            <span>
              {geofenceVerified
                ? `Location Verified (${distanceMeters.toFixed(1)}m from Campus)`
                : "Geofence Verification Required"}
            </span>
          </div>
          <span className="font-extrabold uppercase text-[10px] px-2 py-0.5 rounded bg-black/40">
            {geofenceVerified ? "VERIFIED ✓" : "MAX 200m"}
          </span>
        </div>

        <button
          onClick={handleTestGeofence}
          disabled={testing}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-lg"
        >
          {testing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Re-ping GPS Coordinates & Verify Geofence</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
