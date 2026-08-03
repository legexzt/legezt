"use client";

import React, { useState, useEffect } from "react";
import { TopNavbar } from "./components/TopNavbar";
import { SidebarNav } from "./components/SidebarNav";
import { WorkspaceCanvas } from "./components/WorkspaceCanvas";
import { OtpVerificationModal } from "./components/OtpVerificationModal";
import { GeofenceRadarModal } from "./components/GeofenceRadarModal";
import { InstituteGateModal } from "./components/InstituteGateModal";
import { RoleSelectionModal } from "./components/RoleSelectionModal";
import { StudentAuthModal } from "./components/StudentAuthModal";
import { ManageProfileModal } from "./components/ManageProfileModal";
import { StudentIdCardModal } from "./components/StudentIdCardModal";

export default function StudentPortalHomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDocId, setActiveDocId] = useState("doc-1");

  // Institute Verification Gate State
  const [isInstituteVerified, setIsInstituteVerified] = useState(false);
  const [verifiedInstituteName, setVerifiedInstituteName] = useState("Lords Institute of Engineering and Technology");
  const [verifiedInstituteCode, setVerifiedInstituteCode] = useState("LIET");
  const [showInstituteGateModal, setShowInstituteGateModal] = useState(true);

  // Role Selection & Auth Gate State
  const [selectedRole, setSelectedRole] = useState<"student" | "faculty" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);

  // Profile Avatar & Manage Profile Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isIdCardModalOpen, setIsIdCardModalOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState("/student_3d_pointing.png");

  // Geofence & OTP Modals
  const [geofenceVerified, setGeofenceVerified] = useState(true);
  const [isGeofenceModalOpen, setIsGeofenceModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // Student GPS Location State (LIET Campus coordinates: 17.385044, 78.486671)
  const [userLat, setUserLat] = useState(17.385044);
  const [userLon, setUserLon] = useState(78.486671);

  // Check saved institute verification & auth state from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("legezt_student_theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    const savedInst = localStorage.getItem("legezt_verified_institute");
    if (savedInst) {
      try {
        const parsed = JSON.parse(savedInst);
        setVerifiedInstituteName(parsed.name || "Lords Institute of Engineering and Technology");
        setVerifiedInstituteCode(parsed.code || "LIET");
        setIsInstituteVerified(true);
        setShowInstituteGateModal(false);
      } catch (err) {
        setIsInstituteVerified(false);
        setShowInstituteGateModal(true);
      }
    } else {
      setIsInstituteVerified(false);
      setShowInstituteGateModal(true);
    }

    const savedRole = localStorage.getItem("legezt_user_role");
    if (savedRole === "student" || savedRole === "faculty") {
      setSelectedRole(savedRole);
    }

    const savedAuth = localStorage.getItem("legezt_authenticated_student");
    if (savedAuth) {
      try {
        setCurrentStudent(JSON.parse(savedAuth));
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleInstituteVerified = (instName: string, code: string) => {
    setVerifiedInstituteName(instName);
    setVerifiedInstituteCode(code);
    setIsInstituteVerified(true);
    setShowInstituteGateModal(false);
  };

  const handleRoleSelected = (role: "student" | "faculty") => {
    setSelectedRole(role);
    localStorage.setItem("legezt_user_role", role);
  };

  const handleStudentAuthenticated = (studentData: any) => {
    setCurrentStudent(studentData);
    setIsAuthenticated(true);
    localStorage.setItem("legezt_authenticated_student", JSON.stringify(studentData));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("legezt_student_theme", nextTheme);
  };

  const getDocTitle = () => {
    switch (activeDocId) {
      case "doc-2":
        return "Tests & Live Exam Studio";
      case "doc-3":
        return "Student Profile & Identity Record";
      case "doc-4":
        return "PDF Marksheets & Grade Reports";
      case "doc-5":
        return "Faculty Directory & Connect";
      case "doc-6":
        return "Campus Messages & Announcements";
      case "doc-7":
        return "Environment & GPS Security Check";
      default:
        return "Student Home Dashboard";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        theme === "light"
          ? "bg-[#f8f9fa] text-slate-900"
          : "bg-[#0d0f14] text-slate-100"
      }`}
    >
      {/* 0. Step 1: Institute Verification Gate (Blank White Screen for Entry) */}
      {(!isInstituteVerified || showInstituteGateModal) && (
        <InstituteGateModal onInstituteVerified={handleInstituteVerified} />
      )}

      {/* 1. Step 2: 2 Square Role Selection Options (Student vs Faculty) */}
      {isInstituteVerified && !showInstituteGateModal && !selectedRole && (
        <RoleSelectionModal
          instituteName={verifiedInstituteName}
          instituteCode={verifiedInstituteCode}
          onSelectRole={handleRoleSelected}
          onBackToInstituteGate={() => setShowInstituteGateModal(true)}
        />
      )}

      {/* 2. Step 3: Registration & Login Authentication Gate (Big LORDS 3D Metallic Banner Logo) */}
      {isInstituteVerified && !showInstituteGateModal && selectedRole === "student" && !isAuthenticated && (
        <StudentAuthModal
          instituteName={verifiedInstituteName}
          instituteCode={verifiedInstituteCode}
          onAuthenticated={handleStudentAuthenticated}
          onBackToRoleSelect={() => setSelectedRole(null)}
        />
      )}

      {/* 3. Main Workspace Layout Container (Rendered upon complete Authentication) */}
      {isAuthenticated && (
        <>
          {/* Top Global Navigation Bar */}
          <TopNavbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            theme={theme}
            toggleTheme={toggleTheme}
            geofenceVerified={geofenceVerified}
            openGeofenceModal={() => setIsGeofenceModalOpen(true)}
            openOtpModal={() => setIsOtpModalOpen(true)}
            activeDocTitle={getDocTitle()}
            verifiedInstituteName={verifiedInstituteName}
            openInstituteGate={() => setShowInstituteGateModal(true)}
            openProfileModal={() => setIsProfileModalOpen(true)}
            currentAvatar={currentAvatar}
          />

          {/* Main Workspace Layout Container (Sidebar + Canvas) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Collapsible Left Sidebar Navigation */}
            {sidebarOpen && (
              <SidebarNav
                theme={theme}
                activeDocId={activeDocId}
                setActiveDocId={setActiveDocId}
                openGeofenceModal={() => setIsGeofenceModalOpen(true)}
                openOtpModal={() => setIsOtpModalOpen(true)}
              />
            )}

            {/* Notion Workspace Main Canvas */}
            <WorkspaceCanvas
              theme={theme}
              activeDocId={activeDocId}
              geofenceVerified={geofenceVerified}
              userLat={userLat}
              userLon={userLon}
              openGeofenceModal={() => setIsGeofenceModalOpen(true)}
              openOtpModal={() => setIsOtpModalOpen(true)}
            />
          </div>
        </>
      )}

      {/* 4. Interactive Security & Profile Modals */}
      <ManageProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        student={currentStudent}
        theme={theme}
        toggleTheme={toggleTheme}
        currentAvatar={currentAvatar}
        onSelectAvatar={(url) => setCurrentAvatar(url)}
        onOpenIdCardModal={() => setIsIdCardModalOpen(true)}
      />

      <StudentIdCardModal
        isOpen={isIdCardModalOpen}
        onClose={() => setIsIdCardModalOpen(false)}
        initialData={currentStudent}
      />

      <OtpVerificationModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        theme={theme}
      />

      <GeofenceRadarModal
        isOpen={isGeofenceModalOpen}
        onClose={() => setIsGeofenceModalOpen(false)}
        theme={theme}
        userLat={userLat}
        userLon={userLon}
        geofenceVerified={geofenceVerified}
        setGeofenceVerified={setGeofenceVerified}
      />
    </div>
  );
}
