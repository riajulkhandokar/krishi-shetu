import React, { Suspense } from "react";
import type { Metadata } from "next";
import { JomirMalikDirectoryClient } from "@/components/landowners/JomirMalikDirectoryClient";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export const metadata: Metadata = {
  title: "জমির মালিকগণ — কৃষি সেতু",
  description:
    "বাংলাদেশের ৬৪ জেলার জমির মালিকদের কৃষি শ্রমিক প্রয়োজন, জমি ভাড়া ও যন্ত্রপাতি ভাড়ার তালিকা। সরাসরি যোগাযোগ করুন অথবা আপনার চাহিদা পোস্ট করুন।",
};

/**
 * /jomir-malik — জমির মালিক তালিকা পেজ (Phase 3)
 */
export default function JomirMalikPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <LoadingSkeleton
              variant="farmer-grid"
              count={6}
              className="xl:grid-cols-3"
            />
          </div>
        </div>
      }
    >
      <JomirMalikDirectoryClient />
    </Suspense>
  );
}
