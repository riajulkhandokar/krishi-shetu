"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  MapPin,
  Search,
  Sprout,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const HERO_STATS = [
  {
    label: "৫,২০০+ কৃষক",
    icon: Sprout,
  },
  {
    label: "১,৮০০+ জমির মালিক",
    icon: Users,
  },
  {
    label: "৬৪ জেলা",
    icon: MapPin,
  },
];

/**
 * হোমপেজ হিরো সেকশন
 * পূর্ণ-প্রস্থ, min-h-screen, বাংলাদেশের সবুজ ধানক্ষেতের ছবি ও গাঢ় সবুজ গ্র্যাডিয়েন্ট ওভারলে
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] lg:min-h-screen w-full flex items-center overflow-hidden bg-green-900">
      {/* বাংলাদেশের সবুজ ধানক্ষেতের ব্যাকগ্রাউন্ড ছবি */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-paddy-field.jpg"
          alt="বাংলাদেশের সবুজ ধানক্ষেত ও কর্মরত কৃষক"
          className="h-full w-full object-cover object-center"
        />
        {/* বাংলাদেশ পতাকা-অনুপ্রাণিত গাঢ় সবুজ গ্র্যাডিয়েন্ট ওভারলে (৮৫% অপাসিটি) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hero-overlay-gradient"
        />
      </div>

      {/* মূল কনটেন্ট (বাম-সারিবদ্ধ) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          {/* ২ লাইনের প্রধান বাংলা শিরোনাম */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white font-bangla leading-[1.2] tracking-tight"
          >
            <span className="block">কৃষকের হাতে হাত,</span>
            <span className="block mt-1 text-[#FDE047]">
              ফসলের ঘরে সোনা
            </span>
          </motion.h1>

          {/* সংক্ষিপ্ত বর্ণনা */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-5 max-w-xl text-base sm:text-lg md:text-xl text-white/90 font-bangla leading-relaxed"
          >
            দক্ষ কৃষক ও জমির মালিকের সরাসরি সংযোগ। কোনো মধ্যস্বত্বভোগী ছাড়াই
            ন্যায্য দৈনিক মজুরিতে বিশ্বস্ত কৃষি শ্রমিক, ট্রাক্টর ও কৃষি সেবা
            খুঁজুন দেশের ৬৪ জেলায়।
          </motion.p>

          {/* দুটি বড় অ্যাকশন বাটন */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
          >
            <Button
              variant="primary"
              size="lg"
              href="/kishok"
              leftIcon={<Search className="h-5 w-5" />}
              className="bg-green-600 hover:bg-green-700 shadow-lg shadow-black/20"
            >
              কৃষক খুঁজুন
            </Button>
            <Button
              variant="outline-white"
              size="lg"
              href="/register?role=farmer"
              leftIcon={<UserPlus className="h-5 w-5" />}
            >
              কৃষক হিসেবে যোগ দিন
            </Button>
          </motion.div>

          {/* ৩টি পরিসংখ্যান চিপ (বাংলা সংখ্যায়) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {HERO_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2.5 text-sm sm:text-base font-semibold text-white font-bangla bn-num"
                >
                  <Icon className="h-4 w-4 text-[#EAB308] shrink-0" />
                  <span>{stat.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* নিচে স্ক্রল ইন্ডিকেটর */}
      <motion.a
        href="#how-it-works"
        aria-label="নিচে স্ক্রল করুন"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors"
      >
        <span className="text-xs font-medium font-bangla">নিচে দেখুন</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
