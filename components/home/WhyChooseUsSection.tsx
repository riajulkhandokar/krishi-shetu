"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  MapPinned,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    title: "যাচাইকৃত কৃষক",
    description:
      "প্রতিটি কৃষক ও কৃষি শ্রমিকের পরিচয় এবং স্থানীয় ঠিকানা যাচাই করে প্রোফাইল যুক্ত করা হয়।",
    icon: ShieldCheck,
    accentBg: "bg-green-100",
    accentText: "text-green-600",
  },
  {
    title: "সরাসরি যোগাযোগ",
    description:
      "কোনো মধ্যস্বত্বভোগী বা দালাল ছাড়াই জমির মালিক ও কৃষক সরাসরি ফোনে কথা বলে কাজ ঠিক করতে পারেন।",
    icon: PhoneCall,
    accentBg: "bg-[#FEF9C3]",
    accentText: "text-[#854D0E]",
  },
  {
    title: "স্বচ্ছ মজুরি",
    description:
      "কাজ শুরুর আগেই দৈনিক মজুরি ও যন্ত্রপাতি ভাড়ার হার স্পষ্টভাবে দেখে নেওয়ার সুবিধা রয়েছে।",
    icon: Banknote,
    accentBg: "bg-green-50",
    accentText: "text-green-600",
  },
  {
    title: "৬৪ জেলায় সেবা",
    description:
      "উত্তরের রংপুর থেকে দক্ষিণের যশোর—বাংলাদেশের ৬৪ জেলা ও প্রতিটি উপজেলায় আমাদের বিস্তৃত নেটওয়ার্ক।",
    icon: MapPinned,
    accentBg: "bg-green-100",
    accentText: "text-green-700",
  },
];

/**
 * কেন কৃষি সেতু বেছে নেবেন — ৪টি মূল বৈশিষ্ট্য ব্লক
 */
export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-[#E5E0D8]/80">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="earth">আমাদের অঙ্গীকার</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A1A1A] font-bangla">
            কেন কৃষি সেতু বেছে নেবেন?
          </h2>
          <p className="mt-2.5 text-base md:text-lg text-[#57534E] font-bangla">
            বাংলাদেশের কৃষক ও জমির মালিকদের আস্থা, নিরাপত্তা ও ন্যায্য মজুরি
            নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card
                  padding="lg"
                  hoverLift
                  className="h-full flex flex-col bg-[#FAF7F2]/60 hover:bg-white"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.accentBg} ${feature.accentText}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] font-bangla bn-num">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-[#57534E] font-bangla leading-relaxed">
                    {feature.description}
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
