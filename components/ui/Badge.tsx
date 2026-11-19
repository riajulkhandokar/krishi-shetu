import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "green"
  | "accent"
  | "earth"
  | "neutral"
  | "active"
  | "busy"
  | "hot"
  | "glass";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: "bg-green-100 text-green-700 border border-green-600/20",
  accent: "bg-[#FEF9C3] text-[#854D0E] border border-[#EAB308]/35",
  earth: "bg-[#FEF3C7] text-[#92400E] border border-[#92400E]/20",
  neutral: "bg-[#FAF7F2] text-[#57534E] border border-[#E5E0D8]",
  active: "bg-green-100 text-green-600 border border-green-600/25",
  busy: "bg-red-50 text-red-700 border border-red-100",
  hot: "bg-red-500 text-white font-bold text-sm border border-transparent",
  glass: "bg-white/15 text-white border border-white/25 backdrop-blur-md",
};

/**
 * স্ট্যাটাস, দক্ষতা ও লেবেলের জন্য গোলাকার পিল ব্যাজ
 */
export function Badge({
  variant = "green",
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-bangla leading-none whitespace-nowrap",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
