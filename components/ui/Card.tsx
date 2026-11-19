import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-6 md:p-8",
};

/**
 * কৃষি সেতু গ্লোবাল কার্ড — সাদা ব্যাকগ্রাউন্ড, 1px বর্ডার, rounded-2xl ও সফট হোভার লিফট
 */
export function Card({
  hoverLift = true,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E5E0D8] rounded-2xl shadow-sm transition-all duration-300",
        hoverLift && "hover:shadow-md hover:-translate-y-1 hover:border-green-600/30",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
