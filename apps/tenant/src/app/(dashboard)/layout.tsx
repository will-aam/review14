"use client";

import * as React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [desktopSidebarOpen, setDesktopSidebarOpen] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setDesktopSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-[#0B1220] overflow-hidden text-[12px] leading-4 antialiased transition-colors duration-200">
      {/* Desktop Sidebar (Collapsible smoothly) */}
      <div
        className={`hidden md:flex shrink-0 h-full transition-all duration-300 ease-in-out ${
          desktopSidebarOpen ? "w-[260px] opacity-100" : "w-0 opacity-0 overflow-hidden"
        }`}
      >
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1220] transition-colors duration-200">
        <Header
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={!desktopSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
