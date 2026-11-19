"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Banknote,
  CheckCircle2,
  LandPlot,
  MapPin,
  Phone,
  PlusCircle,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { BANGLADESH_DISTRICTS } from "@/data/districts";
import { formatBnDate, toBnDigits } from "@/lib/bn";
import { cn } from "@/lib/utils";
import type { Landowner, LandownerServiceType } from "@/types";

interface PostNeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (landowner: Landowner) => void;
}

interface PostFormErrors {
  name?: string;
  district?: string;
  area?: string;
  budget?: string;
  phone?: string;
}

const SERVICE_TYPES: LandownerServiceType[] = [
  "শ্রমিক প্রয়োজন",
  "জমি ভাড়া",
  "যন্ত্রপাতি ভাড়া",
];

const CROP_OPTIONS = [
  "ধান",
  "পাট",
  "শাকসবজি",
  "আলু",
  "গম",
  "সরিষা",
  "ভুট্টা",
];

/**
 * জমির মালিকদের জন্য "আপনার চাহিদা পোস্ট করুন" মডাল ফর্ম
 */
export function PostNeedModal({
  isOpen,
  onClose,
  onCreated,
}: PostNeedModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [serviceType, setServiceType] =
    useState<LandownerServiceType>("শ্রমিক প্রয়োজন");
  const [landSize, setLandSize] = useState("১০");
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["ধান"]);
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<PostFormErrors>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const toggleCrop = (crop: string) => {
    setSelectedCrops((prev) =>
      prev.includes(crop)
        ? prev.length > 1
          ? prev.filter((c) => c !== crop)
          : prev
        : [...prev, crop]
    );
  };

  const validate = (): boolean => {
    const next: PostFormErrors = {};
    if (!name.trim()) next.name = "নাম লিখুন";
    if (!district) next.district = "জেলা নির্বাচন করুন";
    if (!area.trim()) next.area = "উপজেলা বা গ্রামের নাম লিখুন";

    const parsedBudget = Number(budget);
    if (!budget.trim() || Number.isNaN(parsedBudget) || parsedBudget <= 0) {
      next.budget = "সঠিক বাজেট লিখুন";
    }

    const cleanedPhone = phone.replace(/[\s-]/g, "");
    if (!/^\d{11}$/.test(cleanedPhone)) {
      next.phone = "সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanedPhone = phone.replace(/[\s-]/g, "");
    const formattedPhone = `${cleanedPhone.slice(0, 5)}-${cleanedPhone.slice(5)}`;
    const now = new Date();
    const numericLand = landSize.trim() ? toBnDigits(landSize.trim()) : "১০";
    const finalLandSize = numericLand.includes("বিঘা")
      ? numericLand
      : `${numericLand} বিঘা`;

    const newEntry: Landowner = {
      id: `landowner-user-${Date.now()}`,
      name: name.trim(),
      location: {
        village: area.trim(),
        upazila: area.trim(),
        district,
      },
      avatar: "/images/farmers/farmer-12.jpg",
      landSize: finalLandSize,
      cropType: selectedCrops,
      serviceType,
      budget: Number(budget),
      budgetUnit: serviceType === "জমি ভাড়া" ? "/মৌসুম" : "/দিন",
      verified: false,
      phone: formattedPhone,
      bio:
        bio.trim() ||
        `${district} জেলায় ${finalLandSize} জমিতে ${selectedCrops.join(", ")} চাষের জন্য ${serviceType}। আগ্রহীরা সরাসরি ফোনে যোগাযোগ করুন।`,
      postedDate: formatBnDate(now),
      postedAt: now.toISOString().split("T")[0],
    };

    onCreated(newEntry);
    toast.success("সফলভাবে পাঠানো হয়েছে");
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setName("");
    setDistrict("");
    setArea("");
    setServiceType("শ্রমিক প্রয়োজন");
    setLandSize("১০");
    setSelectedCrops(["ধান"]);
    setBudget("");
    setPhone("");
    setBio("");
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="post-need-modal-title"
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
            className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] shadow-2xl"
          >
            {/* হেডার */}
            <div className="flex items-center justify-between bg-green-600 px-6 py-5 text-white">
              <div className="flex items-center gap-2.5">
                <PlusCircle className="h-6 w-6 text-[#EAB308] shrink-0" />
                <div>
                  <h2
                    id="post-need-modal-title"
                    className="text-xl font-bold font-bangla"
                  >
                    আপনার চাহিদা পোস্ট করুন
                  </h2>
                  <p className="text-xs text-white/85 font-bangla">
                    কৃষক, জমি ভাড়া বা যন্ত্রপাতি ভাড়ার বিজ্ঞপ্তি প্রকাশ করুন
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="বন্ধ করুন"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] font-bangla">
                    আপনার চাহিদা পোস্ট হয়েছে
                  </h3>
                  <p className="text-sm sm:text-base text-[#57534E] font-bangla">
                    আপনার পোস্টটি জমির মালিকদের তালিকায় যুক্ত করা হয়েছে।
                    আগ্রহী কৃষক ও সেবাদাতারা শীঘ্রই যোগাযোগ করবেন।
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={resetAndClose}
                    >
                      ঠিক আছে
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <Input
                    label="আপনার নাম *"
                    name="post-name"
                    placeholder="যেমন: মোঃ মোস্তাফিজুর রহমান"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    error={errors.name}
                    leftIcon={<User className="h-4 w-4" />}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="জেলা *"
                      name="post-district"
                      placeholder="জেলা নির্বাচন করুন"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        if (errors.district)
                          setErrors((p) => ({ ...p, district: undefined }));
                      }}
                      error={errors.district}
                      options={BANGLADESH_DISTRICTS.map((d) => ({
                        value: d,
                        label: d,
                      }))}
                    />
                    <Input
                      label="উপজেলা / গ্রাম *"
                      name="post-area"
                      placeholder="যেমন: ত্রিশাল"
                      value={area}
                      onChange={(e) => {
                        setArea(e.target.value);
                        if (errors.area) setErrors((p) => ({ ...p, area: undefined }));
                      }}
                      error={errors.area}
                      leftIcon={<MapPin className="h-4 w-4" />}
                    />
                  </div>

                  {/* চাহিদার ধরন */}
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-[#1A1A1A] font-bangla">
                      চাহিদার ধরন *
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {SERVICE_TYPES.map((type) => {
                        const active = serviceType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            aria-label={type}
                            aria-pressed={active}
                            onClick={() => setServiceType(type)}
                            className={cn(
                              "min-h-11 rounded-xl border px-2.5 py-2 text-xs sm:text-sm font-semibold font-bangla transition-all active:scale-95 cursor-pointer text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                              active
                                ? "bg-green-600 text-white border-green-600 shadow-sm"
                                : "bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-green-600/50"
                            )}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label={
                        serviceType === "জমি ভাড়া"
                          ? "বাজেট / ভাড়া (টাকা/মৌসুম) *"
                          : "বাজেট / মজুরি (টাকা/দিন) *"
                      }
                      name="post-budget"
                      type="number"
                      min="100"
                      placeholder={
                        serviceType === "জমি ভাড়া" ? "15000" : "700"
                      }
                      value={budget}
                      onChange={(e) => {
                        setBudget(e.target.value);
                        if (errors.budget)
                          setErrors((p) => ({ ...p, budget: undefined }));
                      }}
                      error={errors.budget}
                      leftIcon={<Banknote className="h-4 w-4" />}
                    />
                    <Input
                      label="জমির পরিমাণ (বিঘা)"
                      name="post-land-size"
                      placeholder="যেমন: ১২ বিঘা"
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                      leftIcon={<LandPlot className="h-4 w-4" />}
                    />
                  </div>

                  {/* ফসলের ধরন */}
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-[#1A1A1A] font-bangla">
                      ফসলের ধরন
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CROP_OPTIONS.map((crop) => {
                        const selected = selectedCrops.includes(crop);
                        return (
                          <button
                            key={crop}
                            type="button"
                            aria-label={crop}
                            aria-pressed={selected}
                            onClick={() => toggleCrop(crop)}
                            className={cn(
                              "min-h-9 rounded-full border px-3.5 py-1 text-xs font-semibold font-bangla transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                              selected
                                ? "bg-green-100 border-green-600 text-green-700"
                                : "bg-white border-[#E5E0D8] text-[#57534E] hover:border-green-600/50"
                            )}
                          >
                            {crop}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Input
                    label="মোবাইল নম্বর *"
                    name="post-phone"
                    type="tel"
                    placeholder="01712-345678"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    error={errors.phone}
                    className="font-english"
                    helperText="ইংরেজি সংখ্যায় ১১ ডিজিটের মোবাইল নম্বর লিখুন"
                    leftIcon={<Phone className="h-4 w-4" />}
                  />

                  <div className="space-y-1.5">
                    <label
                      htmlFor="post-bio"
                      className="block text-sm font-semibold text-[#1A1A1A] font-bangla"
                    >
                      বিস্তারিত বিবরণ (ঐচ্ছিক)
                    </label>
                    <textarea
                      id="post-bio"
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="কাজের ধরন, সময়কাল বা অন্যান্য শর্ত সংক্ষেপে লিখুন..."
                      className="w-full rounded-xl bg-white border border-[#E5E0D8] px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#57534E]/70 font-bangla focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 resize-none"
                    />
                  </div>

                  <div className="pt-1 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      onClick={onClose}
                    >
                      বাতিল
                    </Button>
                    <Button type="submit" variant="primary" size="md" fullWidth>
                      পোস্ট প্রকাশ করুন
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
