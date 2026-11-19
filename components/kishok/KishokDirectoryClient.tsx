"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Users } from "lucide-react";
import { FarmerCard } from "@/components/farmers/FarmerCard";
import { FarmerQuickViewModal } from "@/components/farmers/FarmerQuickViewModal";
import {
  FarmerFilterBar,
  type FarmerFilterValues,
} from "@/components/kishok/FarmerFilterBar";
import { KishokEmptyIllustration } from "@/components/kishok/KishokEmptyIllustration";
import { AlponaDivider } from "@/components/ui/AlponaDivider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { farmers } from "@/data/farmers";
import { formatBnNumber } from "@/lib/bn";
import type { Farmer, FarmerSortOption, WageRangeFilter } from "@/types";

const PAGE_SIZE = 8;

const VALID_WAGES: WageRangeFilter[] = ["", "under500", "500to1000", "above1000"];
const VALID_SORTS: FarmerSortOption[] = [
  "rating",
  "wage_asc",
  "experience",
  "newest",
];

/**
 * /kishok পেজের মূল ইন্টারেক্টিভ ডিরেক্টরি কম্পোনেন্ট
 * - URL searchParams (q, district, skill, wage, sort) রিফ্রেশেও সংরক্ষিত থাকে
 * - প্রথম লোডে ৮০০ms স্কেলেটন (৬টি কার্ড)
 * - রেসপন্সিভ গ্রিড (১/২/৩/৪ কলাম) + ফ্রেমার মোশন স্ট্যাগার অ্যানিমেশন
 * - "আরও দেখুন" পেজিনেশন (প্রতি ধাপে ৮ জন)
 */
export function KishokDirectoryClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL প্যারাম থেকে প্রাথমিক ফিল্টার পড়া
  const rawWage = (searchParams.get("wage") ?? "") as WageRangeFilter;
  const rawSort = (searchParams.get("sort") ?? "rating") as FarmerSortOption;

  const filters: FarmerFilterValues = {
    q: searchParams.get("q") ?? "",
    district: searchParams.get("district") ?? "",
    skill: searchParams.get("skill") ?? "",
    wage: VALID_WAGES.includes(rawWage) ? rawWage : "",
    sort: VALID_SORTS.includes(rawSort) ? rawSort : "rating",
  };

  // প্রথম লোডে ৮০০ মিলিসেকেন্ডের স্কেলেটন প্রদর্শন
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [highlightContact, setHighlightContact] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // ফিল্টার পরিবর্তন হলে URL searchParams আপডেট ও পেজিনেশন রিসেট
  const updateFilters = useCallback(
    (patch: Partial<FarmerFilterValues>) => {
      const next: FarmerFilterValues = {
        ...filters,
        ...patch,
      };
      const params = new URLSearchParams();
      if (next.q.trim()) params.set("q", next.q);
      if (next.district) params.set("district", next.district);
      if (next.skill) params.set("skill", next.skill);
      if (next.wage) params.set("wage", next.wage);
      if (next.sort && next.sort !== "rating") params.set("sort", next.sort);

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
      setVisibleCount(PAGE_SIZE);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.q, filters.district, filters.skill, filters.wage, filters.sort, pathname, router]
  );

  const handleResetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
    setVisibleCount(PAGE_SIZE);
  }, [pathname, router]);

  // ফিল্টারিং ও সর্টিং লজিক
  const filteredFarmers = useMemo(() => {
    const query = filters.q.trim().toLowerCase();

    const matched = farmers.filter((farmer) => {
      const matchesQuery =
        !query ||
        farmer.name.toLowerCase().includes(query) ||
        farmer.location.district.toLowerCase().includes(query) ||
        farmer.location.upazila.toLowerCase().includes(query) ||
        farmer.location.village.toLowerCase().includes(query) ||
        farmer.skills.some((s) => s.toLowerCase().includes(query));

      const matchesDistrict =
        !filters.district || farmer.location.district === filters.district;

      const matchesSkill =
        !filters.skill ||
        farmer.skills.some(
          (s) => s.includes(filters.skill) || filters.skill.includes(s)
        );

      let matchesWage = true;
      if (filters.wage === "under500") {
        matchesWage = farmer.dailyWage < 500;
      } else if (filters.wage === "500to1000") {
        matchesWage = farmer.dailyWage >= 500 && farmer.dailyWage <= 1000;
      } else if (filters.wage === "above1000") {
        matchesWage = farmer.dailyWage > 1000;
      }

      return matchesQuery && matchesDistrict && matchesSkill && matchesWage;
    });

    // সাজানো (Sort)
    return [...matched].sort((a, b) => {
      switch (filters.sort) {
        case "wage_asc":
          return a.dailyWage - b.dailyWage;
        case "experience":
          return b.experienceYears - a.experienceYears;
        case "newest":
          return (
            new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
          );
        case "rating":
        default:
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.totalReviews - a.totalReviews;
      }
    });
  }, [filters.q, filters.district, filters.skill, filters.wage, filters.sort]);

  const displayedFarmers = filteredFarmers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFarmers.length;

  const openModal = (farmer: Farmer, focusContact: boolean) => {
    setHighlightContact(focusContact);
    setSelectedFarmer(farmer);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* পেজ হেডার সেকশন (হালকা ক্রিম ব্যাকগ্রাউন্ড) */}
      <section className="bg-[#FAF7F2] pt-8 pb-10 md:pt-12 md:pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* ব্রেডক্রাম্ব: হোম / কৃষক */}
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
            <ChevronRight className="h-4 w-4 text-[#57534E]/60" aria-hidden="true" />
            <span className="font-semibold text-green-600" aria-current="page">
              কৃষক
            </span>
          </nav>

          {/* শিরোনাম ও মোট কৃষক সংখ্যা চিপ */}
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#1A1A1A] font-bangla leading-tight">
                আমাদের কৃষকগণ
              </h1>
              <p className="mt-2.5 text-base sm:text-lg text-[#57534E] font-bangla">
                ৬৪ জেলার যাচাইকৃত কৃষকদের তালিকা — সরাসরি যোগাযোগ করুন
              </p>
            </div>

            <div className="shrink-0">
              <Badge
                variant="green"
                className="px-4 py-2.5 text-sm font-bold bn-num shadow-sm"
                icon={<Users className="h-4 w-4 text-green-600" />}
              >
                মোট {formatBnNumber(filteredFarmers.length)} জন কৃষক
              </Badge>
            </div>
          </div>

          <AlponaDivider className="mt-6 justify-start" />
        </div>
      </section>

      {/* স্টিকি ফিল্টার বার (ডেস্কটপ) ও মোবাইল ড্রয়ার */}
      <FarmerFilterBar
        values={filters}
        totalResults={filteredFarmers.length}
        onChange={updateFilters}
        onReset={handleResetFilters}
      />

      {/* কৃষক কার্ড গ্রিড, স্কেলেটন, খালি অবস্থা ও পেজিনেশন */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          {isInitialLoading ? (
            <LoadingSkeleton variant="farmer-grid" count={6} />
          ) : displayedFarmers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedFarmers.map((farmer, index) => (
                  <motion.div
                    key={farmer.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min((index % PAGE_SIZE) * 0.06, 0.45),
                      ease: "easeOut",
                    }}
                    className="h-full"
                  >
                    <FarmerCard
                      farmer={farmer}
                      onContact={(item) => openModal(item, true)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* পেজিনেশন: "আরও দেখুন" (প্রতি ধাপে ৮ জন) */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="text-sm text-[#57534E] font-bangla bn-num">
                  মোট{" "}
                  <strong className="text-[#1A1A1A]">
                    {formatBnNumber(filteredFarmers.length)}
                  </strong>{" "}
                  জনের মধ্যে{" "}
                  <strong className="text-green-600">
                    {formatBnNumber(displayedFarmers.length)}
                  </strong>{" "}
                  জন কৃষক দেখানো হচ্ছে
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
            /* খালি অবস্থা (লটি-মুক্ত কাস্টম SVG ইলাস্ট্রেশনসহ) */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-white border border-dashed border-[#E5E0D8] px-6 py-14 text-center shadow-sm"
            >
              <KishokEmptyIllustration />
              <h2 className="mt-5 text-2xl font-bold text-[#1A1A1A] font-bangla">
                কোনো কৃষক পাওয়া যায়নি
              </h2>
              <p className="mt-2 max-w-md mx-auto text-sm sm:text-base text-[#57534E] font-bangla">
                আপনার বাছাইকৃত জেলা, সেবা বা দৈনিক মজুরির সীমার সাথে কোনো কৃষকের
                প্রোফাইল মেলেনি। অনুগ্রহ করে ফিল্টার পরিবর্তন করে চেষ্টা করুন।
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleResetFilters}
                >
                  ফিল্টার রিসেট করুন
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* বিস্তারিত ও সরাসরি যোগাযোগের মডাল */}
      <FarmerQuickViewModal
        farmer={selectedFarmer}
        highlightContact={highlightContact}
        onClose={() => setSelectedFarmer(null)}
      />
    </div>
  );
}
