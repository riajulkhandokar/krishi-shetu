"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  GraduationCap,
  MapPin,
  Phone,
  Share2,
  Star,
} from "lucide-react";
import { FarmerCard } from "@/components/farmers/FarmerCard";
import { FarmerQuickViewModal } from "@/components/farmers/FarmerQuickViewModal";
import { BookingModal } from "@/components/kishok/BookingModal";
import { AlponaDivider } from "@/components/ui/AlponaDivider";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatBDT, formatBnRating, toBnDigits } from "@/lib/bn";
import type { Farmer, FarmerDetailExtra } from "@/types";

interface FarmerDetailClientProps {
  farmer: Farmer;
  detail: FarmerDetailExtra;
  relatedFarmers: Farmer[];
}

/**
 * ফোন নম্বরের শেষের অঙ্কগুলো আড়াল করে (যেমন: 01714-******)
 */
function maskPhone(phone: string): string {
  const parts = phone.split("-");
  if (parts.length === 2) {
    return `${parts[0]}-******`;
  }
  return `${phone.slice(0, 5)}******`;
}

/**
 * কৃষকের বিস্তারিত প্রোফাইল পেজ (/kishok/[id])
 */
export function FarmerDetailClient({
  farmer,
  detail,
  relatedFarmers,
}: FarmerDetailClientProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState<"booking" | "contact">(
    "booking"
  );
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [sharedCopied, setSharedCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [relatedContactFarmer, setRelatedContactFarmer] =
    useState<Farmer | null>(null);

  const isAvailable = farmer.availability === "সক্রিয়";

  const openModal = (intent: "booking" | "contact") => {
    setModalIntent(intent);
    setBookingModalOpen(true);
  };

  const handleShareProfile = async () => {
    const shareUrl =
      typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: `${farmer.name} — কৃষি সেতু`,
          text: `${farmer.name} (${farmer.location.district}) — দৈনিক মজুরি ${formatBDT(farmer.dailyWage, "/দিন")}`,
          url: shareUrl,
        });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setSharedCopied(true);
        toast.success("প্রোফাইল লিংক কপি হয়েছে");
        setTimeout(() => setSharedCopied(false), 2500);
      }
    } catch {
      // শেয়ার বাতিল করলে নীরবে উপেক্ষা
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(farmer.phone);
      setPhoneCopied(true);
      toast.success("মোবাইল নম্বর কপি হয়েছে");
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch {
      // ক্লিপবোর্ড অনুপলব্ধ হলে উপেক্ষা
    }
  };

  const hasSameDistrictRelated = relatedFarmers.some(
    (f) => f.location.district === farmer.location.district
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16 md:pb-24">
      {/* ব্রেডক্রাম্ব */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="flex flex-wrap items-center gap-1.5 text-sm text-[#57534E] font-bangla"
        >
          <Link href="/" className="hover:text-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2">
            হোম
          </Link>
          <ChevronRight className="h-4 w-4 text-[#57534E]/60" />
          <Link
            href="/kishok"
            className="hover:text-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            কৃষক
          </Link>
          <ChevronRight className="h-4 w-4 text-[#57534E]/60" />
          <span className="font-semibold text-green-600" aria-current="page">
            {farmer.name}
          </span>
        </nav>
      </div>

      {/* ১. হিরো প্রোফাইল কার্ড */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card
            hoverLift={false}
            padding="none"
            className="overflow-hidden border-[#E5E0D8]"
          >
            {/* শীর্ষ সূক্ষ্ম সবুজ ব্যান্ড */}
            <div className="h-3 w-full bg-gradient-to-r from-green-700 via-green-600 to-[#EAB308]" />

            <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                {/* বড় অ্যাভাটার */}
                <div className="relative shrink-0 self-start sm:self-center">
                  <div className="h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-4 border-green-100 shadow-md bg-green-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <span
                    title={farmer.availability}
                    className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white ${
                      isAvailable ? "bg-green-600" : "bg-red-500"
                    }`}
                  />
                </div>

                {/* নাম, যাচাইকৃত ব্যাজ, ঠিকানা ও রেটিং */}
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] font-bangla">
                      {farmer.name}
                    </h1>
                    {farmer.verified && (
                      <Badge
                        variant="green"
                        className="px-3 py-1.5 text-xs"
                        icon={<BadgeCheck className="h-4 w-4 text-green-600" />}
                      >
                        যাচাইকৃত কৃষক
                      </Badge>
                    )}
                  </div>

                  {/* পূর্ণ ঠিকানা */}
                  <p className="mt-2 flex items-center gap-1.5 text-sm sm:text-base text-[#57534E] font-bangla">
                    <MapPin className="h-4 w-4 text-green-600 shrink-0" />
                    <span>
                      গ্রাম: {farmer.location.village}, উপজেলা:{" "}
                      {farmer.location.upazila}, জেলা:{" "}
                      {farmer.location.district}
                    </span>
                  </p>

                  {/* রেটিং, অভিজ্ঞতা ও সক্রিয়তা */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bangla">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF9C3] border border-[#EAB308]/35 px-3 py-1 font-bold text-[#854D0E] bn-num">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.round(farmer.rating)
                                ? "fill-[#EAB308] text-[#EAB308]"
                                : "text-[#EAB308]/40"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{formatBnRating(farmer.rating)}</span>
                      <span className="font-normal text-gold-600">
                        ({toBnDigits(farmer.totalReviews)}টি রিভিউ)
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-50 text-red-700 border border-red-100"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isAvailable ? "bg-green-600" : "bg-red-500"
                        }`}
                      />
                      <span>{farmer.availability}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-[#57534E] bn-num">
                      <Briefcase className="h-4 w-4 text-green-600" />
                      <span>
                        {toBnDigits(farmer.experienceYears)} বছরের অভিজ্ঞতা
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* হিরো অ্যাকশন বাটন */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => openModal("contact")}
                  leftIcon={<Phone className="h-4 w-4" />}
                >
                  যোগাযোগ করুন
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleShareProfile}
                  leftIcon={
                    sharedCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )
                  }
                >
                  {sharedCopied ? "লিংক কপি হয়েছে" : "প্রোফাইল শেয়ার করুন"}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* ২. দুই-কলাম লেআউট (বাম: বিস্তারিত, ডান: স্টিকি সাইডবার) */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* বাম কলাম (মূল তথ্য) */}
          <div className="lg:col-span-8 space-y-6">
            {/* পরিচিতি */}
            <Card hoverLift={false} padding="lg">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                পরিচিতি
              </h2>
              <p className="mt-3 text-base text-[#57534E] font-bangla leading-relaxed">
                {detail.detailedBio}
              </p>
            </Card>

            {/* দক্ষতা ও সেবা */}
            <Card hoverLift={false} padding="lg">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                দক্ষতা ও সেবা
              </h2>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {farmer.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 rounded-xl bg-green-50 border border-green-600/20 px-4 py-3 text-sm sm:text-base font-semibold text-green-700 font-bangla"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* কাজের অভিজ্ঞতা — টাইমলাইন */}
            <Card hoverLift={false} padding="lg">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                কাজের অভিজ্ঞতা
              </h2>

              <ol className="mt-6 relative border-l-2 border-green-100 ml-3 space-y-7">
                {detail.experienceTimeline.map((item, idx) => (
                  <li key={idx} className="pl-6 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-green-600 ring-4 ring-green-100"
                    />
                    <p className="text-sm sm:text-base font-bold text-[#1A1A1A] font-bangla bn-num">
                      {item.period} | {item.role} | {item.location}
                    </p>
                    <p className="mt-1.5 text-sm text-[#57534E] font-bangla leading-relaxed">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </Card>

            {/* সার্টিফিকেট / প্রশিক্ষণ */}
            <Card hoverLift={false} padding="lg">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                সার্টিফিকেট ও প্রশিক্ষণ
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detail.certificates.map((cert, idx) => (
                  <div
                    key={cert.title + idx}
                    className="flex items-start gap-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] p-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FEF9C3] text-[#854D0E]">
                      {idx === 0 ? (
                        <GraduationCap className="h-6 w-6" />
                      ) : (
                        <Award className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#1A1A1A] font-bangla">
                        {cert.title}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm text-[#57534E] font-bangla">
                        {cert.issuer}
                      </p>
                      <Badge variant="green" className="mt-2 bn-num">
                        সন: {cert.year}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* রিভিউ ও রেটিং */}
            <Card hoverLift={false} padding="lg">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                রিভিউ ও রেটিং
              </h2>

              {/* গড় রেটিং কার্ড */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] p-5">
                <div className="flex flex-col items-center sm:items-start sm:pr-6 sm:border-r sm:border-[#E5E0D8]">
                  <span className="text-4xl font-bold text-green-600 bn-num leading-none">
                    {formatBnRating(farmer.rating)}
                  </span>
                  <div className="mt-2 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#EAB308] text-[#EAB308]"
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-[#57534E] font-bangla bn-num">
                    মোট {toBnDigits(farmer.totalReviews)}টি যাচাইকৃত রিভিউ
                  </p>
                </div>

                <div className="flex-1 space-y-1.5 text-xs font-bangla bn-num">
                  {[
                    { stars: "৫ তারকা", pct: 86 },
                    { stars: "৪ তারকা", pct: 11 },
                    { stars: "৩ তারকা", pct: 3 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="w-14 text-[#57534E] shrink-0">
                        {row.stars}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E0D8]">
                        <div
                          className="h-full rounded-full bg-[#EAB308]"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-[#1A1A1A] font-semibold">
                        {toBnDigits(row.pct)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ৩টি রিভিউ কার্ড */}
              <div className="mt-5 space-y-4">
                {detail.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl bg-white border border-[#E5E0D8] p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar alt={review.reviewerName} size="sm" />
                        <div>
                          <p className="text-sm sm:text-base font-bold text-[#1A1A1A] font-bangla">
                            {review.reviewerName}
                          </p>
                          <p className="text-xs text-[#57534E] font-bangla">
                            {review.reviewerLocation}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="inline-flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < Math.round(review.rating)
                                  ? "fill-[#EAB308] text-[#EAB308]"
                                  : "text-[#E5E0D8]"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-0.5 text-xs text-[#57534E] font-bangla bn-num">
                          {review.date}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm sm:text-base text-[#57534E] font-bangla leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ডান কলাম (স্টিকি সাইডবার) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            {/* প্রাইসিং ও বুকিং কার্ড (হালকা সবুজ আভা) */}
            <Card
              hoverLift={false}
              padding="lg"
              className="bg-green-50 border-green-600/30 shadow-sm"
            >
              <div className="pb-4 border-b border-green-600/15">
                <p className="text-sm font-semibold text-green-700 font-bangla">
                  দৈনিক মজুরি
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold text-green-600 bn-num">
                    {formatBDT(farmer.dailyWage)}
                  </span>
                  <span className="text-base font-semibold text-green-700 font-bangla">
                    /দিন
                  </span>
                </div>
              </div>

              {/* কাজের সময় ও সর্বনিম্ন বুকিং */}
              <ul className="my-5 space-y-3 text-sm text-[#1A1A1A] font-bangla">
                <li className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="bn-num">
                    কাজের সময়: <strong>{detail.workHours}</strong>
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="bn-num">
                    সর্বনিম্ন বুকিং:{" "}
                    <strong>{toBnDigits(detail.minBookingDays)} দিন</strong>
                  </span>
                </li>
              </ul>

              {/* প্রাইমারি যোগাযোগ বাটন */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => openModal("contact")}
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  যোগাযোগ করুন
                </Button>

                {/* ফোন নম্বর লুকানো + "নম্বর দেখুন" রিভিল বক্স */}
                <div className="rounded-2xl bg-white border border-green-600/20 p-3.5">
                  <p className="text-xs font-medium text-[#57534E] font-bangla">
                    সরাসরি মোবাইল নম্বর
                  </p>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span className="text-base font-bold text-[#1A1A1A] font-english tracking-wide">
                      {phoneRevealed ? farmer.phone : maskPhone(farmer.phone)}
                    </span>

                    {!phoneRevealed ? (
                      <button
                        type="button"
                        aria-label="মোবাইল নম্বর দেখুন"
                        onClick={() => setPhoneRevealed(true)}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-green-100 px-3.5 py-1.5 text-xs font-bold text-green-700 hover:bg-green-600 hover:text-white active:scale-95 font-bangla transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>নম্বর দেখুন</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          aria-label="নম্বর কপি করুন"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D8] text-[#57534E] hover:border-green-600 hover:text-green-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                        >
                          {phoneCopied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <a
                          href={`tel:${farmer.phone.replace(/-/g, "")}`}
                          className="inline-flex min-h-9 items-center gap-1 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white font-bangla hover:bg-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>কল</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* সেকেন্ডারি বুকিং বাটন */}
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={() => openModal("booking")}
                  leftIcon={<Calendar className="h-5 w-5" />}
                  className="bg-white"
                >
                  বুকিং করুন
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </section>

      {/* ৩. সম্পর্কিত কৃষকগণ (৩টি কার্ড) */}
      <section className="max-w-6xl mx-auto px-4 mt-16 md:mt-20">
        <AlponaDivider className="mb-8" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="green">আরও দক্ষ কৃষক</Badge>
            <h2 className="mt-2.5 text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-bangla">
              {hasSameDistrictRelated
                ? `${farmer.location.district} জেলার আরও কৃষক`
                : `${farmer.location.district} ও সমধর্মী কাজের আরও কৃষক`}
            </h2>
          </div>
          <Link
            href={`/kishok?district=${encodeURIComponent(farmer.location.district)}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 hover:underline font-bangla focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <span>সব কৃষক দেখুন</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedFarmers.map((item) => (
            <FarmerCard
              key={item.id}
              farmer={item}
              onContact={(f) => setRelatedContactFarmer(f)}
            />
          ))}
        </div>
      </section>

      {/* দুই-ধাপের বুকিং ও যোগাযোগ মডাল */}
      <BookingModal
        isOpen={bookingModalOpen}
        farmer={farmer}
        intent={modalIntent}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* সম্পর্কিত কৃষকের দ্রুত যোগাযোগ মডাল */}
      <FarmerQuickViewModal
        farmer={relatedContactFarmer}
        highlightContact
        onClose={() => setRelatedContactFarmer(null)}
      />
    </div>
  );
}
