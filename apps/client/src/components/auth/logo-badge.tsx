import * as React from "react";

interface LogoBadgeProps {
  destination?: string;
  icon?: "star" | "user-plus";
}

export function LogoBadge({ destination, icon = "star" }: LogoBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      {/* Icon Box */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] shadow-[0_2px_4px_rgba(37,99,235,0.2)]">
        {icon === "star" ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        )}
      </div>

      {/* Brand Name */}
      <div className="text-[22px] font-bold tracking-tight text-[#0F172A]">
        Review<span className="text-[#2563EB]">14</span>
      </div>

      {/* Destination Badge */}
      {destination && (
        <div className="rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-2.5 py-1">
          <span className="text-[11px] font-semibold text-[#1D4ED8]">
            Destino: {destination}
          </span>
        </div>
      )}
    </div>
  );
}
