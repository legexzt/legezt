"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, ArrowRight, CheckCircle2, UserCheck, AlertCircle, Lock, ShieldCheck, KeyRound, RefreshCw, Eye, EyeOff } from "lucide-react";
import { StudentIdCardModal } from "./StudentIdCardModal";

declare global {
  interface Window {
    google: any;
  }
}

interface StudentAuthModalProps {
  instituteName: string;
  instituteCode: string;
  onAuthenticated: (studentData: any) => void;
  onBackToRoleSelect: () => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  instituteName,
  instituteCode,
  onAuthenticated,
  onBackToRoleSelect,
}) => {
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot_request" | "forgot_confirm">("login");

  // 100% BLANK INITIAL STATES (NO PRE-FILLED TEXT)
  const [regName, setRegName] = useState("");
  const [regRollNo, setRegRollNo] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regDept, setRegDept] = useState("CSE");
  const [regGender, setRegGender] = useState<"male" | "female">("male");
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [idCardStudentData, setIdCardStudentData] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  
  // OTP array state
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);

  // Login State
  const [loginEmailOrRoll, setLoginEmailOrRoll] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // 6-Digit OTP Activation State for Registration
  const [otpVerificationMode, setOtpVerificationMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [pendingStudent, setPendingStudent] = useState<any>(null);

  // Forgot Password Reset State
  const [resetEmailOrRoll, setResetEmailOrRoll] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Status & Error
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load Real Google Identity Services SDK using Client ID from tools_and_credentials
  useEffect(() => {
    const GOOGLE_CLIENT_ID = "64139291662-sedndc2fut96o9qka915540dkruker3u.apps.googleusercontent.com";

    const initGoogleOAuth = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleJwtResponse,
        });

        const container = document.getElementById("google-signin-container");
        if (container) {
          container.innerHTML = "";
          window.google.accounts.id.renderButton(container, {
            theme: "outline",
            size: "large",
            width: 320,
            text: "continue_with",
            shape: "pill",
          });
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogleOAuth();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGoogleOAuth;
      document.body.appendChild(script);
    }
  }, [authMode, otpVerificationMode]);

  // Auto-save Draft
  useEffect(() => {
    if (authMode !== "register" || otpVerificationMode) return;
    if (!regName && !regRollNo && !regEmail) return;

    const timeoutId = setTimeout(async () => {
      try {
        await fetch("/api/auth/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            draftId: "browser-draft-" + (regRollNo || "unknown"),
            name: regName,
            rollNo: regRollNo,
            email: regEmail,
            department: regDept,
          }),
        });
      } catch (e) {
        console.error("Failed to auto-save draft");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [regName, regRollNo, regEmail, regDept, authMode, otpVerificationMode]);

  // Real Google OAuth Credential Handler
  const handleGoogleJwtResponse = async (response: any) => {
    if (!response?.credential) return;
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const payload = JSON.parse(jsonPayload);

      // Authenticate real Google user with backend MongoDB database
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        setTimeout(() => {
          onAuthenticated(data.student);
        }, 1000);
      } else {
        setErrorMsg(data.message || "Google OAuth Verification Failed.");
      }
    } catch (err) {
      setErrorMsg("Error parsing Google OAuth token.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration Submit (Step 1: Check Domain & Passwords)
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regRollNo.trim() || !regEmail.trim() || !regPassword.trim() || !regConfirmPassword.trim()) {
      setErrorMsg("Please fill all required student registration details.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Passwords do not match. Please verify your password set twice.");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    // Email Domain Hint Validation
    if (instituteCode.toUpperCase() === "LIET" && !regEmail.toLowerCase().includes("@lords") && !regEmail.toLowerCase().includes("@liet") && !regEmail.toLowerCase().includes("@gmail.com")) {
      setErrorMsg("Please enter your official college email (e.g. @lords.ac.in or @liet.ac.in).");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName.trim(),
          rollNo: regRollNo.trim(),
          email: regEmail.trim(),
          department: regDept,
          password: regPassword.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPendingStudent(data.student);
        setOtpVerificationMode(true);
        setErrorMsg("");
        setSuccessMsg(data.message || `Account created! Enter 6-digit OTP code sent to ${regEmail} to activate permanent membership.`);
      } else {
        setErrorMsg(data.message || "Failed to register student account.");
      }
    } catch (err) {
      setErrorMsg("Network error during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle 6-Digit OTP Activation (Step 2: Permanent Membership)
  const handleOtpActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    const joinedOtpCode = otpArray.join("");
    if (!joinedOtpCode || joinedOtpCode.trim().length !== 6) {
      setErrorMsg("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingStudent?.email || regEmail,
          code: joinedOtpCode.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && (data.authenticated || data.success)) {
        setErrorMsg("");
        setSuccessMsg("Permanent Member Account Activated! Opening your Official ID Card...");
        
        const cardData = {
          name: pendingStudent?.name || regName || "STUDENT NAME",
          rollNo: pendingStudent?.rollNo || regRollNo || "2026-LIET-CS-042",
          email: pendingStudent?.email || regEmail,
          dept: regDept || "B.Tech Computer Science & Eng.",
          gender: regGender,
        };
        
        setIdCardStudentData(cardData);
        setShowIdCardModal(true);
      } else {
        setErrorMsg(data.message || "Invalid 6-digit OTP code. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error during OTP activation.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Login Submit (Real Database Authentication)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmailOrRoll.trim()) {
      setErrorMsg("Please enter your Roll Number or Registered Email ID.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrRoll: loginEmailOrRoll.trim(),
          password: loginPassword.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message || "Login authenticated successfully!");
        setTimeout(() => {
          onAuthenticated(data.student);
        }, 1200);
      } else {
        setErrorMsg(data.message || "Student credentials incorrect or account not found.");
      }
    } catch (err) {
      setErrorMsg("Network error during login.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Request Password Reset Token
  const handleRequestResetToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmailOrRoll.trim()) {
      setErrorMsg("Please enter your Roll Number or Email ID.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request",
          emailOrRoll: resetEmailOrRoll.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAuthMode("forgot_confirm");
        setSuccessMsg(data.message || "6-Digit Reset Token code sent to your email!");
      } else {
        setErrorMsg(data.message || "Failed to generate password reset token.");
      }
    } catch (err) {
      setErrorMsg("Network error during password reset request.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Confirm Password Reset with Token
  const handleConfirmPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetToken.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
      setErrorMsg("Please fill all required token and password fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMsg("New passwords do not match. Please verify.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm",
          emailOrRoll: resetEmailOrRoll.trim(),
          token: resetToken.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("Password reset successfully! Please login with your new password.");
        setTimeout(() => {
          setAuthMode("login");
        }, 1500);
      } else {
        setErrorMsg(data.message || "Invalid or expired reset token.");
      }
    } catch (err) {
      setErrorMsg("Network error during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 text-slate-900 font-sans selection:bg-slate-950 selection:text-white animate-fade-in overflow-y-auto">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar with Back Link & Logo */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 pt-2">
        <button
          onClick={onBackToRoleSelect}
          className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-all flex items-center gap-2"
        >
          ← Change Portal Role
        </button>
      </div>

      {/* Main Centered Auth Container */}
      <div className="w-full max-w-3xl my-auto py-6 space-y-8 z-10 text-center">
        
        {/* BIG OFFICIAL 3D METALLIC LORDS FULL BANNER LOGO IMAGE */}
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <div className="w-full max-w-2xl overflow-hidden transition-transform hover:scale-[1.01]">
            <img
              src="/lords_full_banner_logo.png"
              alt="Lords Institute Of Engineering & Technology Official 3D Metallic Logo"
              className="w-full h-auto object-contain max-h-[80px] sm:max-h-[100px] mx-auto"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Student Access & ID Authentication Gate
            </h2>
            <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
              Create your new student account or log in to access your autonomous intranet portal.
            </p>
          </div>
        </div>

        {/* Auth Mode Toggle Buttons */}
        {!otpVerificationMode && (
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner gap-1">
            <button
              onClick={() => {
                setAuthMode("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                authMode === "login" || authMode.startsWith("forgot")
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <User className="w-4 h-4" /> Login Existing ID
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                authMode === "register"
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <UserCheck className="w-4 h-4" /> Register New Student ID
            </button>
          </div>
        )}

        {/* REAL Google Identity Services OAuth Container */}
        {!otpVerificationMode && (
          <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-3">
            <div id="google-signin-container" className="flex justify-center min-h-[44px]"></div>
            <div className="relative w-full my-3 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <span className="relative bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">or enter details below</span>
            </div>
          </div>
        )}

        {/* Single Centered Auth Card Container */}
        <div className="w-full max-w-[580px] mx-auto bg-white border-2 border-slate-950 rounded-3xl p-6 sm:p-10 shadow-2xl text-left space-y-6 animate-scale-up">
          
          {/* STEP 2: 6-DIGIT OTP PERMANENT MEMBER ACTIVATION */}
          {otpVerificationMode ? (
            <form onSubmit={handleOtpActivation} className="space-y-6">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider">
                  Step 2 • Permanent Membership Activation
                </span>
                <h3 className="font-black text-2xl text-slate-950 tracking-tight">
                  Enter 6-Digit OTP Activation Code
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  A 6-digit activation code was sent via SMTP to <strong className="text-slate-950">{pendingStudent?.email || regEmail}</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  6-Digit Verification OTP
                </label>
                <div className="flex gap-2 justify-between">
                  {otpArray.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && i > 0) {
                          const prev = document.getElementById(`otp-input-${i - 1}`);
                          if (prev) prev.focus();
                        }
                      }}
                      className="w-12 h-14 sm:w-14 sm:h-16 bg-slate-50 border-2 border-slate-200 rounded-xl text-center text-slate-950 font-black text-2xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-base transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{loading ? "Activating Membership..." : "ACTIVATE PERMANENT STUDENT MEMBER RECORD"}</span>
              </button>
            </form>
          ) : authMode === "register" ? (
            /* REGISTER FORM (100% BLANK INITIAL FIELDS + PASSWORD TWICE) */
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-black text-xl text-slate-950 tracking-tight">
                  Create Your Official Student ID Record
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Enter details to generate your official LIET ID card.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Roll Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    College Roll Number (Unique ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={regRollNo}
                    onChange={(e) => setRegRollNo(e.target.value.toUpperCase())}
                    placeholder="e.g. 21LIETCS301"
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* College Email Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    College Email Address (@lords.ac.in / @liet.ac.in)
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="student@lords.ac.in"
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {/* Department Dropdown */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Department / Branch
                  </label>
                  <select
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="CSE">Computer Science & Engineering (CSE)</option>
                    <option value="ECE">Electronics & Comm. Engineering (ECE)</option>
                    <option value="EEE">Electrical & Electronics Eng. (EEE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="MECH">Mechanical Engineering (MECH)</option>
                    <option value="CIVIL">Civil Engineering (CIVIL)</option>
                  </select>
                </div>

                {/* Gender & Avatar Selector */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Gender & 3D Avatar
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRegGender("male")}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2.5 transition-all ${
                        regGender === "male"
                          ? "bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <img src="/avatar_male.png" className="w-7 h-7 object-cover object-top rounded-full border border-white" alt="Male" />
                      <span>Male Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegGender("female")}
                      className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2.5 transition-all ${
                        regGender === "female"
                          ? "bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <img src="/avatar_female.png" className="w-7 h-7 object-cover object-top rounded-full border border-white" alt="Female" />
                      <span>Female Student</span>
                    </button>
                  </div>
                </div>


                {/* Set Password 1 */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Set New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Set password (min 6 chars)"
                      className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password 2 */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Confirm Password (Set Twice)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all pr-12"
                    />
                  </div>
                </div>
              </div>

              {/* Simulated CAPTCHA */}
              <div className="border border-slate-200 rounded-xl p-3 sm:col-span-2 bg-slate-50 flex items-center justify-between w-full sm:w-64">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCaptchaLoading(true);
                      setTimeout(() => {
                        setIsCaptchaLoading(false);
                        setCaptchaVerified(true);
                      }, 1200);
                    }}
                    disabled={captchaVerified || isCaptchaLoading}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${captchaVerified ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300 hover:border-slate-400'}`}
                  >
                    {isCaptchaLoading && <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />}
                    {captchaVerified && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                  <span className="text-sm font-semibold text-slate-700">I'm not a robot</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/512px-RecaptchaLogo.svg.png" alt="reCAPTCHA" className="h-6 opacity-60" />
                  <span className="text-[7px] text-slate-400 font-medium">Privacy - Terms</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !captchaVerified}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-base transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Registering & Dispatching OTP..." : "SUBMIT & SEND 6-DIGIT VERIFICATION CODE"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : authMode === "login" ? (
            /* LOGIN FORM (REAL DATABASE AUTHENTICATION) */
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-black text-xl text-slate-950 tracking-tight">
                  Login to Registered Student Account
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Enter your unique Roll Number or Registered Email ID to authenticate.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Roll Number or Registered Email ID
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmailOrRoll}
                    onChange={(e) => setLoginEmailOrRoll(e.target.value)}
                    placeholder="e.g. 21LIETCS301 or student@lords.ac.in"
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("forgot_request");
                        setErrorMsg("");
                        setSuccessMsg("");
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl font-black text-base transition-all shadow-xl shadow-slate-950/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? "Authenticating Account..." : "AUTHENTICATE & ACCESS WORKSPACE"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          ) : authMode === "forgot_request" ? (
            /* FORGOT PASSWORD REQUEST TOKEN FORM */
            <form onSubmit={handleRequestResetToken} className="space-y-5">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider">
                  Password Recovery
                </span>
                <h3 className="font-black text-xl text-slate-950 tracking-tight">
                  Reset Password with Limited Token Link
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Enter your Roll Number or Email ID to receive a 6-digit password reset token code.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Roll Number or Registered Email ID
                </label>
                <input
                  type="text"
                  required
                  value={resetEmailOrRoll}
                  onChange={(e) => setResetEmailOrRoll(e.target.value)}
                  placeholder="e.g. 21LIETCS301 or student@lords.ac.in"
                  className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-base transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <KeyRound className="w-5 h-5" />
                <span>{loading ? "Generating Reset Token..." : "GENERATE & DISPATCH 6-DIGIT RESET TOKEN"}</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="w-full text-xs font-bold text-slate-500 hover:text-slate-950 text-center"
              >
                ← Back to Login
              </button>
            </form>
          ) : (
            /* FORGOT PASSWORD CONFIRM TOKEN & SET NEW PASSWORD FORM */
            <form onSubmit={handleConfirmPasswordReset} className="space-y-5">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider">
                  Token Verification
                </span>
                <h3 className="font-black text-xl text-slate-950 tracking-tight">
                  Enter Reset Token & Set New Password
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Enter the 6-digit token code sent to your email and set your new password.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    6-Digit Password Reset Token
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="e.g. 748392"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center text-slate-950 font-black text-xl tracking-[0.3em] focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password (min 6 chars)"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-950 font-bold text-sm focus:border-slate-950 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-base transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className="w-5 h-5" />
                <span>{loading ? "Updating Password..." : "UPDATE PASSWORD & RETURN TO LOGIN"}</span>
              </button>
            </form>
          )}

          {/* Feedback Banners */}
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

        </div>
      </div>

      {/* Interactive Official Digital ID Card Modal */}
      <StudentIdCardModal
        isOpen={showIdCardModal}
        onClose={() => {
          setShowIdCardModal(false);
          onAuthenticated(pendingStudent || idCardStudentData);
        }}
        initialData={idCardStudentData}
      />

      {/* Footer Info */}
      <div className="w-full text-center text-xs font-semibold text-slate-400 z-10 pt-4">
        Lords Institute of Engineering and Technology • Database & Authentication Services
      </div>
    </div>
  );
};
