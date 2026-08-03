"use client";

import React, { useState } from "react";
import { X, Download, Mail, CheckCircle2, User, RefreshCw, Sparkles, ShieldCheck, FileText, Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface StudentIdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name?: string;
    rollNo?: string;
    email?: string;
    dept?: string;
    gender?: "male" | "female";
  };
}

export const StudentIdCardModal: React.FC<StudentIdCardModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [studentName, setStudentName] = useState(initialData?.name || "MOHD JIBRAAN");
  const [rollNo, setRollNo] = useState(initialData?.rollNo || "2026-LIET-CS-042");
  const [email, setEmail] = useState(initialData?.email || "mdjibjibran@gmail.com");
  const [dept, setDept] = useState(initialData?.dept || "B.Tech Computer Science & Eng.");
  const [gender, setGender] = useState<"male" | "female">(initialData?.gender || "male");
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  // Selected Avatar Path
  const currentAvatar = customAvatarUrl
    ? customAvatarUrl
    : gender === "female"
    ? "/avatar_female.png"
    : "/avatar_male.png";

  // Handle Photo Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCustomAvatarUrl(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate Image Data URL from #preview-id-card
  const generateCardCanvas = async () => {
    const cardEl = document.getElementById("preview-id-card");
    if (!cardEl) throw new Error("ID Card element not found");
    return await html2canvas(cardEl, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    } as any);
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      setStatusMsg("Generating High-Resolution PDF...");
      const canvas = await generateCardCanvas();
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [85.6, 125], // CR80 standard badge size
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 85.6, 125);
      pdf.save(`Official_ID_Card_${rollNo || "Student"}.pdf`);
      setStatusMsg("✅ PDF ID Card Downloaded Successfully!");
    } catch (err: any) {
      setStatusMsg(`❌ PDF Generation Error: ${err?.message || err}`);
    } finally {
      setIsDownloading(false);
    }
  };

  // Download PNG
  const handleDownloadPNG = async () => {
    try {
      setIsDownloading(true);
      setStatusMsg("Rendering High-Resolution PNG...");
      const canvas = await generateCardCanvas();
      const link = document.createElement("a");
      link.download = `Official_ID_Card_${rollNo || "Student"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setStatusMsg("✅ PNG ID Card Saved Successfully!");
    } catch (err: any) {
      setStatusMsg(`❌ PNG Export Error: ${err?.message || err}`);
    } finally {
      setIsDownloading(false);
    }
  };

  // Send Email
  const handleSendEmail = async () => {
    try {
      setIsEmailing(true);
      setStatusMsg("Generating PDF & Dispatching Email...");
      const canvas = await generateCardCanvas();
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // Create PDF Data URI
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [85.6, 125],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, 85.6, 125);
      const pdfBase64 = pdf.output("datauristring");

      const res = await fetch("/api/auth/send-id-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: studentName,
          rollNo,
          pdfBase64,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg(`📧 ${data.message}`);
      } else {
        setStatusMsg(`❌ Email Error: ${data.message || "Failed to deliver email"}`);
      }
    } catch (err: any) {
      setStatusMsg(`❌ Email Dispatch Failed: ${err?.message || err}`);
    } finally {
      setIsEmailing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Official Digital Student ID Card
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Verified Active
                </span>
              </h2>
              <p className="text-xs text-slate-400">LORDS Institute of Engineering & Technology • Intranet Access</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Responsive Grid */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: ID Card Visual Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="text-center mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Live ID Card Render</span>
            </div>

            {/* Live Rendered Card Badge */}
            <div
              id="preview-id-card"
              className="relative w-[340px] sm:w-[360px] h-[520px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-gradient-to-b from-blue-900 via-slate-900 to-indigo-950 text-white flex flex-col justify-between p-5 select-none"
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header: Crest Logo & College Name */}
              <div className="relative z-10 text-center pb-3 border-b border-blue-400/30 flex flex-col items-center">
                <img
                  src="/lords_logo_official.png"
                  alt="LORDS Crest"
                  className="h-12 object-contain mb-1 drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <h3 className="text-sm font-black tracking-wider text-blue-200 uppercase">
                  LORDS INSTITUTE OF ENG & TECH
                </h3>
                <p className="text-[10px] text-slate-300 tracking-wider">
                  AUTONOMOUS • AFFILIATED TO JNTUH • HYDERABAD
                </p>
              </div>

              {/* Middle Section: Photo & Details */}
              <div className="relative z-10 flex flex-col items-center my-auto py-2">
                {/* Avatar Badge Container */}
                <div className="relative group mb-3">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-400/60 shadow-xl bg-slate-800 flex items-center justify-center">
                    <img
                      src={currentAvatar}
                      alt={studentName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-[10px] font-bold text-white shadow">
                    STUDENT
                  </div>
                </div>

                {/* Name */}
                <h4 className="text-lg font-black text-white uppercase tracking-wide text-center px-2">
                  {studentName || "STUDENT NAME"}
                </h4>
                <p className="text-xs font-semibold text-blue-300 mb-2">{rollNo || "ROLL NO"}</p>

                {/* Department & Details Box */}
                <div className="w-full bg-slate-950/60 border border-blue-500/20 rounded-xl p-3 text-center space-y-1 backdrop-blur-sm">
                  <p className="text-xs font-bold text-amber-300 uppercase">{dept}</p>
                  <p className="text-[11px] text-slate-300">
                    <span className="text-slate-400">Gender:</span> {gender.toUpperCase()}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate px-2">{email}</p>
                </div>
              </div>

              {/* Bottom Footer: Barcode & Security Badge */}
              <div className="relative z-10 pt-2 border-t border-blue-400/30 flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider">VALIDITY</p>
                  <p className="text-xs font-bold text-emerald-400">2024 - 2028 ACADEMIC</p>
                </div>

                {/* Simulated Barcode */}
                <div className="flex flex-col items-end">
                  <div className="h-6 w-24 bg-white/90 p-0.5 flex items-center justify-between rounded">
                    <div className="w-1 h-full bg-black" />
                    <div className="w-0.5 h-full bg-black" />
                    <div className="w-1.5 h-full bg-black" />
                    <div className="w-0.5 h-full bg-black" />
                    <div className="w-1 h-full bg-black" />
                    <div className="w-2 h-full bg-black" />
                    <div className="w-0.5 h-full bg-black" />
                    <div className="w-1 h-full bg-black" />
                  </div>
                  <span className="text-[8px] text-slate-400 font-mono mt-0.5">200M GEOFENCE VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Downloads */}
          <div className="lg:col-span-5 space-y-5">
            {/* Status Alert Banner */}
            {statusMsg && (
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            {/* Customization Card */}
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  Customize ID Card Details
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  {isEditing ? "Done Editing" : "Edit Fields"}
                </button>
              </div>

              {/* Gender & Photo Switcher */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Select Student Avatar Photo</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setGender("male");
                      setCustomAvatarUrl(null);
                    }}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      gender === "male" && !customAvatarUrl
                        ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <img src="/avatar_male.png" className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs">Male Avatar</span>
                  </button>

                  <button
                    onClick={() => {
                      setGender("female");
                      setCustomAvatarUrl(null);
                    }}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      gender === "female" && !customAvatarUrl
                        ? "bg-pink-600/20 border-pink-500 text-pink-300 font-bold"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <img src="/avatar_female.png" className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs">Female Avatar</span>
                  </button>
                </div>

                {/* Upload Custom Photo Option */}
                <div className="mt-2">
                  <label className="cursor-pointer text-[11px] text-slate-400 hover:text-blue-400 flex items-center gap-1.5 font-medium">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Upload Custom Photo...</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              {/* Editable Name & Roll No */}
              {isEditing ? (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Student Full Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Roll Number</label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 font-medium block mb-1">Branch / Department</label>
                    <input
                      type="text"
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/60 rounded-xl p-3 text-xs space-y-1 border border-slate-800 text-slate-300">
                  <p><span className="text-slate-400">Name:</span> <strong>{studentName}</strong></p>
                  <p><span className="text-slate-400">Roll No:</span> <strong>{rollNo}</strong></p>
                  <p><span className="text-slate-400">Department:</span> <strong>{dept}</strong></p>
                  <p className="truncate"><span className="text-slate-400">Email:</span> <strong>{email}</strong></p>
                </div>
              )}
            </div>

            {/* Action Buttons: Downloads & Email */}
            <div className="space-y-2.5">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                <span>{isDownloading ? "Generating PDF..." : "Download Official PDF ID Card"}</span>
              </button>

              <button
                onClick={handleDownloadPNG}
                disabled={isDownloading}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Save ID Card Image (PNG)</span>
              </button>

              <button
                onClick={handleSendEmail}
                disabled={isEmailing}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{isEmailing ? "Sending Email..." : `Dispatch PDF to Email (${email.split('@')[0]}...)`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
