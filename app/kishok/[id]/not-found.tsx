import React from "react";
import { ArrowLeft } from "lucide-react";
import { KishokEmptyIllustration } from "@/components/kishok/KishokEmptyIllustration";
import { Button } from "@/components/ui/Button";

/**
 * অকার্যকর কৃষক আইডির জন্য বাংলা ৪০৪ পেজ
 */
export default function FarmerNotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2] px-4 py-16">
      <div className="max-w-md w-full rounded-2xl bg-white border border-[#E5E0D8] p-8 text-center shadow-sm">
        <KishokEmptyIllustration />
        <h1 className="mt-5 text-2xl font-bold text-[#1A1A1A] font-bangla">
          কৃষকের প্রোফাইল পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#57534E] font-bangla">
          আপনি যে কৃষকের প্রোফাইল খুঁজছেন তা সরানো হয়েছে অথবা ঠিকানাটি সঠিক
          নয়।
        </p>
        <div className="mt-6">
          <Button
            variant="primary"
            size="md"
            href="/kishok"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            কৃষক তালিকায় ফিরে যান
          </Button>
        </div>
      </div>
    </section>
  );
}
