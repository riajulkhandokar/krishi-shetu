"use client";

import React from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Briefcase,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatBDT, formatBnRating, toBnDigits } from "@/lib/bn";
import type { Farmer } from "@/types";

export interface FarmerCardProps {
  farmer: Farmer;
  onViewDetails?: (farmer: Farmer) => void;
  onContact?: (farmer: Farmer) => void;
}

/**
 * পুনর্ব্যবহারযোগ্য কৃষক প্রোফাইল কার্ড (হোমপেজ ও /kishok উভয় পেজে ব্যবহৃত)
 * - ৬৪ পিক্সেল গোলাকার অ্যাভাটার + যাচাইকৃত ব্যাজ
 * - গ্রাম, উপজেলা, জেলা ঠিকানা ও সক্রিয়/ব্যস্ত স্ট্যাটাস ডট
 * - তারকা রেটিং, দক্ষতার পিল (সর্বোচ্চ ৩টি + "+২"), অভিজ্ঞতা ও দৈনিক মজুরি
 * - দুটি বড় ট্যাপযোগ্য বাটন: "বিস্তারিত" (আউটলাইন) ও "যোগাযোগ" (সবুজ)
 */
export function FarmerCard({
  farmer,
  onViewDetails,
  onContact,
}: FarmerCardProps) {
  const visibleSkills = farmer.skills.slice(0, 3);
  const extraSkillsCount = farmer.skills.length - visibleSkills.length;
  const isAvailable = farmer.availability === "সক্রিয়";

  return (
    <Card
      padding="md"
      hoverLift
      className="flex flex-col h-full group hover:border-green-600 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      {/* শীর্ষ অংশ: অ্যাভাটার (64px) + স্ট্যাটাস ও যাচাইকৃত ব্যাজ */}
      <div className="flex items-start justify-between gap-3">
        <div className="relative">
          <Avatar
            src={farmer.avatar}
            alt={farmer.name}
            size="lg"
            availability={farmer.availability}
            className="ring-2 ring-green-100"
          />
        </div>

        <div className="flex flex-col items-end gap-1.5">
          {/* সক্রিয় / ব্যস্ত স্ট্যাটাস ডট */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold font-bangla ${
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isAvailable ? "bg-green-600" : "bg-red-500"
              }`}
              aria-hidden="true"
            />
            <span>{farmer.availability}</span>
          </span>

          {/* যাচাইকৃত ব্যাজ */}
          {farmer.verified && (
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

      {/* নাম ও পূর্ণ ঠিকানা (গ্রাম, উপজেলা, জেলা) */}
      <div className="mt-4">
        <Link href={`/kishok/${farmer.id}`} className="block focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2">
          <h3 className="text-lg font-bold text-[#1A1A1A] font-bangla leading-snug group-hover:text-green-600 transition-colors truncate">
            {farmer.name}
          </h3>
        </Link>
        <p
          title={`${farmer.location.village}, ${farmer.location.upazila}, ${farmer.location.district}`}
          className="mt-1 flex items-start gap-1.5 text-xs sm:text-sm text-[#57534E] font-bangla leading-snug"
        >
          <MapPin className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
          <span className="line-clamp-1">
            {farmer.location.village}, {farmer.location.upazila},{" "}
            {farmer.location.district}
          </span>
        </p>
      </div>

      {/* রেটিং ও অভিজ্ঞতা */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bangla">
        <div
          className="inline-flex items-center gap-1 font-bold text-[#1A1A1A] bn-num"
          aria-label={`রেটিং ${formatBnRating(farmer.rating)}`}
        >
          <Star className="h-4 w-4 fill-[#EAB308] text-[#EAB308]" />
          <span>{formatBnRating(farmer.rating)}</span>
          <span className="font-normal text-[#57534E]">
            ({toBnDigits(farmer.totalReviews)})
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[#57534E] bn-num">
          <Briefcase className="h-3.5 w-3.5 text-green-600 shrink-0" />
          <span>{toBnDigits(farmer.experienceYears)} বছরের অভিজ্ঞতা</span>
        </div>
      </div>

      {/* দক্ষতার পিল ব্যাজ (সর্বোচ্চ ৩টি + অতিরিক্ত সংখ্যা) */}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {visibleSkills.map((skill) => (
          <Badge key={skill} variant="neutral" className="text-[11px] py-1">
            {skill}
          </Badge>
        ))}
        {extraSkillsCount > 0 && (
          <Badge variant="green" className="text-[11px] py-1 bn-num">
            +{toBnDigits(extraSkillsCount)}
          </Badge>
        )}
      </div>

      {/* নিচের অংশ: দৈনিক মজুরি ও দুটি বাটন */}
      <div className="mt-auto pt-4">
        <div className="mb-3.5 flex items-baseline justify-between rounded-xl bg-[#FAF7F2] border border-[#E5E0D8] px-3.5 py-2.5">
          <span className="text-xs font-medium text-[#57534E] font-bangla">
            দৈনিক মজুরি
          </span>
          <span className="text-xl font-bold text-green-600 bn-num">
            {formatBDT(farmer.dailyWage, "/দিন")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {onViewDetails ? (
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => onViewDetails(farmer)}
              className="px-3 text-sm"
            >
              বিস্তারিত
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="md"
              fullWidth
              href={`/kishok/${farmer.id}`}
              className="px-3 text-sm"
            >
              বিস্তারিত
            </Button>
          )}
          {onContact ? (
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => onContact(farmer)}
              leftIcon={<Phone className="h-4 w-4" />}
              className="px-3 text-sm"
            >
              যোগাযোগ
            </Button>
          ) : (
            <a
              href={`tel:${farmer.phone.replace(/-/g, "")}`}
              aria-label={`${farmer.name}-এর সাথে যোগাযোগ করুন`}
              className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-green-600 px-3 py-3 text-sm font-semibold text-white font-bangla hover:bg-green-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>যোগাযোগ</span>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
