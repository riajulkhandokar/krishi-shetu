import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FarmerDetailClient } from "@/components/kishok/FarmerDetailClient";
import { getFarmerDetail, getRelatedFarmers } from "@/data/farmerDetails";
import { farmers } from "@/data/farmers";
import { formatBDT } from "@/lib/bn";

interface FarmerDetailPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return farmers.map((farmer) => ({ id: farmer.id }));
}

export function generateMetadata({ params }: FarmerDetailPageProps): Metadata {
  const farmer = farmers.find((f) => f.id === params.id);
  if (!farmer) {
    return { title: "কৃষক পাওয়া যায়নি — কৃষি সেতু" };
  }
  return {
    title: `${farmer.name} (${farmer.location.district}) — কৃষি সেতু`,
    description: `${farmer.name} — ${farmer.skills.join(", ")}। দৈনিক মজুরি ${formatBDT(farmer.dailyWage, "/দিন")}। সরাসরি যোগাযোগ ও বুকিং করুন কৃষি সেতুতে।`,
  };
}

/**
 * /kishok/[id] — কৃষকের বিস্তারিত প্রোফাইল পেজ (Phase 3)
 */
export default function FarmerDetailPage({ params }: FarmerDetailPageProps) {
  const farmer = farmers.find((f) => f.id === params.id);
  if (!farmer) {
    notFound();
  }

  const detail = getFarmerDetail(farmer);
  const relatedFarmers = getRelatedFarmers(farmer, 3);

  return (
    <FarmerDetailClient
      farmer={farmer}
      detail={detail}
      relatedFarmers={relatedFarmers}
    />
  );
}
