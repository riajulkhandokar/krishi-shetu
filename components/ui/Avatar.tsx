import React from "react";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types";

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  availability?: AvailabilityStatus;
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-lg",
  xl: "h-20 w-20 text-xl",
};

/**
 * কৃষক ও জমির মালিকের প্রোফাইল ছবি (সক্রিয়/ব্যস্ত স্ট্যাটাস ডটসহ)
 */
export function Avatar({
  src,
  alt,
  size = "md",
  availability,
  className,
}: AvatarProps) {
  const initial = alt.trim().charAt(0) || "কৃ";

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-full border-2 border-white bg-green-100 text-green-700 font-bold flex items-center justify-center shadow-sm",
          sizeClasses[size]
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <span aria-hidden="true">{initial}</span>
        )}
      </div>

      {availability && (
        <span
          title={availability}
          aria-label={availability}
          className={cn(
            "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white",
            availability === "সক্রিয়" ? "bg-green-600" : "bg-red-500"
          )}
        />
      )}
    </div>
  );
}
