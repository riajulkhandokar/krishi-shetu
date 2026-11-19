"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, Search, UserPlus } from "lucide-react";
import { AlponaDivider } from "@/components/ui/AlponaDivider";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const STEPS = [
  {
    stepNumber: "১",
    title: "১. নিবন্ধন করুন",
    description:
      "আপনার নাম, মোবাইল নম্বর, জেলা ও কাজের ধরন দিয়ে মাত্র দুই মিনিটে বিনামূল্যে অ্যাকাউন্ট তৈরি করুন।",
    icon: UserPlus,
  },
  {
    stepNumber: "২",
    title: "২. কৃষক/জমি খুঁজুন",
    description:
      "জেলা, উপজেলা, ফসলের ধরন ও দৈনিক মজুরি দেখে আপনার এলাকার উপযুক্ত কৃষক বা জমির মালিকের কাজ খুঁজে নিন।",
    icon: Search,
  },
  {
    stepNumber: "৩",
    title: "৩. সরাসরি যোগাযোগ করুন",
    description:
      "কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি মোবাইল ফোনে কথা বলে কাজের তারিখ ও ন্যায্য মজুরি নিশ্চিত করুন।",
    icon: PhoneCall,
  },
];

/**
 * কীভাবে কাজ করে (৩ ধাপ) সেকশন
 */
export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 bg-[#FAF7F2] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* সেকশন হেডার */}
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="green">সহজ প্রক্রিয়া</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A1A1A] font-bangla">
            কীভাবে কাজ করে
          </h2>
          <p className="mt-3 text-base md:text-lg text-[#57534E] font-bangla">
            মাত্র তিনটি সহজ ধাপে দক্ষ কৃষক নিয়োগ দিন অথবা নিজের এলাকায় নিয়মিত
            কাজ খুঁজে নিন
          </p>
          <AlponaDivider className="mt-4" />
        </div>

        {/* ৩ ধাপের কার্ড গ্রিড */}
        <div className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* ডেস্কটপে ধাপগুলোর সংযোগ রেখা */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-green-600/25 z-0"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="relative z-10"
              >
                <Card
                  padding="lg"
                  hoverLift
                  className="h-full text-center flex flex-col items-center"
                >
                  <div className="relative mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 border border-green-600/20 text-green-600">
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#EAB308] text-sm font-bold text-[#1A1A1A] bn-num shadow-sm">
                      {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A1A] font-bangla">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#57534E] font-bangla leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
