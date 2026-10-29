"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export function Header({
  onToggleSidebar,
  isSidebarCollapsed = false,
  searchValue = "",
  onSearchChange,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const isDark = theme === "dark";

  return (
    <header
      className="sticky top-0 z-30 flex h-[70px] w-full shrink-0 select-none items-center justify-between border-b border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] px-6 md:px-8 transition-colors duration-200"
    >
      {/* Left: Sidebar Toggle Button + Search Input */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#1F2937] transition-colors"
            title={isSidebarCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        <div
          className="flex h-10 w-[240px] sm:w-[340px] shrink-0 items-center gap-2.5 rounded-lg border border-[#CBD5E1] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937]/70 px-3 transition-colors focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <circle cx="11" cy="11" r="8" fill="none" stroke={isDark ? "#94A3B8" : "#64748B"} strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={isDark ? "#94A3B8" : "#64748B"} strokeWidth="2" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por cliente, mesa ou palavra..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full border-none bg-transparent text-[13px] leading-4 text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#64748B] dark:placeholder-[#94A3B8] outline-none"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Public Page Button */}
        <Link
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-[#DBEAFE] dark:border-blue-900/60 bg-[#EFF6FF] dark:bg-blue-950/40 px-3 py-1.5 hover:bg-blue-100/70 dark:hover:bg-blue-900/60 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke={isDark ? "#60A5FA" : "#2563EB"} strokeWidth="2" />
            <polyline points="15 3 21 3 21 9" fill="none" stroke={isDark ? "#60A5FA" : "#2563EB"} strokeWidth="2" />
            <line x1="10" y1="14" x2="21" y2="3" stroke={isDark ? "#60A5FA" : "#2563EB"} strokeWidth="2" />
          </svg>
          <span className="hidden sm:inline-block text-[13px] font-semibold leading-4 text-[#2563EB] dark:text-blue-400">
            Ver Página Pública
          </span>
        </Link>

        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1F2937] hover:bg-slate-50 dark:hover:bg-[#283548] transition-colors cursor-pointer"
            title="Notificações"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke={isDark ? "#CBD5E1" : "#475569"} strokeWidth="2" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke={isDark ? "#CBD5E1" : "#475569"} strokeWidth="2" />
            </svg>
            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#2563EB] ring-2 ring-white dark:ring-[#1F2937]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1F2937] p-3 shadow-xl z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#334155] font-semibold text-slate-800 dark:text-slate-100">
                <span>Notificações Recentes</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold">1 nova</span>
              </div>
              <div className="py-2 space-y-2">
                <div className="p-2 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                  <div className="font-medium text-slate-900 dark:text-slate-100">Nova avaliação 5★ recebida</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Mariana Santos avaliou a Mesa 14 há 15 min.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Light / Dark) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-1.5 rounded-[20px] bg-[#F1F5F9] dark:bg-[#1F2937] p-[3px] border border-transparent dark:border-[#334155] cursor-pointer transition-colors"
          title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
          {/* Sun Icon (Light) */}
          <div
            className={`flex items-center justify-center p-1 rounded-full transition-all duration-200 ${
              !isDark
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          {/* Moon Icon (Dark) */}
          <div
            className={`flex items-center justify-center p-1 rounded-full transition-all duration-200 ${
              isDark
                ? "bg-[#111827] text-blue-400 shadow-xs"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
}
