"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface StarRatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  className?: string;
}

const RATING_LABELS: Record<number, string> = {
  1: "Péssimo",
  2: "Ruim",
  3: "Regular",
  4: "Muito Bom! 👏",
  5: "Excelente! Incrível! ⭐",
};

const SIZE_MAP = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
};

export function StarRating({
  value,
  defaultValue = 0,
  onChange,
  readOnly = false,
  size = "lg",
  showLabel = true,
  className,
}: StarRatingProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const currentRating = value !== undefined ? value : internalValue;
  const displayRating = hoverValue !== null ? hoverValue : currentRating;

  const handleSelect = (star: number) => {
    if (readOnly) return;
    setInternalValue(star);
    onChange?.(star);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Avaliação por estrelas">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          return (
            <button
              key={star}
              type="button"
              disabled={readOnly}
              onClick={() => handleSelect(star)}
              onMouseEnter={() => !readOnly && setHoverValue(star)}
              onMouseLeave={() => !readOnly && setHoverValue(null)}
              className={cn(
                "p-1 rounded-md transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                !readOnly && "hover:scale-125 active:scale-95 cursor-pointer",
                readOnly && "cursor-default"
              )}
              aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
            >
              <svg
                className={cn(
                  SIZE_MAP[size],
                  "transition-colors duration-150",
                  isFilled
                    ? "text-amber-400 fill-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.4)]"
                    : "text-muted stroke-muted-foreground/30 fill-transparent"
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          );
        })}
      </div>

      {showLabel && (
        <p
          className={cn(
            "text-sm font-semibold transition-all h-6 flex items-center justify-center",
            displayRating > 0 ? "text-foreground" : "text-muted-foreground opacity-60"
          )}
        >
          {displayRating > 0 ? RATING_LABELS[displayRating] : "Toque nas estrelas para avaliar"}
        </p>
      )}
    </div>
  );
}
