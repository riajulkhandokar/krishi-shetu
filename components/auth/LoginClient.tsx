"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  LogIn,
  Phone,
  ShieldCheck,
  Sprout,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { AuthRole } from "@/types";

const ROLE_TABS: {
  id: AuthRole;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "farmer", label: "কৃষক", icon: Sprout },
  { id: "landowner", label: "জমির মালিক", icon: Users },
  { id: "admin", label: "অ্যাডমিন", icon: ShieldCheck },
];

interface LoginErrors {
  phone?: string;
  password?: string;
}

/**
 * বাংলা ও ইংরেজি অঙ্ক থেকে ১১ ডিজিটের মোবাইল নম্বর যাচাই করে
 */
function countPhoneDigits(value: string): number {
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
  const normalized = value
    .replace(/[০-৯]/g, (d) => bnToEn[d] ?? d)
    .replace(/\D/g, "");
  return normalized.length;
}

/**
 * কৃষি সেতু প্রবেশ (লগইন) পেজের ক্লায়েন্ট কম্পোনেন্ট (/login)
 */
export function LoginClient() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<AuthRole>("farmer");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // "পাসওয়ার্ড ভুলে গেছেন?" মডাল স্টেট
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const validate = (): boolean => {
    const next: LoginErrors = {};
    if (!phone.trim()) {
      next.phone = "মোবাইল নম্বর লিখুন";
    } else if (countPhoneDigits(phone) !== 11) {
      next.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন";
    }

    if (!password.trim()) {
      next.password = "পাসওয়ার্ড লিখুন";
    } else if (password.trim().length < 6) {
      next.password = "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    login({ role, phone });
    toast.success("সফলভাবে প্রবেশ করেছেন");
    setTimeout(() => {
      router.push("/dashboard");
    }, 350);
  };

  const handleGoogleLogin = () => {
    login({ role, name: "রহিম উদ্দিন", phone: "01712-345678" });
    toast.success("Google দিয়ে সফলভাবে প্রবেশ করেছেন");
    router.push("/dashboard");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (countPhoneDigits(forgotPhone) !== 11) {
      toast.error("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন");
      return;
    }
    setForgotSent(true);
    toast.success("সফলভাবে পাঠানো হয়েছে");
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#FAF7F2] px-4 py-12 md:py-16">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-2xl bg-white border border-[#E5E0D8] shadow-sm"
        >
          {/* শীর্ষ সবুজ ব্যান্ড */}
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-6 text-center text-white">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/15 border border-white/25">
              <Leaf className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold font-bangla">
              প্রবেশ করুন
            </h1>
            <p className="mt-1 text-sm text-white/85 font-bangla">
              কৃষি সেতু অ্যাকাউন্টে প্রবেশ করে আপনার কাজ পরিচালনা করুন
            </p>
          </div>

          <div className="p-6 sm:p-7">
            {/* ভূমিকা ট্যাবসমূহ: কৃষক | জমির মালিক | অ্যাডমিন */}
            <div
              role="tablist"
              aria-label="ভূমিকা নির্বাচন করুন"
              className="grid grid-cols-3 gap-1.5 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] p-1.5"
            >
              {ROLE_TABS.map((tab) => {
                const Icon = tab.icon;
                const active = role === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={tab.label}
                    onClick={() => setRole(tab.id)}
                    className={cn(
                      "flex min-h-11 min-w-0 flex-col sm:flex-row items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs sm:text-sm font-semibold font-bangla transition-all active:scale-95 cursor-pointer",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                      active
                        ? "bg-green-600 text-white shadow-sm"
                        : "text-[#57534E] hover:bg-white hover:text-[#1A1A1A]"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* লগইন ফর্ম */}
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <Input
                label="মোবাইল নম্বর"
                name="login-phone"
                type="tel"
                placeholder="০১XXXXXXXXX"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone)
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                error={errors.phone}
                helperText="উদাহরণ: 01712-345678 (১১ ডিজিট)"
                leftIcon={<Phone className="h-4 w-4" aria-hidden="true" />}
              />

              <Input
                label="পাসওয়ার্ড"
                name="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
                leftIcon={<Lock className="h-4 w-4" aria-hidden="true" />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#57534E] hover:bg-[#FAF7F2] hover:text-green-600 active:scale-95 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                }
              />

              {/* পাসওয়ার্ড ভুলে গেছেন? লিংক */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setForgotPhone(phone);
                    setForgotSent(false);
                    setForgotOpen(true);
                  }}
                  aria-label="পাসওয়ার্ড ভুলে গেছেন?"
                  className="text-sm font-semibold text-green-600 hover:text-green-700 hover:underline font-bangla cursor-pointer rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>

              {/* প্রবেশ করুন প্রাইমারি বাটন */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={submitting}
                leftIcon={<LogIn className="h-5 w-5" aria-hidden="true" />}
                aria-label="প্রবেশ করুন"
              >
                {submitting ? "প্রবেশ করা হচ্ছে..." : "প্রবেশ করুন"}
              </Button>
            </form>

            {/* বিভাজক "অথবা" */}
            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#E5E0D8]" />
              <span className="text-xs font-semibold text-[#57534E] font-bangla">
                অথবা
              </span>
              <span className="h-px flex-1 bg-[#E5E0D8]" />
            </div>

            {/* Google দিয়ে প্রবেশ করুন আউটলাইন বাটন */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              aria-label="Google দিয়ে প্রবেশ করুন"
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full border-2 border-[#E5E0D8] bg-white px-5 py-3 text-base font-semibold text-[#1A1A1A] font-bangla hover:border-green-600/50 hover:bg-[#FAF7F2] active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              {/* Google SVG আইকন */}
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.56-5.15 3.56-8.65Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3a7.21 7.21 0 0 1-10.72-3.79H1.36v3.09A12 12 0 0 0 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.36 14.3A7.2 7.2 0 0 1 5.36 9.7V6.61H1.36a12 12 0 0 0 0 10.78l4-3.09Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.36 6.61l4 3.09A7.16 7.16 0 0 1 12 4.75Z"
                />
              </svg>
              <span>
                <span className="font-english">Google</span> দিয়ে প্রবেশ করুন
              </span>
            </button>

            {/* নিচের নিবন্ধন লিংক */}
            <p className="mt-6 text-center text-sm text-[#57534E] font-bangla">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/register"
                className="font-bold text-green-600 hover:text-green-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
              >
                নিবন্ধন করুন
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* পাসওয়ার্ড পুনরুদ্ধার স্লাইড-আপ মডাল */}
      <AnimatePresence>
        {forgotOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-password-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setForgotOpen(false)}
              className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 w-full max-w-md rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between bg-green-600 px-6 py-4 text-white">
                <h2
                  id="forgot-password-title"
                  className="text-lg font-bold font-bangla"
                >
                  পাসওয়ার্ড পুনরুদ্ধার করুন
                </h2>
                <button
                  type="button"
                  onClick={() => setForgotOpen(false)}
                  aria-label="বন্ধ করুন"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6">
                {forgotSent ? (
                  <div className="text-center space-y-4 py-2">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] font-bangla">
                      যাচাইকরণ কোড পাঠানো হয়েছে
                    </h3>
                    <p className="text-sm text-[#57534E] font-bangla">
                      আপনার মোবাইল নম্বরে পাসওয়ার্ড পরিবর্তনের কোড পাঠানো
                      হয়েছে।
                    </p>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => setForgotOpen(false)}
                    >
                      ঠিক আছে
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <p className="text-sm text-[#57534E] font-bangla">
                      আপনার নিবন্ধিত মোবাইল নম্বর লিখুন। আমরা এসএমএসে
                      পাসওয়ার্ড রিসেট কোড পাঠিয়ে দেব।
                    </p>
                    <Input
                      label="মোবাইল নম্বর"
                      name="forgot-phone"
                      type="tel"
                      placeholder="০১XXXXXXXXX"
                      value={forgotPhone}
                      onChange={(e) => setForgotPhone(e.target.value)}
                      leftIcon={<Phone className="h-4 w-4" aria-hidden="true" />}
                      required
                    />
                    <Button type="submit" variant="primary" fullWidth>
                      রিসেট কোড পাঠান
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
