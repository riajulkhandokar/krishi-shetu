import React from "react";
import { cn } from "@/lib/utils";

interface AlponaDividerProps {
  className?: string;
}

/**
 * বাংলার ঐতিহ্যবাহী আলপনা ও ধানের শীষের ছোঁয়ায় সূক্ষ্ম SVG বিভাজক
 */
export function AlponaDivider({ className }: AlponaDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center w-full py-2", className)}
    >
      <div className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent to-green-600/25" />
      <svg
        width="88"
        height="24"
        viewBox="0 0 88 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-3 shrink-0"
      >
        {/* বাম পাতার মোটিফ */}
        <path
          d="M6 12C12 7 18 7 24 12C18 17 12 17 6 12Z"
          stroke="#006A4E"
          strokeOpacity="0.35"
          strokeWidth="1.25"
        />
        <circle cx="15" cy="12" r="1.5" fill="#EAB308" fillOpacity="0.7" />

        {/* কেন্দ্রীয় আলপনা পদ্ম বিন্দু */}
        <path
          d="M44 3L48.5 9.5L55 12L48.5 14.5L44 21L39.5 14.5L33 12L39.5 9.5L44 3Z"
          fill="#006A4E"
          fillOpacity="0.14"
          stroke="#006A4E"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <circle cx="44" cy="12" r="2.2" fill="#EAB308" />

        {/* ডান পাতার মোটিফ */}
        <path
          d="M64 12C70 7 76 7 82 12C76 17 70 17 64 12Z"
          stroke="#006A4E"
          strokeOpacity="0.35"
          strokeWidth="1.25"
        />
        <circle cx="73" cy="12" r="1.5" fill="#EAB308" fillOpacity="0.7" />
      </svg>
      <div className="h-px flex-1 max-w-[140px] bg-gradient-to-l from-transparent to-green-600/25" />
    </div>
  );
}
