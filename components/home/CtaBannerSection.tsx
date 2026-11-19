"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Sprout, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * কল-টু-অ্যাকশন ব্যানার — সবুজ গ্র্যাডিয়েন্ট, "আজই যোগ দিন কৃষি সেতুতে" + ২টি বাটন
 */
export function CtaBannerSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-green-900 px-6 py-12 sm:px-10 md:px-14 md:py-16 text-white shadow-lg"
        >
          {/* সূক্ষ্ম বাংলা আলপনা জ্যামিতিক ব্যাকগ্রাউন্ড মোটিফ */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 text-white/10"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M100 18L116 84L182 100L116 116L100 182L84 116L18 100L84 84L100 18Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-[#EAB308]/15 blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#FEF9C3] font-bangla">
                <Sprout className="h-4 w-4 text-[#EAB308]" />
                <span>বিনামূল্যে নিবন্ধন করুন</span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl md:text-[42px] font-bold text-white font-bangla leading-tight">
                আজই যোগ দিন কৃষি সেতুতে
              </h2>
              <p className="mt-3 text-base sm:text-lg text-white/90 font-bangla leading-relaxed">
                আপনি দক্ষ কৃষক হোন কিংবা জমির মালিক—এখনই নিবন্ধন করে সরাসরি
                কাজ খুঁজুন বা বিশ্বস্ত কৃষি শ্রমিক নিয়োগ দিন।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <Button
                variant="accent"
                size="lg"
                href="/register"
                leftIcon={<UserPlus className="h-5 w-5" />}
                className="font-bold"
              >
                নিবন্ধন করুন
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                href="/kishok"
                leftIcon={<Search className="h-5 w-5" />}
              >
                কৃষক খুঁজুন
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
