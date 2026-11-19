"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Users,
} from "lucide-react";
import { KishokEmptyIllustration } from "@/components/kishok/KishokEmptyIllustration";
import { LandownerCard } from "@/components/landowners/LandownerCard";
import {
  LandownerFilterBar,
  type LandownerFilterValues,
} from "@/components/landowners/LandownerFilterBar";
import { PostNeedModal } from "@/components/landowners/PostNeedModal";
import { AlponaDivider } from "@/components/ui/AlponaDivider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { landowners as initialLandowners } from "@/data/landowners";
import { formatBnNumber } from "@/lib/bn";
import type {
  Landowner,
  LandownerServiceType,
  LandownerSortOption,
} from "@/types";

const PAGE_SIZE = 6;

const VALID_SERVICES: ("" | LandownerServiceType)[] = [
  "",
  "শ্রমিক প্রয়োজন",
  "জমি ভাড়া",
  "যন্ত্রপাতি ভাড়া",
];
const VALID_SORTS: LandownerSortOption[] = [
  "newest",
  "budget_desc",
  "budget_asc",
];

/**
 * /jomir-malik — জমির মালিক তালিকা ও চাহিদা পোস্ট ডিরেক্টরি (Phase 3)
 * /kishok পেজের মতো একই লেআউট: হেডার, স্টিকি ফিল্টার বার, গ্রিড, পেজিনেশন ও "পোস্ট করুন" মডাল
 */
export function JomirMalikDirectoryClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [landownerList, setLandownerList] =
    useState<Landowner[]>(initialLandowners);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [postModalOpen, setPostModalOpen] = useState(false);

  const rawService = (searchParams.get("service") ?? "") as
    | ""
    | LandownerServiceType;
  const rawSort = (searchParams.get("sort") ?? "newest") as LandownerSortOption;

  const filters: LandownerFilterValues = {
    q: searchParams.get("q") ?? "",
    district: searchParams.get("district") ?? "",
    service: VALID_SERVICES.includes(rawService) ? rawService : "",
    crop: searchParams.get("crop") ?? "",
    sort: VALID_SORTS.includes(rawSort) ? rawSort : "newest",
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const updateFilters = useCallback(
    (patch: Partial<LandownerFilterValues>) => {
      const next: LandownerFilterValues = { ...filters, ...patch };
      const params = new URLSearchParams();
      if (next.q.trim()) params.set("q", next.q);
      if (next.district) params.set("district", next.district);
      if (next.service) params.set("service", next.service);
      if (next.crop) params.set("crop", next.crop);
      if (next.sort && next.sort !== "newest") params.set("sort", next.sort);

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      setVisibleCount(PAGE_SIZE);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.q, filters.district, filters.service, filters.crop, filters.sort, pathname, router]
  );

  const handleReset = useCallback(() => {
    router.replace(pathname, { scroll: false });
    setVisibleCount(PAGE_SIZE);
  }, [pathname, router]);

  const handlePostCreated = (entry: Landowner) => {
    setLandownerList((prev) => [entry, ...prev]);
  };

  const filteredLandowners = useMemo(() => {
    const query = filters.q.trim().toLowerCase();

    const matched = landownerList.filter((owner) => {
      const matchesQuery =
        !query ||
        owner.name.toLowerCase().includes(query) ||
        owner.location.district.toLowerCase().includes(query) ||
        owner.location.upazila.toLowerCase().includes(query) ||
        owner.location.village.toLowerCase().includes(query) ||
        owner.serviceType.toLowerCase().includes(query) ||
        owner.cropType.some((c) => c.toLowerCase().includes(query));

      const matchesDistrict =
        !filters.district || owner.location.district === filters.district;

      const matchesService =
        !filters.service || owner.serviceType === filters.service;

      const matchesCrop =
        !filters.crop || owner.cropType.includes(filters.crop);

      return matchesQuery && matchesDistrict && matchesService && matchesCrop;
    });

    return [...matched].sort((a, b) => {
      switch (filters.sort) {
        case "budget_desc":
          return b.budget - a.budget;
        case "budget_asc":
          return a.budget - b.budget;
        case "newest":
        default: {
          const timeA = a.postedAt ? new Date(a.postedAt).getTime() : 0;
          const timeB = b.postedAt ? new Date(b.postedAt).getTime() : 0;
          return timeB - timeA;
        }
      }
    });
  }, [
    landownerList,
    filters.q,
    filters.district,
    filters.service,
    filters.crop,
    filters.sort,
  ]);

  const displayed = filteredLandowners.slice(0, visibleCount);
  const hasMore = visibleCount < filteredLandowners.length;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* পেজ হেডার সেকশন */}
      <section className="bg-[#FAF7F2] pt-8 pb-10 md:pt-12 md:pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* ব্রেডক্রাম্ব: হোম / জমির মালিক */}
          <nav
            aria-label="ব্রেডক্রাম্ব"
            className="flex items-center gap-1.5 text-sm text-[#57534E] font-bangla"
          >
            <Link
              href="/"
              className="hover:text-green-600 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              হোম
            </Link>
            <ChevronRight className="h-4 w-4 text-[#57534E]/60" />
            <span className="font-semibold text-green-600" aria-current="page">
              জমির মালিক
            </span>
          </nav>

          {/* শিরোনাম + মোট সংখ্যা চিপ + "পোস্ট করুন" সবুজ বাটন */}
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#1A1A1A] font-bangla leading-tight">
                জমির মালিকগণ
              </h1>
              <p className="mt-2.5 text-base sm:text-lg text-[#57534E] font-bangla">
                শ্রমিক প্রয়োজন, জমি ভাড়া ও যন্ত্রপাতি ভাড়ার সরাসরি চাহিদা
                দেখুন এবং যোগাযোগ করুন
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Badge
                variant="earth"
                className="px-4 py-2.5 text-sm font-bold bn-num shadow-sm"
                icon={<Users className="h-4 w-4 text-green-600" />}
              >
                মোট {formatBnNumber(filteredLandowners.length)}টি পোস্ট
              </Badge>

              <Button
                variant="primary"
                size="md"
                onClick={() => setPostModalOpen(true)}
                leftIcon={<PlusCircle className="h-5 w-5" />}
              >
                পোস্ট করুন
              </Button>
            </div>
          </div>

          <AlponaDivider className="mt-6 justify-start" />
        </div>
      </section>

      {/* স্টিকি ফিল্টার বার */}
      <LandownerFilterBar
        values={filters}
        totalResults={filteredLandowners.length}
        onChange={updateFilters}
        onReset={handleReset}
      />

      {/* কার্ড গ্রিড ও পেজিনেশন */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          {isInitialLoading ? (
            <LoadingSkeleton
              variant="farmer-grid"
              count={6}
              className="xl:grid-cols-3"
            />
          ) : displayed.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayed.map((owner, index) => (
                  <motion.div
                    key={owner.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min((index % PAGE_SIZE) * 0.06, 0.4),
                      ease: "easeOut",
                    }}
                    className="h-full"
                  >
                    <LandownerCard landowner={owner} />
                  </motion.div>
                ))}
              </div>

              {/* পেজিনেশন */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="text-sm text-[#57534E] font-bangla bn-num">
                  মোট{" "}
                  <strong className="text-[#1A1A1A]">
                    {formatBnNumber(filteredLandowners.length)}
                  </strong>{" "}
                  টির মধ্যে{" "}
                  <strong className="text-green-600">
                    {formatBnNumber(displayed.length)}
                  </strong>{" "}
                  টি চাহিদা দেখানো হচ্ছে
                </p>

                {hasMore && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() =>
                      setVisibleCount((prev) => prev + PAGE_SIZE)
                    }
                    rightIcon={<ChevronDown className="h-5 w-5" />}
                  >
                    আরও দেখুন
                  </Button>
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-white border border-dashed border-[#E5E0D8] px-6 py-14 text-center shadow-sm"
            >
              <KishokEmptyIllustration />
              <h2 className="mt-5 text-2xl font-bold text-[#1A1A1A] font-bangla">
                কোনো চাহিদা পাওয়া যায়নি
              </h2>
              <p className="mt-2 max-w-md mx-auto text-sm sm:text-base text-[#57534E] font-bangla">
                আপনার বাছাইকৃত জেলা, ফসল বা চাহিদার ধরনের সাথে কোনো পোস্ট
                মেলেনি। ফিল্টার পরিবর্তন করে চেষ্টা করুন অথবা নতুন চাহিদা পোস্ট
                করুন।
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button variant="secondary" size="md" onClick={handleReset}>
                  ফিল্টার রিসেট করুন
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setPostModalOpen(true)}
                  leftIcon={<PlusCircle className="h-4 w-4" />}
                >
                  পোস্ট করুন
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* "আপনার চাহিদা পোস্ট করুন" মডাল */}
      <PostNeedModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        onCreated={handlePostCreated}
      />
    </div>
  );
}
