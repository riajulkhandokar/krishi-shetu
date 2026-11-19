import React from "react";
import { cn } from "@/lib/utils";

export interface LoadingSkeletonProps {
  variant?: "card" | "farmer-grid" | "line";
  count?: number;
  className?: string;
}

/**
 * লোডিং অবস্থার জন্য সফট পালস স্কেলেটন কম্পোনেন্ট
 */
export function LoadingSkeleton({
  variant = "card",
  count = 6,
  className,
}: LoadingSkeletonProps) {
  if (variant === "line") {
    return (
      <div
        className={cn(
          "h-4 w-full animate-pulse rounded-full bg-[#E5E0D8]",
          className
        )}
      />
    );
  }

  if (variant === "farmer-grid") {
    return (
      <div
        aria-busy="true"
        aria-label="কৃষকদের তালিকা লোড হচ্ছে"
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
          className
        )}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white border border-[#E5E0D8] p-6 shadow-sm animate-pulse flex flex-col"
          >
            {/* অ্যাভাটার + স্ট্যাটাস */}
            <div className="flex items-start justify-between gap-3">
              <div className="h-16 w-16 rounded-full bg-[#E5E0D8]" />
              <div className="space-y-2 flex flex-col items-end">
                <div className="h-6 w-16 rounded-full bg-[#E5E0D8]" />
                <div className="h-5 w-20 rounded-full bg-[#E5E0D8]/80" />
              </div>
            </div>

            {/* নাম ও ঠিকানা */}
            <div className="mt-4 space-y-2">
              <div className="h-5 w-3/4 rounded-full bg-[#E5E0D8]" />
              <div className="h-4 w-full rounded-full bg-[#E5E0D8]/75" />
            </div>

            {/* রেটিং ও অভিজ্ঞতা */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="h-4 w-16 rounded-full bg-[#E5E0D8]" />
              <div className="h-4 w-28 rounded-full bg-[#E5E0D8]/80" />
            </div>

            {/* দক্ষতার পিল */}
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-[#E5E0D8]/70" />
              <div className="h-6 w-20 rounded-full bg-[#E5E0D8]/70" />
              <div className="h-6 w-12 rounded-full bg-[#E5E0D8]/70" />
            </div>

            {/* দৈনিক মজুরি ও বাটন */}
            <div className="mt-5 space-y-3">
              <div className="h-12 w-full rounded-xl bg-[#FAF7F2] border border-[#E5E0D8]" />
              <div className="grid grid-cols-2 gap-2.5">
                <div className="h-12 rounded-full bg-[#E5E0D8]/80" />
                <div className="h-12 rounded-full bg-[#E5E0D8]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-[#E5E0D8] p-6 space-y-4 animate-pulse",
        className
      )}
    >
      <div className="h-12 w-12 rounded-2xl bg-[#E5E0D8]" />
      <div className="h-5 w-1/2 rounded-full bg-[#E5E0D8]" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded-full bg-[#E5E0D8]/80" />
        <div className="h-4 w-4/5 rounded-full bg-[#E5E0D8]/80" />
      </div>
    </div>
  );
}
