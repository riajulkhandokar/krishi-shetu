import React, { Suspense } from "react";
import type { Metadata } from "next";
import { KishokDirectoryClient } from "@/components/kishok/KishokDirectoryClient";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export const metadata: Metadata = {
  title: "আমাদের কৃষকগণ — কৃষি সেতু",
  description:
    "৬৪ জেলার যাচাইকৃত কৃষক ও কৃষি শ্রমিকদের তালিকা। জেলা, কাজের দক্ষতা ও দৈনিক মজুরি অনুযায়ী ফিল্টার করে সরাসরি যোগাযোগ করুন।",
};

/**
 * /kishok — কৃষক তালিকা পেজ (Phase 2)
 */
export default function KishokPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <LoadingSkeleton variant="farmer-grid" count={6} />
          </div>
        </div>
      }
    >
      <KishokDirectoryClient />
    </Suspense>
  );
}
