"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const navItems = [
    {
      label: "Visão Geral",
      href: "/",
      exact: true,
      icon: (active: boolean) => (
        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <rect x="3" y="3" width="7" height="9" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <rect x="14" y="3" width="7" height="5" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <rect x="14" y="12" width="7" height="9" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <rect x="3" y="16" width="7" height="5" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: "Avaliações",
      href: "/#avaliacoes",
      badge: "12 novas",
      icon: (active: boolean) => (
        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: "QR Codes & Links",
      href: "/qrcode",
      icon: (active: boolean) => (
        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <rect x="3" y="3" width="7" height="7" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <rect x="14" y="3" width="7" height="7" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <rect x="3" y="14" width="7" height="7" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: "Relatórios & NPS",
      href: "/leads",
      icon: (active: boolean) => (
        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <line x1="18" y1="20" x2="18" y2="10" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <line x1="12" y1="20" x2="12" y2="4" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <line x1="6" y1="20" x2="6" y2="14" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: (active: boolean) => (
        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <circle cx="12" cy="12" r="3" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke={active ? (isDark ? "#60A5FA" : "#2563EB") : (isDark ? "#94A3B8" : "#64748B")} strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className="flex h-full w-[260px] shrink-0 select-none flex-col justify-between border-r border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827] px-4 py-6 transition-colors duration-200"
    >
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg bg-[#2563EB]">
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27 6.91-1.01L12 2z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                />
              </svg>
            </div>
            <div className="text-[20px] font-bold leading-6 tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Review<span className="text-[#2563EB] dark:text-blue-500">14</span>
            </div>
          </div>

          {/* Close button on mobile drawer only */}
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1F2937]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Business Selector Card */}
        <div
          className="flex items-center justify-between rounded-[10px] border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#1F2937]/50 px-3 py-2.5 cursor-pointer hover:bg-slate-100/70 dark:hover:bg-[#1F2937] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#DBEAFE] dark:bg-blue-950/70 text-[12px] font-bold text-[#1D4ED8] dark:text-blue-400">
              CA
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                Café Aurora
              </span>
              <span className="text-[11px] leading-3.5 text-[#64748B] dark:text-[#94A3B8]">
                Unidade Centro
              </span>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <polyline points="6 9 12 15 18 9" fill="none" stroke={isDark ? "#94A3B8" : "#64748B"} strokeWidth="2" />
          </svg>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex h-10 items-center justify-between rounded-lg px-3 no-underline transition-colors ${
                  isActive
                    ? "bg-[#EFF6FF] dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-400 font-semibold"
                    : "text-[#475569] dark:text-[#CBD5E1] font-medium hover:bg-slate-50 dark:hover:bg-[#1F2937]/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon(isActive)}
                  <span className="text-[14px] leading-[18px]">
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span className="rounded-full bg-[#DBEAFE] dark:bg-blue-950/70 px-2 py-0.5 text-[11px] font-semibold text-[#1D4ED8] dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Plan & User Profile */}
      <div className="flex flex-col gap-3 border-t border-[#E2E8F0] dark:border-[#1F2937] pt-4">
        {/* Active Plan Widget */}
        <div className="flex flex-col gap-1 rounded-lg border border-[#DBEAFE] dark:border-blue-900/40 bg-[#EFF6FF] dark:bg-blue-950/30 px-3 py-2.5">
          <span className="text-[11px] font-bold uppercase leading-3.5 text-[#1D4ED8] dark:text-blue-400">
            Plano Pro Ativo
          </span>
          <span className="text-[11px] leading-3.5 text-[#475569] dark:text-slate-300">
            1.284 / 5.000 avaliações
          </span>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[12px] font-semibold text-white">
              JL
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold leading-4 text-[#0F172A] dark:text-[#F8FAFC]">
                José Lucas
              </span>
              <span className="text-[11px] leading-3.5 text-[#64748B] dark:text-[#94A3B8]">
                Gerente Geral
              </span>
            </div>
          </div>
          <Link
            href="/login"
            title="Sair"
            className="flex items-center justify-center p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1F2937] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke={isDark ? "#94A3B8" : "#64748B"} strokeWidth="2" />
              <polyline points="16 17 21 12 16 7" fill="none" stroke={isDark ? "#94A3B8" : "#64748B"} strokeWidth="2" />
              <line x1="21" y1="12" x2="9" y2="12" stroke={isDark ? "#94A3B8" : "#64748B"} strokeWidth="2" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
