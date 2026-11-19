import React from "react";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { CtaBannerSection } from "@/components/home/CtaBannerSection";
import { FeaturedFarmersSection } from "@/components/home/FeaturedFarmersSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";

/**
 * কৃষি সেতু হোমপেজ (/)
 * নির্ধারিত ক্রমানুসারে ৭টি সেকশন:
 * ১. হিরো ২. কীভাবে কাজ করে ৩. আমাদের কৃষকগণ ৪. কৃষি সেবার ধরন
 * ৫. কেন কৃষি সেতু ৬. ব্যবহারকারীদের কথা ৭. কল-টু-অ্যাকশন ব্যানার
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* বাংলাদেশ পতাকা-অনুপ্রাণিত ৪ পিক্সেল ডিভাইডার (একবার মাত্র) */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-green-600 via-green-700 to-red-700"
      />
      <HowItWorksSection />
      <FeaturedFarmersSection />
      <CategoriesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CtaBannerSection />
    </>
  );
}
