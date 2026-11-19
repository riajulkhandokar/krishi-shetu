"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FarmerCard } from "@/components/farmers/FarmerCard";
import { FarmerQuickViewModal } from "@/components/farmers/FarmerQuickViewModal";
import { Badge } from "@/components/ui/Badge";
import { featuredFarmers } from "@/data/farmers";
import type { Farmer } from "@/types";

/**
 * বাছাইকৃত কৃষক সেকশন ("আমাদের কৃষকগণ")
 * হোমপেজে ৪ জন কৃষকের প্রোফাইল কার্ড এবং নিচে ডানদিকে "সব কৃষক দেখুন" লিংক
 */
export function FeaturedFarmersSection() {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [highlightContact, setHighlightContact] = useState(false);

  const openModal = (farmer: Farmer, focusContact: boolean) => {
    setHighlightContact(focusContact);
    setSelectedFarmer(farmer);
  };

  return (
    <section
      id="featured-farmers"
      className="py-16 md:py-24 bg-white border-y border-[#E5E0D8]/80 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* সেকশন হেডার */}
        <div className="max-w-2xl">
          <Badge variant="accent">যাচাইকৃত কৃষি দক্ষতা</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A1A1A] font-bangla">
            আমাদের কৃষকগণ
          </h2>
          <p className="mt-2.5 text-base md:text-lg text-[#57534E] font-bangla">
            দেশের বিভিন্ন জেলার অভিজ্ঞ, পরিশ্রমী ও যাচাইকৃত কৃষক এবং কৃষি
            শ্রমিকদের প্রোফাইল দেখুন
          </p>
        </div>

        {/* ৪টি কৃষক কার্ডের রেসপন্সিভ গ্রিড */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFarmers.map((farmer, index) => (
            <motion.div
              key={farmer.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <FarmerCard
                farmer={farmer}
                onContact={(item) => openModal(item, true)}
              />
            </motion.div>
          ))}
        </div>

        {/* নিচে ডানদিকে "সব কৃষক দেখুন" লিংক */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/kishok"
            className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-base font-bold text-green-600 hover:bg-green-50 hover:text-green-700 font-bangla transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <span>সব কৃষক দেখুন</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* দ্রুত প্রোফাইল দেখার মডাল */}
      <FarmerQuickViewModal
        farmer={selectedFarmer}
        highlightContact={highlightContact}
        onClose={() => setSelectedFarmer(null)}
      />
    </section>
  );
}
