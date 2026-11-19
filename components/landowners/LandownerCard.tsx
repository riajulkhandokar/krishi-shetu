"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  Calendar,
  Check,
  Copy,
  Eye,
  LandPlot,
  MapPin,
  Phone,
  Tractor,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatBDT } from "@/lib/bn";
import type { Landowner, LandownerServiceType } from "@/types";

interface LandownerCardProps {
  landowner: Landowner;
}

const SERVICE_META: Record<
  LandownerServiceType,
  { variant: BadgeVariant; budgetLabel: string; icon: React.ComponentType<{ className?: string }> }
> = {
  "শ্রমিক প্রয়োজন": {
    variant: "green",
    budgetLabel: "দৈনিক মজুরি বাজেট",
    icon: Users,
  },
  "জমি ভাড়া": {
    variant: "earth",
    budgetLabel: "জমি ভাড়া",
    icon: LandPlot,
  },
  "যন্ত্রপাতি ভাড়া": {
    variant: "accent",
    budgetLabel: "যন্ত্রপাতি ভাড়া বাজেট",
    icon: Tractor,
  },
};

function maskPhone(phone: string): string {
  const parts = phone.split("-");
  if (parts.length === 2) return `${parts[0]}-******`;
  return `${phone.slice(0, 5)}******`;
}

/**
 * জমির মালিকের চাহিদা কার্ড (/jomir-malik)
 * - ৬৪px অ্যাভাটার, যাচাইকৃত ব্যাজ ও চাহিদার ধরন (শ্রমিক প্রয়োজন / জমি ভাড়া / যন্ত্রপাতি ভাড়া)
 * - জমির পরিমাণ, ফসলের ধরন, বাজেট, প্রকাশের তারিখ ও নম্বর রিভিলসহ সরাসরি যোগাযোগ
 */
export function LandownerCard({ landowner }: LandownerCardProps) {
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const meta = SERVICE_META[landowner.serviceType];
  const ServiceIcon = meta.icon;
  const suffix =
    landowner.budgetUnit ??
    (landowner.serviceType === "জমি ভাড়া" ? "/মৌসুম" : "/দিন");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(landowner.phone);
      setCopied(true);
      toast.success("মোবাইল নম্বর কপি হয়েছে");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ক্লিপবোর্ড অনুপলব্ধ হলে উপেক্ষা
    }
  };

  return (
    <Card
      padding="md"
      hoverLift
      className="flex flex-col h-full group hover:border-green-600 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      {/* শীর্ষ অংশ: অ্যাভাটার + চাহিদার ধরন ও যাচাইকৃত ব্যাজ */}
      <div className="flex items-start justify-between gap-3">
        <Avatar
          src={landowner.avatar}
          alt={landowner.name}
          size="lg"
          className="ring-2 ring-green-100"
        />

        <div className="flex flex-col items-end gap-1.5">
          <Badge
            variant={meta.variant}
            icon={<ServiceIcon className="h-3.5 w-3.5" />}
          >
            {landowner.serviceType}
          </Badge>

          {landowner.verified && (
            <Badge
              variant="green"
              className="py-1 px-2.5 text-[11px]"
              icon={<BadgeCheck className="h-3.5 w-3.5 text-green-600" />}
            >
              যাচাইকৃত
            </Badge>
          )}
        </div>
      </div>

      {/* নাম ও পূর্ণ ঠিকানা */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-[#1A1A1A] font-bangla leading-snug group-hover:text-green-600 transition-colors">
          {landowner.name}
        </h3>
        <p className="mt-1 flex items-start gap-1.5 text-xs sm:text-sm text-[#57534E] font-bangla">
          <MapPin className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
          <span className="line-clamp-1">
            {landowner.location.village}, {landowner.location.upazila},{" "}
            {landowner.location.district}
          </span>
        </p>
      </div>

      {/* জমির পরিমাণ ও প্রকাশের তারিখ */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bangla">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F2] border border-[#E5E0D8] px-3 py-1 font-semibold text-[#1A1A1A] bn-num">
          <LandPlot className="h-3.5 w-3.5 text-[#92400E]" />
          জমি: {landowner.landSize}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7F2] border border-[#E5E0D8] px-3 py-1 text-[#57534E] bn-num">
          <Calendar className="h-3.5 w-3.5 text-green-600" />
          {landowner.postedDate}
        </span>
      </div>

      {/* বিবরণ */}
      <p className="mt-3 text-sm text-[#57534E] font-bangla line-clamp-2 leading-relaxed">
        {landowner.bio}
      </p>

      {/* ফসলের ধরন */}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {landowner.cropType.map((crop) => (
          <Badge key={crop} variant="neutral" className="text-[11px] py-1">
            {crop}
          </Badge>
        ))}
      </div>

      {/* নিচের অংশ: বাজেট ও যোগাযোগ */}
      <div className="mt-auto pt-4">
        <div className="mb-3.5 flex items-baseline justify-between rounded-xl bg-[#FAF7F2] border border-[#E5E0D8] px-3.5 py-2.5">
          <span className="text-xs font-medium text-[#57534E] font-bangla">
            {meta.budgetLabel}
          </span>
          <span className="text-xl font-bold text-green-600 bn-num">
            {formatBDT(landowner.budget, suffix)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!phoneRevealed ? (
            <button
              type="button"
              aria-label={`${landowner.name} এর মোবাইল নম্বর দেখুন`}
              onClick={() => setPhoneRevealed(true)}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-green-600 bg-white px-4 py-2.5 text-sm font-semibold text-green-600 font-bangla hover:bg-green-50 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <Eye className="h-4 w-4 shrink-0" />
              <span className="font-english text-xs hidden sm:inline">
                {maskPhone(landowner.phone)}
              </span>
              <span>নম্বর দেখুন</span>
            </button>
          ) : (
            <div className="flex flex-1 items-center gap-2">
              <a
                href={`tel:${landowner.phone.replace(/-/g, "")}`}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white font-bangla hover:bg-green-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span className="font-english">{landowner.phone}</span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="মোবাইল নম্বর কপি করুন"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#57534E] hover:border-green-600 hover:text-green-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
