"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { BANGLADESH_DISTRICTS, SKILL_CATEGORIES } from "@/data/districts";
import { toBnDigits } from "@/lib/bn";
import { cn } from "@/lib/utils";
import type { FarmerSortOption, WageRangeFilter } from "@/types";

export const WAGE_OPTIONS: { value: Exclude<WageRangeFilter, "">; label: string }[] = [
  { value: "under500", label: "৳৫০০ এর নিচে" },
  { value: "500to1000", label: "৳৫০০–১০০০" },
  { value: "above1000", label: "৳১০০০+" },
];

export const SORT_OPTIONS: { value: FarmerSortOption; label: string }[] = [
  { value: "rating", label: "সর্বোচ্চ রেটিং" },
  { value: "wage_asc", label: "কম মজুরি" },
  { value: "experience", label: "বেশি অভিজ্ঞতা" },
  { value: "newest", label: "নতুন আগে" },
];

export interface FarmerFilterValues {
  q: string;
  district: string;
  skill: string;
  wage: WageRangeFilter;
  sort: FarmerSortOption;
}

interface FarmerFilterBarProps {
  values: FarmerFilterValues;
  totalResults: number;
  onChange: (patch: Partial<FarmerFilterValues>) => void;
  onReset: () => void;
}

/**
 * কৃষক তালিকা ফিল্টার বার
 * - ডেস্কটপে ন্যাভবারের নিচে স্টিকি থাকে (top-20)
 * - মোবাইলে "ফিল্টার" বাটনে ক্লিক করলে স্লাইড-ইন ড্রয়ার খোলে
 * - সক্রিয় ফিল্টার চিপস (× দিয়ে আলাদাভাবে বাদ দেওয়ার সুবিধা)
 */
export function FarmerFilterBar({
  values,
  totalResults,
  onChange,
  onReset,
}: FarmerFilterBarProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // মোবাইল ড্রয়ার খোলা থাকলে ব্যাকগ্রাউন্ড স্ক্রল বন্ধ ও Escape চাপলে বন্ধ করা
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileDrawerOpen(false);
    };
    if (mobileDrawerOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const districtOptions = BANGLADESH_DISTRICTS.map((d) => ({
    value: d,
    label: d,
  }));

  const skillOptions = SKILL_CATEGORIES.map((s) => ({
    value: s,
    label: s,
  }));

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];

  if (values.q.trim()) {
    activeChips.push({
      key: "q",
      label: `অনুসন্ধান: "${values.q.trim()}"`,
      onRemove: () => onChange({ q: "" }),
    });
  }
  if (values.district) {
    activeChips.push({
      key: "district",
      label: `জেলা: ${values.district}`,
      onRemove: () => onChange({ district: "" }),
    });
  }
  if (values.skill) {
    activeChips.push({
      key: "skill",
      label: `সেবা: ${values.skill}`,
      onRemove: () => onChange({ skill: "" }),
    });
  }
  if (values.wage) {
    const wageLabel =
      WAGE_OPTIONS.find((w) => w.value === values.wage)?.label ?? "";
    activeChips.push({
      key: "wage",
      label: `মজুরি: ${wageLabel}`,
      onRemove: () => onChange({ wage: "" }),
    });
  }
  if (values.sort !== "rating") {
    const sortLabel =
      SORT_OPTIONS.find((s) => s.value === values.sort)?.label ?? "";
    activeChips.push({
      key: "sort",
      label: `সাজানো: ${sortLabel}`,
      onRemove: () => onChange({ sort: "rating" }),
    });
  }

  const hasActiveFilters = activeChips.length > 0;

  return (
    <>
      {/* স্টিকি ফিল্টার বার (ডেস্কটপে ন্যাভবারের ঠিক নিচে top-20) */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-y border-[#E5E0D8] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* মোবাইল কম্প্যাক্ট বার: সার্চ + ফিল্টার ড্রয়ার বাটন */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <div className="flex-1">
              <Input
                aria-label="নাম বা জেলা দিয়ে খুঁজুন"
                placeholder="নাম বা জেলা দিয়ে খুঁজুন..."
                value={values.q}
                onChange={(e) => onChange({ q: e.target.value })}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>

            <button
              type="button"
              aria-label="ফিল্টার ড্রয়ার খুলুন"
              onClick={() => setMobileDrawerOpen(true)}
              className="relative inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white font-bangla hover:bg-green-700 active:scale-95 transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>ফিল্টার</span>
              {activeChips.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EAB308] px-1.5 text-xs font-bold text-[#1A1A1A] bn-num">
                  {toBnDigits(activeChips.length)}
                </span>
              )}
            </button>
          </div>

          {/* ডেস্কটপ পূর্ণাঙ্গ ফিল্টার বার */}
          <div className="hidden lg:block space-y-3.5">
            {/* ১ম সারি: সার্চ, জেলা, সেবা, সাজানো ও রিসেট */}
            <div className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-4">
                <Input
                  aria-label="নাম বা জেলা দিয়ে খুঁজুন"
                  placeholder="নাম বা জেলা দিয়ে খুঁজুন..."
                  value={values.q}
                  onChange={(e) => onChange({ q: e.target.value })}
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>

              <div className="col-span-3">
                <Select
                  aria-label="জেলা নির্বাচন করুন"
                  placeholder="সকল জেলা"
                  value={values.district}
                  onChange={(e) => onChange({ district: e.target.value })}
                  options={districtOptions}
                />
              </div>

              <div className="col-span-2">
                <Select
                  aria-label="কৃষি সেবা নির্বাচন করুন"
                  placeholder="সকল সেবা"
                  value={values.skill}
                  onChange={(e) => onChange({ skill: e.target.value })}
                  options={skillOptions}
                />
              </div>

              <div className="col-span-2">
                <Select
                  aria-label="সাজানোর ধরন"
                  value={values.sort}
                  onChange={(e) =>
                    onChange({ sort: e.target.value as FarmerSortOption })
                  }
                  options={SORT_OPTIONS}
                />
              </div>

              <div className="col-span-1 flex justify-end">
                <button
                  type="button"
                  aria-label="সব ফিল্টার রিসেট করুন"
                  onClick={onReset}
                  disabled={!hasActiveFilters}
                  className={cn(
                    "inline-flex min-h-12 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold font-bangla transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                    hasActiveFilters
                      ? "text-green-600 hover:bg-green-50 cursor-pointer"
                      : "text-[#57534E]/45 cursor-not-allowed"
                  )}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>রিসেট</span>
                </button>
              </div>
            </div>

            {/* ২য় সারি: সর্বোচ্চ দৈনিক মজুরি পিল অপশনসমূহ */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-sm font-semibold text-[#57534E] font-bangla">
                  সর্বোচ্চ দৈনিক মজুরি:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {WAGE_OPTIONS.map((option) => {
                    const isSelected = values.wage === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-label={`দৈনিক মজুরি ${option.label}`}
                        aria-pressed={isSelected}
                        onClick={() =>
                          onChange({
                            wage: isSelected ? "" : option.value,
                          })
                        }
                        className={cn(
                          "min-h-10 rounded-full px-4 py-2 text-sm font-semibold font-bangla bn-num transition-all active:scale-95 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                          isSelected
                            ? "bg-green-600 text-white border-green-600 shadow-sm"
                            : "bg-[#FAF7F2] text-[#1A1A1A] border-[#E5E0D8] hover:border-green-600/60 hover:bg-green-50"
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-sm text-[#57534E] font-bangla bn-num">
                ফলাফল:{" "}
                <strong className="text-[#1A1A1A]">
                  {toBnDigits(totalResults)} জন কৃষক
                </strong>
              </p>
            </div>
          </div>

          {/* সক্রিয় ফিল্টার চিপস (× বাটনসহ) */}
          {hasActiveFilters && (
            <div className="mt-3.5 pt-3 border-t border-[#E5E0D8] flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#57534E] font-bangla mr-1">
                সক্রিয় ফিল্টার:
              </span>
              {activeChips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-green-100 border border-green-600/25 pl-3 pr-2 py-1.5 text-xs font-semibold text-green-700 font-bangla bn-num"
                >
                  <span>{chip.label}</span>
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    aria-label={`${chip.label} সরান`}
                    className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-green-600 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                aria-label="সব ফিল্টার রিসেট করুন"
                onClick={onReset}
                className="ml-auto text-xs font-bold text-green-600 hover:text-green-700 underline underline-offset-2 font-bangla cursor-pointer lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
              >
                রিসেট
              </button>
            </div>
          )}
        </div>
      </div>

      {/* মোবাইল ফিল্টার ড্রয়ার */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 z-[90] lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="কৃষক ফিল্টার ড্রয়ার"
          >
            {/* ব্যাকড্রপ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-[#1A1A1A]/55 backdrop-blur-sm"
            />

            {/* স্লাইড-ইন প্যানেল */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-10 w-[88vw] max-w-sm bg-[#FAF7F2] shadow-2xl border-l border-[#E5E0D8] flex flex-col"
            >
              {/* ড্রয়ার হেডার */}
              <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#E5E0D8]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-bold text-[#1A1A1A] font-bangla">
                    ফিল্টার করুন
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="ফিল্টার বন্ধ করুন"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E0D8] text-[#1A1A1A] hover:bg-[#FAF7F2] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* ড্রয়ার ফিল্টারসমূহ */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <Select
                  label="জেলা"
                  placeholder="সকল জেলা"
                  value={values.district}
                  onChange={(e) => onChange({ district: e.target.value })}
                  options={districtOptions}
                />

                <Select
                  label="কৃষি সেবার ধরন"
                  placeholder="সকল সেবা"
                  value={values.skill}
                  onChange={(e) => onChange({ skill: e.target.value })}
                  options={skillOptions}
                />

                {/* সর্বোচ্চ দৈনিক মজুরি */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#1A1A1A] font-bangla">
                    সর্বোচ্চ দৈনিক মজুরি
                  </p>
                  <div className="flex flex-col gap-2">
                    {WAGE_OPTIONS.map((option) => {
                      const isSelected = values.wage === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-label={`দৈনিক মজুরি ${option.label}`}
                          aria-pressed={isSelected}
                          onClick={() =>
                            onChange({
                              wage: isSelected ? "" : option.value,
                            })
                          }
                          className={cn(
                            "min-h-12 w-full rounded-full px-4 py-3 text-sm font-semibold font-bangla bn-num transition-all active:scale-95 cursor-pointer border text-left flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                            isSelected
                              ? "bg-green-600 text-white border-green-600 shadow-sm"
                              : "bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-green-600/50"
                          )}
                        >
                          <span>{option.label}</span>
                          {isSelected && (
                            <span className="h-2.5 w-2.5 rounded-full bg-[#EAB308]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Select
                  label="সাজান"
                  value={values.sort}
                  onChange={(e) =>
                    onChange({ sort: e.target.value as FarmerSortOption })
                  }
                  options={SORT_OPTIONS}
                />
              </div>

              {/* ড্রয়ার ফুটার অ্যাকশন */}
              <div className="p-5 bg-white border-t border-[#E5E0D8] grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    onReset();
                    setMobileDrawerOpen(false);
                  }}
                >
                  রিসেট
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  দেখুন ({toBnDigits(totalResults)})
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
