"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  MapPin,
  Phone,
  Star,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatBDT, formatBnRating, toBnDigits } from "@/lib/bn";
import type { Farmer } from "@/types";

interface FarmerQuickViewModalProps {
  farmer: Farmer | null;
  highlightContact?: boolean;
  onClose: () => void;
}

/**
 * কৃষকের পূর্ণাঙ্গ প্রোফাইল, সরাসরি ফোন নম্বর কপি/কল ও দ্রুত বুকিং মডাল
 */
export function FarmerQuickViewModal({
  farmer,
  highlightContact = false,
  onClose,
}: FarmerQuickViewModalProps) {
  const [booked, setBooked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBooked(false);
    setCopied(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (farmer) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [farmer, onClose]);

  const handleCopyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      toast.success("মোবাইল নম্বর কপি হয়েছে");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ক্লিপবোর্ড অনুপলব্ধ হলে নীরবে উপেক্ষা করা
    }
  };

  return (
    <AnimatePresence>
      {farmer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="farmer-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] shadow-2xl"
          >
            {/* শীর্ষ ছবি */}
            <div className="relative h-52 w-full bg-green-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

              <button
                type="button"
                onClick={onClose}
                aria-label="বন্ধ করুন"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white hover:bg-black/65 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute left-5 bottom-4 right-5 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge
                    variant={
                      farmer.availability === "সক্রিয়" ? "active" : "busy"
                    }
                    className="bg-white/95"
                  >
                    {farmer.availability}
                  </Badge>
                  {farmer.verified && (
                    <Badge
                      variant="green"
                      className="bg-green-600 text-white border-none"
                      icon={<BadgeCheck className="h-3.5 w-3.5" />}
                    >
                      যাচাইকৃত কৃষক
                    </Badge>
                  )}
                </div>
                <h2
                  id="farmer-modal-title"
                  className="text-2xl font-bold font-bangla"
                >
                  {farmer.name}
                </h2>
              </div>
            </div>

            {/* বিস্তারিত তথ্য */}
            <div className="p-6 space-y-5">
              {/* সরাসরি যোগাযোগের অংশ — "যোগাযোগ" বাটনে ক্লিক করলে হাইলাইট হয় */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl p-4 border transition-colors ${
                  highlightContact
                    ? "bg-green-100/80 border-green-600 shadow-sm"
                    : "bg-green-50 border-green-600/20"
                }`}
              >
                <div>
                  <p className="text-xs font-medium text-green-700 font-bangla">
                    দৈনিক মজুরি
                  </p>
                  <p className="text-2xl font-bold text-green-600 bn-num">
                    {formatBDT(farmer.dailyWage, "/দিন")}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs font-medium text-[#57534E] font-bangla">
                    সরাসরি মোবাইল নম্বর
                  </p>
                  <div className="mt-0.5 flex items-center sm:justify-end gap-2">
                    <p className="text-lg font-bold text-[#1A1A1A] font-english">
                      {farmer.phone}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopyPhone(farmer.phone)}
                      aria-label="মোবাইল নম্বর কপি করুন"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E5E0D8] text-[#57534E] hover:text-green-600 hover:border-green-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* ঠিকানা, রেটিং ও অভিজ্ঞতা */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl bg-white border border-[#E5E0D8] p-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-sm font-bangla">
                    <p className="text-xs text-[#57534E]">পূর্ণ ঠিকানা</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      গ্রাম: {farmer.location.village}, উপজেলা:{" "}
                      {farmer.location.upazila}, জেলা:{" "}
                      {farmer.location.district}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-2 sm:border-l sm:border-[#E5E0D8] sm:pl-4">
                  <div className="flex items-center gap-2 text-sm font-bangla bn-num">
                    <Star className="h-4 w-4 fill-[#EAB308] text-[#EAB308]" />
                    <span className="font-bold text-[#1A1A1A]">
                      {formatBnRating(farmer.rating)}
                    </span>
                    <span className="text-[#57534E]">
                      ({toBnDigits(farmer.totalReviews)}টি রিভিউ)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bangla bn-num text-[#1A1A1A]">
                    <Briefcase className="h-4 w-4 text-green-600" />
                    <span>
                      {toBnDigits(farmer.experienceYears)} বছরের বাস্তব অভিজ্ঞতা
                    </span>
                  </div>
                </div>
              </div>

              {/* পরিচিতি */}
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A] font-bangla mb-1.5">
                  কাজের বিবরণ
                </h3>
                <p className="text-sm text-[#57534E] font-bangla leading-relaxed">
                  {farmer.bio}
                </p>
              </div>

              {/* দক্ষতা */}
              <div>
                <h3 className="text-sm font-bold text-[#1A1A1A] font-bangla mb-2">
                  কাজের দক্ষতা
                </h3>
                <div className="flex flex-wrap gap-2">
                  {farmer.skills.map((skill) => (
                    <Badge key={skill} variant="green">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              {booked ? (
                <div className="flex items-center gap-3 rounded-2xl bg-green-100 border border-green-600/30 p-4 text-green-700">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <p className="text-sm font-semibold font-bangla">
                    আপনার বুকিং অনুরোধ পাঠানো হয়েছে! দ্রুত নিশ্চিত করতে সরাসরি
                    ফোনেও কথা বলতে পারেন।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href={`tel:${farmer.phone.replace(/-/g, "")}`}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 text-base font-semibold text-white font-bangla hover:bg-green-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>যোগাযোগ করুন</span>
                  </a>
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    leftIcon={<Calendar className="h-5 w-5" />}
                    onClick={() => {
                      setBooked(true);
                      toast.success("বুকিং নিশ্চিত হয়েছে");
                    }}
                  >
                    বুক করুন
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
