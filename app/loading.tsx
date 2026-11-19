import React from "react";
import { Leaf } from "lucide-react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

/**
 * গ্লোবাল রুট লোডিং স্কেলেটন (app/loading.tsx)
 */
export default function GlobalLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="পৃষ্ঠা লোড হচ্ছে"
      className="min-h-[75vh] bg-[#FAF7F2] py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* শীর্ষ শিরোনাম স্কেলেটন */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white border border-[#E5E0D8] p-6 shadow-sm animate-pulse">
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 font-bangla">
              <Leaf className="h-4 w-4 animate-bounce" aria-hidden="true" />
              <span>তথ্য লোড হচ্ছে...</span>
            </div>
            <div className="h-7 w-2/3 max-w-md rounded-full bg-[#E5E0D8]" />
            <div className="h-4 w-1/2 max-w-sm rounded-full bg-[#E5E0D8]/80" />
          </div>
          <div className="h-12 w-36 rounded-full bg-[#E5E0D8]" />
        </div>

        {/* ফিল্টার বার স্কেলেটন */}
        <div className="rounded-2xl bg-white border border-[#E5E0D8] p-4 shadow-sm animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="h-12 rounded-xl bg-[#E5E0D8]/75" />
            <div className="h-12 rounded-xl bg-[#E5E0D8]/75" />
            <div className="h-12 rounded-xl bg-[#E5E0D8]/75" />
            <div className="h-12 rounded-xl bg-[#E5E0D8]/75" />
          </div>
        </div>

        {/* কার্ড গ্রিড স্কেলেটন */}
        <LoadingSkeleton variant="farmer-grid" count={4} />
      </div>
    </div>
  );
}
