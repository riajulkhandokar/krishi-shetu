"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Home,
  LayoutDashboard,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Phone,
  Sprout,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { BANGLADESH_DISTRICTS, SKILL_CATEGORIES } from "@/data/districts";
import { formatBDT, toBnDigits } from "@/lib/bn";
import { cn } from "@/lib/utils";

type RegisterRole = "farmer" | "landowner";

interface Step2Errors {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface Step3Errors {
  district?: string;
  upazila?: string;
  village?: string;
  skills?: string;
  dailyWage?: string;
}

const STEPS = [
  { number: 1, title: "ভূমিকা নির্বাচন" },
  { number: 2, title: "ব্যক্তিগত তথ্য" },
  { number: 3, title: "ঠিকানা ও দক্ষতা" },
];

function countDigits(value: string): number {
  const bnToEn: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  return value
    .replace(/[০-৯]/g, (d) => bnToEn[d] ?? d)
    .replace(/\D/g, "").length;
}

/**
 * কৃষি সেতু ৩-ধাপের নিবন্ধন ফর্ম (/register)
 * ধাপ ১: ভূমিকা নির্বাচন ("আমি কৃষক" / "আমি জমির মালিক")
 * ধাপ ২: ব্যক্তিগত তথ্য (নাম, মোবাইল, ইমেইল, পাসওয়ার্ড, পাসওয়ার্ড নিশ্চিত করুন)
 * ধাপ ৩: ঠিকানা ও দক্ষতা (জেলা, উপজেলা, গ্রাম, দক্ষতা, দৈনিক মজুরি — কেবল কৃষকের জন্য)
 */
export function RegisterClient() {
  const { register } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [completed, setCompleted] = useState(false);

  // ধাপ ১
  const [role, setRole] = useState<RegisterRole>("farmer");

  // ধাপ ২
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});

  // ধাপ ৩
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [village, setVillage] = useState("");
  const [skills, setSkills] = useState<string[]>(["ধান চাষ"]);
  const [dailyWage, setDailyWage] = useState("650");
  const [step3Errors, setStep3Errors] = useState<Step3Errors>({});

  // URL কোয়েরি (?role=landowner বা ?role=farmer) থেকে ভূমিকা প্রি-সিলেক্ট
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paramRole = params.get("role");
    if (paramRole === "landowner") {
      setRole("landowner");
    } else if (paramRole === "farmer") {
      setRole("farmer");
    }
  }, []);

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill]
    );
    if (step3Errors.skills) {
      setStep3Errors((prev) => ({ ...prev, skills: undefined }));
    }
  };

  const validateStep2 = (): boolean => {
    const next: Step2Errors = {};
    if (!name.trim()) next.name = "আপনার পূর্ণ নাম লিখুন";

    if (!phone.trim()) {
      next.phone = "মোবাইল নম্বর লিখুন";
    } else if (countDigits(phone) !== 11) {
      next.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন";
    }

    if (
      email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      next.email = "সঠিক ইমেইল ঠিকানা লিখুন";
    }

    if (!password.trim()) {
      next.password = "পাসওয়ার্ড লিখুন";
    } else if (password.trim().length < 6) {
      next.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }

    if (!confirmPassword.trim()) {
      next.confirmPassword = "পাসওয়ার্ড নিশ্চিত করুন";
    } else if (password !== confirmPassword) {
      next.confirmPassword = "পাসওয়ার্ড দুটি মেলেনি";
    }

    setStep2Errors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep3 = (): boolean => {
    const next: Step3Errors = {};
    if (!district) next.district = "জেলা নির্বাচন করুন";
    if (!upazila.trim()) next.upazila = "উপজেলার নাম লিখুন";
    if (!village.trim()) next.village = "গ্রামের নাম লিখুন";

    if (skills.length === 0) {
      next.skills = "কমপক্ষে একটি দক্ষতা নির্বাচন করুন";
    }

    if (role === "farmer") {
      const parsedWage = Number(dailyWage);
      if (!dailyWage.trim() || Number.isNaN(parsedWage) || parsedWage < 100) {
        next.dailyWage = "সঠিক দৈনিক মজুরি লিখুন";
      }
    }

    setStep3Errors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!validateStep2()) return;
      setStep(3);
    }
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    register({
      name: name.trim(),
      role,
      phone,
      email: email.trim(),
      district,
      upazila: upazila.trim(),
      village: village.trim(),
      skills,
      dailyWage: role === "farmer" ? Number(dailyWage) : 0,
    });

    toast.success("সফলভাবে পাঠানো হয়েছে — নিবন্ধন সম্পন্ন হয়েছে");
    setCompleted(true);
  };

  const progressPercent = completed ? 100 : Math.round((step / 3) * 100);

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#FAF7F2] px-4 py-12 md:py-16">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-2xl bg-white border border-[#E5E0D8] shadow-sm">
          {/* শীর্ষ হেডার ও প্রগ্রেস বার */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-6 text-white">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 border border-white/25">
                  <Leaf className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold font-bangla leading-snug">
                    নিবন্ধন করুন
                  </h1>
                  <p className="text-xs sm:text-sm text-white/85 font-bangla">
                    বিনামূল্যে আপনার কৃষি সেতু অ্যাকাউন্ট তৈরি করুন
                  </p>
                </div>
              </div>
              {!completed && (
                <span className="shrink-0 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs sm:text-sm font-bold font-bangla bn-num">
                  ধাপ {toBnDigits(step)} / {toBnDigits(3)}
                </span>
              )}
            </div>

            {/* প্রগ্রেস বার */}
            <div className="mt-5">
              <div
                className="h-2.5 w-full overflow-hidden rounded-full bg-white/20"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="নিবন্ধনের অগ্রগতি"
              >
                <motion.div
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-full rounded-full bg-[#EAB308]"
                />
              </div>

              {/* ৩ ধাপের সূচক */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {STEPS.map((item) => {
                  const isDone = completed || step > item.number;
                  const isCurrent = !completed && step === item.number;
                  return (
                    <div
                      key={item.number}
                      className={cn(
                        "flex min-w-0 items-center gap-1.5 text-xs font-bangla transition-opacity",
                        isDone || isCurrent ? "opacity-100" : "opacity-60"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold bn-num",
                          isDone
                            ? "bg-[#EAB308] text-[#1A1A1A]"
                            : isCurrent
                              ? "bg-white text-green-600"
                              : "bg-white/20 text-white"
                        )}
                      >
                        {isDone ? (
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          toBnDigits(item.number)
                        )}
                      </span>
                      <span className="truncate font-semibold">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ধাপসমূহের মূল কনটেন্ট */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {completed ? (
                /* সফলতার স্ক্রিন */
                <motion.div
                  key="register-success"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="py-4 text-center space-y-5"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                    <CheckCircle2 className="h-11 w-11" aria-hidden="true" />
                  </div>

                  <div>
                    <Badge variant="green" className="mb-2">
                      নিবন্ধন সফল
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-bangla">
                      স্বাগতম, {name}!
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[#57534E] font-bangla">
                      আপনার কৃষি সেতু অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। এখনই
                      ড্যাশবোর্ডে গিয়ে আপনার প্রোফাইল ও কাজ পরিচালনা করুন।
                    </p>
                  </div>

                  {/* সংক্ষিপ্ত সারসংক্ষেপ */}
                  <div className="mx-auto max-w-md rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] p-4 text-left space-y-2 text-sm font-bangla">
                    <div className="flex justify-between gap-2">
                      <span className="text-[#57534E]">ভূমিকা:</span>
                      <span className="font-bold text-green-600">
                        {role === "farmer" ? "কৃষক" : "জমির মালিক"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[#57534E]">ঠিকানা:</span>
                      <span className="font-semibold text-[#1A1A1A] text-right">
                        {village}, {upazila}, {district}
                      </span>
                    </div>
                    {role === "farmer" && (
                      <div className="flex justify-between gap-2">
                        <span className="text-[#57534E]">দৈনিক মজুরি:</span>
                        <span className="font-bold text-green-600 bn-num">
                          {formatBDT(Number(dailyWage) || 650, "/দিন")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      href="/dashboard"
                      leftIcon={
                        <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                      }
                      aria-label="ড্যাশবোর্ডে যান"
                    >
                      ড্যাশবোর্ডে যান
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      href="/"
                      leftIcon={<Home className="h-5 w-5" aria-hidden="true" />}
                      aria-label="হোমে ফিরুন"
                    >
                      হোমে ফিরুন
                    </Button>
                  </div>
                </motion.div>
              ) : step === 1 ? (
                /* ধাপ ১: ভূমিকা নির্বাচন */
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                      ধাপ ১: ভূমিকা নির্বাচন
                    </h2>
                    <p className="mt-1 text-sm text-[#57534E] font-bangla">
                      আপনি কৃষি সেতুতে কোন হিসেবে যুক্ত হতে চান তা বেছে নিন
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* কার্ড ১: আমি কৃষক */}
                    <button
                      type="button"
                      onClick={() => setRole("farmer")}
                      aria-pressed={role === "farmer"}
                      aria-label="আমি কৃষক"
                      className={cn(
                        "relative flex flex-col items-start rounded-2xl border-2 p-6 text-left transition-all duration-200 active:scale-95 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                        role === "farmer"
                          ? "border-green-600 bg-green-50 shadow-md"
                          : "border-[#E5E0D8] bg-white hover:border-green-600/50 hover:shadow-sm"
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl",
                            role === "farmer"
                              ? "bg-green-600 text-white"
                              : "bg-green-100 text-green-600"
                          )}
                        >
                          <Sprout className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full border-2",
                            role === "farmer"
                              ? "border-green-600 bg-green-600 text-white"
                              : "border-[#E5E0D8] bg-white"
                          )}
                        >
                          {role === "farmer" && (
                            <Check className="h-4 w-4" aria-hidden="true" />
                          )}
                        </span>
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-[#1A1A1A] font-bangla">
                        আমি কৃষক
                      </h3>
                      <p className="mt-1.5 text-sm text-[#57534E] font-bangla leading-relaxed">
                        কৃষি শ্রমিক, ধান চাষ, ফসল কাটা বা ট্রাক্টর সেবা দিয়ে
                        ন্যায্য দৈনিক মজুরিতে কাজ খুঁজছি।
                      </p>
                    </button>

                    {/* কার্ড ২: আমি জমির মালিক */}
                    <button
                      type="button"
                      onClick={() => setRole("landowner")}
                      aria-pressed={role === "landowner"}
                      aria-label="আমি জমির মালিক"
                      className={cn(
                        "relative flex flex-col items-start rounded-2xl border-2 p-6 text-left transition-all duration-200 active:scale-95 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                        role === "landowner"
                          ? "border-green-600 bg-green-50 shadow-md"
                          : "border-[#E5E0D8] bg-white hover:border-green-600/50 hover:shadow-sm"
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl",
                            role === "landowner"
                              ? "bg-green-600 text-white"
                              : "bg-[#FEF9C3] text-gold-600"
                          )}
                        >
                          <Users className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full border-2",
                            role === "landowner"
                              ? "border-green-600 bg-green-600 text-white"
                              : "border-[#E5E0D8] bg-white"
                          )}
                        >
                          {role === "landowner" && (
                            <Check className="h-4 w-4" aria-hidden="true" />
                          )}
                        </span>
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-[#1A1A1A] font-bangla">
                        আমি জমির মালিক
                      </h3>
                      <p className="mt-1.5 text-sm text-[#57534E] font-bangla leading-relaxed">
                        আমার জমির জন্য দক্ষ কৃষি শ্রমিক নিয়োগ, জমি ভাড়া বা
                        যন্ত্রপাতি ভাড়া নিতে চাই।
                      </p>
                    </button>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleNext}
                      rightIcon={
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      }
                      aria-label="পরবর্তী ধাপে যান"
                    >
                      পরবর্তী ধাপ
                    </Button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                /* ধাপ ২: ব্যক্তিগত তথ্য */
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                      ধাপ ২: ব্যক্তিগত তথ্য
                    </h2>
                    <p className="mt-1 text-sm text-[#57534E] font-bangla">
                      আপনার নাম, মোবাইল নম্বর ও নিরাপদ পাসওয়ার্ড দিন
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="নাম *"
                      name="reg-name"
                      placeholder="যেমন: মোঃ রহিম উদ্দিন"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (step2Errors.name)
                          setStep2Errors((p) => ({ ...p, name: undefined }));
                      }}
                      error={step2Errors.name}
                      leftIcon={<User className="h-4 w-4" aria-hidden="true" />}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="মোবাইল *"
                        name="reg-phone"
                        type="tel"
                        placeholder="০১XXXXXXXXX"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (step2Errors.phone)
                            setStep2Errors((p) => ({ ...p, phone: undefined }));
                        }}
                        error={step2Errors.phone}
                        helperText="১১ ডিজিট (যেমন: 01712-345678)"
                        leftIcon={
                          <Phone className="h-4 w-4" aria-hidden="true" />
                        }
                      />

                      <Input
                        label="ইমেইল (ঐচ্ছিক)"
                        name="reg-email"
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (step2Errors.email)
                            setStep2Errors((p) => ({ ...p, email: undefined }));
                        }}
                        error={step2Errors.email}
                        className="font-english"
                        leftIcon={
                          <Mail className="h-4 w-4" aria-hidden="true" />
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="পাসওয়ার্ড *"
                        name="reg-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="কমপক্ষে ৬ অক্ষর"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (step2Errors.password)
                            setStep2Errors((p) => ({
                              ...p,
                              password: undefined,
                            }));
                        }}
                        error={step2Errors.password}
                        leftIcon={
                          <Lock className="h-4 w-4" aria-hidden="true" />
                        }
                        rightSlot={
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            aria-label={
                              showPassword
                                ? "পাসওয়ার্ড লুকান"
                                : "পাসওয়ার্ড দেখুন"
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#57534E] hover:text-green-600 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                          </button>
                        }
                      />

                      <Input
                        label="পাসওয়ার্ড নিশ্চিত করুন *"
                        name="reg-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (step2Errors.confirmPassword)
                            setStep2Errors((p) => ({
                              ...p,
                              confirmPassword: undefined,
                            }));
                        }}
                        error={step2Errors.confirmPassword}
                        leftIcon={
                          <Lock className="h-4 w-4" aria-hidden="true" />
                        }
                        rightSlot={
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((p) => !p)}
                            aria-label={
                              showConfirmPassword
                                ? "নিশ্চিত পাসওয়ার্ড লুকান"
                                : "নিশ্চিত পাসওয়ার্ড দেখুন"
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#57534E] hover:text-green-600 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                          </button>
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={() => setStep(1)}
                      leftIcon={
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      }
                      aria-label="পূর্ববর্তী ধাপে ফিরুন"
                    >
                      পূর্ববর্তী
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleNext}
                      rightIcon={
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      }
                      aria-label="পরবর্তী ধাপে যান"
                    >
                      পরবর্তী ধাপ
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* ধাপ ৩: ঠিকানা ও দক্ষতা */
                <motion.form
                  key="step-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.22 }}
                  onSubmit={handleCompleteRegistration}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                      ধাপ ৩: ঠিকানা ও দক্ষতা
                    </h2>
                    <p className="mt-1 text-sm text-[#57534E] font-bangla">
                      আপনার এলাকার ঠিকানা এবং কৃষি কাজের দক্ষতা নির্বাচন করুন
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select
                      label="জেলা *"
                      name="reg-district"
                      placeholder="জেলা নির্বাচন করুন"
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        if (step3Errors.district)
                          setStep3Errors((p) => ({
                            ...p,
                            district: undefined,
                          }));
                      }}
                      error={step3Errors.district}
                      options={BANGLADESH_DISTRICTS.map((d) => ({
                        value: d,
                        label: d,
                      }))}
                    />

                    <Input
                      label="উপজেলা *"
                      name="reg-upazila"
                      placeholder="যেমন: ত্রিশাল"
                      value={upazila}
                      onChange={(e) => {
                        setUpazila(e.target.value);
                        if (step3Errors.upazila)
                          setStep3Errors((p) => ({
                            ...p,
                            upazila: undefined,
                          }));
                      }}
                      error={step3Errors.upazila}
                      leftIcon={
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      }
                    />

                    <Input
                      label="গ্রাম *"
                      name="reg-village"
                      placeholder="যেমন: কানহর"
                      value={village}
                      onChange={(e) => {
                        setVillage(e.target.value);
                        if (step3Errors.village)
                          setStep3Errors((p) => ({
                            ...p,
                            village: undefined,
                          }));
                      }}
                      error={step3Errors.village}
                      leftIcon={
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      }
                    />
                  </div>

                  {/* দক্ষতা মাল্টি-সিলেক্ট */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#1A1A1A] font-bangla">
                      {role === "farmer"
                        ? "দক্ষতা নির্বাচন করুন (একাধিক নির্বাচন করা যাবে) *"
                        : "প্রয়োজনীয় কৃষি দক্ষতা / কাজের ধরন নির্বাচন করুন *"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SKILL_CATEGORIES.map((skill) => {
                        const selected = skills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            aria-pressed={selected}
                            aria-label={skill}
                            className={cn(
                              "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold font-bangla transition-all active:scale-95 cursor-pointer",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                              selected
                                ? "bg-green-600 border-green-600 text-white shadow-sm"
                                : "bg-white border-[#E5E0D8] text-[#1A1A1A] hover:border-green-600/60"
                            )}
                          >
                            {selected && (
                              <Check className="h-4 w-4" aria-hidden="true" />
                            )}
                            <span>{skill}</span>
                          </button>
                        );
                      })}
                    </div>
                    {step3Errors.skills && (
                      <p
                        role="alert"
                        className="text-xs font-medium text-red-600 font-bangla"
                      >
                        {step3Errors.skills}
                      </p>
                    )}
                  </div>

                  {/* দৈনিক মজুরি — শুধুমাত্র কৃষকের জন্য */}
                  {role === "farmer" && (
                    <Input
                      label="দৈনিক মজুরি (টাকা) *"
                      name="reg-daily-wage"
                      type="number"
                      min="100"
                      max="10000"
                      placeholder="650"
                      value={dailyWage}
                      onChange={(e) => {
                        setDailyWage(e.target.value);
                        if (step3Errors.dailyWage)
                          setStep3Errors((p) => ({
                            ...p,
                            dailyWage: undefined,
                          }));
                      }}
                      error={step3Errors.dailyWage}
                      helperText={
                        dailyWage && Number(dailyWage) > 0
                          ? `প্রদর্শিত হবে: ${formatBDT(Number(dailyWage), "/দিন")}`
                          : "প্রতিদিনের প্রত্যাশিত মজুরি লিখুন"
                      }
                      leftIcon={
                        <Banknote className="h-4 w-4" aria-hidden="true" />
                      }
                    />
                  )}

                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={() => setStep(2)}
                      leftIcon={
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      }
                      aria-label="পূর্ববর্তী ধাপে ফিরুন"
                    >
                      পূর্ববর্তী
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      leftIcon={
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      }
                      aria-label="নিবন্ধন সম্পন্ন করুন"
                    >
                      নিবন্ধন সম্পন্ন করুন
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* নিচের প্রবেশ লিংক */}
            {!completed && (
              <p className="mt-6 pt-5 border-t border-[#E5E0D8] text-center text-sm text-[#57534E] font-bangla">
                ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link
                  href="/login"
                  className="font-bold text-green-600 hover:text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
                >
                  প্রবেশ করুন
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
