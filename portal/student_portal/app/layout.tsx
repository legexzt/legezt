import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeGeZt Student Workspace | Notion-Style Intranet Portal",
  description: "Autonomous 200m GPS Geofenced Student Workspace and Exam Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
