"use client";

import React, { useState } from "react";
import { X, Send, ShieldCheck, CheckCircle2, Clock, Mail } from "lucide-react";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: "dark" | "light";
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const [email, setEmail] = useState("legezt@gmail.com");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"request" | "verify" | "success">("request");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  if (!isOpen) return null;

  const handleRequestOtp = async () => {
    setLoading(true);
    setStatusMessage("");
    try {
      const res = await fetch("/api/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "MOHD JIBRAAN" }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("verify");
        setStatusMessage(`✅ OTP Code dispatched to ${email}! (Code for demo: ${data.data?.otpCode})`);
      } else {
        setStatusMessage(`❌ Error: ${data.message}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setStatusMessage("");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
        setStatusMessage("🎉 OTP Verified Successfully! Workspace Unlocked.");
      } else {
        setStatusMessage(`❌ ${data.message}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-up">
      <div
        className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 relative ${
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
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0 font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Gmail SMTP 6-Digit OTP Security</h3>
            <p className="text-xs opacity-70">Target Email: legezt@gmail.com</p>
          </div>
        </div>

        {step === "request" && (
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Student Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    theme === "light"
                      ? "bg-slate-50 border-slate-200 text-slate-900"
                      : "bg-slate-900 border-slate-800 text-white"
                  }`}
                />
              </div>
            </div>

            <button
              onClick={handleRequestOtp}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-lg"
            >
              {loading ? (
                <Clock className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send 6-Digit Code via Gmail SMTP</span>
                </>
              )}
            </button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Enter 6-Digit Security Code</label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className={`w-full text-center tracking-[8px] font-mono text-xl font-extrabold py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  theme === "light"
                    ? "bg-slate-50 border-slate-200 text-slate-900"
                    : "bg-slate-900 border-slate-800 text-white"
                }`}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center space-x-2"
            >
              {loading ? <Clock className="w-4 h-4 animate-spin" /> : <span>Verify & Access Workspace</span>}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-3 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h4 className="font-extrabold text-base text-emerald-400">AUTHENTICATION VERIFIED!</h4>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        )}

        {statusMessage && (
          <p className="text-xs font-semibold text-center text-emerald-400 pt-1">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};
