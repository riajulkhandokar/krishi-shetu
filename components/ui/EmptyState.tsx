import React from "react";
import { Sprout } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

/**
 * কোনো তথ্য না পাওয়া গেলে দেখানোর জন্য পরিচ্ছন্ন খালি অবস্থা (Empty State)
 */
export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center rounded-2xl bg-white border border-dashed border-[#E5E0D8] px-6 py-14",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        {icon ?? <Sprout className="h-8 w-8" />}
      </div>
      <h3 className="text-xl font-bold text-[#1A1A1A] font-bangla">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-[#57534E] font-bangla">
        {description}
      </p>
      {actionLabel && (
        <div className="mt-6">
          <Button
            variant="secondary"
            size="md"
            href={actionHref}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
