"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FloatingWhatsAppButton } from "@/components/layout/FloatingWhatsAppButton";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";

/**
 * পাবলিক পেজ ও ড্যাশবোর্ডের জন্য লেআউট ক্রোম ব্যবস্থাপনা
 * - ড্যাশবোর্ডে (/dashboard) নিজস্ব সাইডবার ও টপ বার থাকায় পাবলিক ন্যাভবার/ফুটার লুকানো থাকে
 * - সব পাবলিক পেজে ন্যাভবার, ফেড-ইন ট্রানজিশন, ফুটার ও ভাসমান "হেল্প" হোয়াটসঅ্যাপ বাটন দেখানো হয়
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <main className="flex-1 flex flex-col min-h-screen bg-[#FAF7F2]">
        <PageTransition>{children}</PageTransition>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
