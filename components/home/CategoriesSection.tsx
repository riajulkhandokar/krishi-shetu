"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Beef,
  Droplets,
  Fish,
  Package,
  Scissors,
  Sprout,
  Tractor,
  Wheat,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { serviceCategories } from "@/data/homepage";
import { formatBDT, formatBnNumber } from "@/lib/bn";
import { cn } from "@/lib/utils";
import type { ServiceCategory } from "@/types";

const CATEGORY_ICONS: Record<
  ServiceCategory["iconName"],
  React.ComponentType<{ className?: string }>
> = {
  Wheat,
  Sprout,
  Fish,
  Beef,
  Tractor,
  Droplets,
  Scissors,
  Package,
};

/**
 * কৃষি সেবার ধরন — হরিজন্টাল পিল রো (৮টি মূল কৃষি সেবা ও আইকনসহ)
 */
export function CategoriesSection() {
  const [activeId, setActiveId] = useState<string>(serviceCategories[0].id);

  const activeCategory =
    serviceCategories.find((item) => item.id === activeId) ??
    serviceCategories[0];
  const ActiveIcon = CATEGORY_ICONS[activeCategory.iconName];

  return (
    <section
      id="categories"
      className="py-16 md:py-24 bg-[#FAF7F2] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* সেকশন হেডার */}
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="green">সকল কৃষি কাজ একসাথে</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A1A1A] font-bangla">
            কৃষি সেবার ধরন
          </h2>
          <p className="mt-2.5 text-base md:text-lg text-[#57534E] font-bangla">
            জমি চাষ থেকে ফসল কাটা—যেকোনো কৃষি সেবার ধরন বেছে নিয়ে দক্ষ কৃষক
            খুঁজুন
          </p>
        </div>

        {/* হরিজন্টাল পিল সারি (মোবাইলে মসৃণ স্ক্রল, ডেস্কটপে সুন্দর বিন্যাস) */}
        <div
          role="tablist"
          aria-label="কৃষি সেবার ধরন"
          className="mt-10 flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar md:flex-wrap md:justify-center md:overflow-visible"
        >
          {serviceCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.iconName];
            const isActive = category.id === activeId;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-label={category.label}
                aria-selected={isActive}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "inline-flex shrink-0 min-h-12 items-center gap-2.5 rounded-full px-5 py-3 text-sm sm:text-base font-semibold font-bangla transition-all duration-200 active:scale-95 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                  isActive
                    ? "bg-green-600 text-white border-green-600 shadow-md"
                    : "bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-green-600/50 hover:bg-green-50 hover:text-green-700 shadow-sm"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-[#EAB308]" : "text-green-600"
                  )}
                />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* নির্বাচিত সেবার সারসংক্ষেপ কার্ড */}
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          <Card
            hoverLift={false}
            padding="lg"
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border-green-600/20"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <ActiveIcon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] font-bangla">
                  {activeCategory.label}
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-[#57534E] font-bangla max-w-xl">
                  {activeCategory.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge variant="green" className="bn-num">
                    {formatBnNumber(activeCategory.activeFarmersCount)}+ জন দক্ষ
                    কৃষক
                  </Badge>
                  <Badge variant="accent" className="bn-num">
                    গড় দৈনিক মজুরি{" "}
                    {formatBDT(activeCategory.avgDailyWage, "/দিন")}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Button
                variant="primary"
                size="md"
                href={`/kishok?skill=${encodeURIComponent(activeCategory.label)}`}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                কৃষক দেখুন
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
