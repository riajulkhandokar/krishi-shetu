"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatBDT, formatBnDate, toBnDigits } from "@/lib/bn";
import type { Farmer } from "@/types";

export interface BookingModalProps {
  isOpen: boolean;
  farmer: Farmer;
  intent?: "booking" | "contact";
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
}

const DAY_OPTIONS = [1, 2, 3, 4, 5, 7, 10, 15].map((d) => ({
  value: String(d),
  label: `${toBnDigits(d)} দিন`,
}));

/**
 * দুই ধাপের কৃষক বুকিং ও যোগাযোগ মডাল
 * ধাপ ১: নাম, মোবাইল, তারিখ, কতদিন, কাজের ধরন ও বার্তা (বাংলা ভ্যালিডেশনসহ)
 * ধাপ ২: সফলতার বার্তা ("আপনার বুকিং অনুরোধ পাঠানো হয়েছে")
 */
export function BookingModal({
  isOpen,
  farmer,
  intent = "booking",
  onClose,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [days, setDays] = useState("1");
  const [workType, setWorkType] = useState(farmer.skills[0] ?? "ধান চাষ");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // মডাল খুললে স্টেট রিসেট ও Escape চাপলে বন্ধ করা
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      setStep(1);
      setErrors({});
      setWorkType(farmer.skills[0] ?? "ধান চাষ");
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, farmer.skills, onClose]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "নাম লিখুন";
    }

    const cleanedPhone = phone.replace(/[\s-]/g, "");
    if (!/^\d{11}$/.test(cleanedPhone)) {
      nextErrors.phone = "সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)";
    }

    if (!date) {
      nextErrors.date = "তারিখ নির্বাচন করুন";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast.success("বুকিং নিশ্চিত হয়েছে — সফলভাবে পাঠানো হয়েছে");
    setStep(2);
  };

  const handleFinish = () => {
    setName("");
    setPhone("");
    setDate("");
    setDays("1");
    setMessage("");
    setErrors({});
    setStep(1);
    onClose();
  };

  const totalEstimate = farmer.dailyWage * Number(days || 1);
  const skillOptions = farmer.skills.map((s) => ({ value: s, label: s }));
  const todayISO = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          {/* ব্যাকড্রপ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
          />

          {/* মডাল কার্ড (স্লাইড-আপ অ্যানিমেশন) */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] shadow-2xl"
          >
            {/* শীর্ষ হেডার */}
            <div className="flex items-center justify-between bg-green-600 px-6 py-5 text-white">
              <div>
                <h2
                  id="booking-modal-title"
                  className="text-xl font-bold font-bangla"
                >
                  {step === 2
                    ? "বুকিং সম্পন্ন"
                    : intent === "contact"
                      ? "কৃষকের সাথে যোগাযোগ ও বুকিং"
                      : "কৃষক বুকিং করুন"}
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-white/85 font-bangla bn-num">
                  {farmer.name} • দৈনিক মজুরি {formatBDT(farmer.dailyWage, "/দিন")}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="বন্ধ করুন"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    {/* সরাসরি কল ব্যানার (যোগাযোগ ইন্টেন্টে বিশেষভাবে দৃশ্যমান) */}
                    {intent === "contact" && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-green-100 border border-green-600/25 p-4">
                        <div>
                          <p className="text-xs font-semibold text-green-700 font-bangla">
                            সরাসরি ফোনে কথা বলুন
                          </p>
                          <p className="text-lg font-bold text-[#1A1A1A] font-english">
                            {farmer.phone}
                          </p>
                        </div>
                        <a
                          href={`tel:${farmer.phone.replace(/-/g, "")}`}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-white font-bangla hover:bg-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                        >
                          <Phone className="h-4 w-4" />
                          <span>কল করুন</span>
                        </a>
                      </div>
                    )}

                    <Input
                      label="আপনার নাম *"
                      name="booking-name"
                      placeholder="যেমন: মোঃ মোস্তাফিজুর রহমান"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                      }}
                      error={errors.name}
                      leftIcon={<User className="h-4 w-4" />}
                    />

                    <Input
                      label="মোবাইল নম্বর *"
                      name="booking-phone"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="কাজ শুরুর তারিখ *"
                        name="booking-date"
                        type="date"
                        min={todayISO}
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          if (errors.date) setErrors((p) => ({ ...p, date: undefined }));
                        }}
                        error={errors.date}
                        leftIcon={<Calendar className="h-4 w-4" />}
                      />

                      <Select
                        label="কতদিন প্রয়োজন"
                        name="booking-days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        options={DAY_OPTIONS}
                      />
                    </div>

                    <Select
                      label="কাজের ধরন"
                      name="booking-work-type"
                      value={workType}
                      onChange={(e) => setWorkType(e.target.value)}
                      options={skillOptions}
                    />

                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-message"
                        className="block text-sm font-semibold text-[#1A1A1A] font-bangla"
                      >
                        বার্তা (ঐচ্ছিক)
                      </label>
                      <textarea
                        id="booking-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="আপনার জমির অবস্থান, ফসলের ধরন বা অতিরিক্ত কোনো নির্দেশনা লিখুন..."
                        className="w-full rounded-xl bg-white border border-[#E5E0D8] px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#57534E]/70 font-bangla transition-colors focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 resize-none"
                      />
                    </div>

                    {/* আনুমানিক মোট মজুরি */}
                    <div className="flex items-center justify-between rounded-xl bg-white border border-[#E5E0D8] px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-sm text-[#57534E] font-bangla bn-num">
                        <Clock className="h-4 w-4 text-green-600" />
                        আনুমানিক মোট মজুরি ({toBnDigits(days)} দিন)
                      </span>
                      <span className="text-lg font-bold text-green-600 bn-num">
                        {formatBDT(totalEstimate)}
                      </span>
                    </div>

                    <div className="pt-1 flex items-center gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        onClick={onClose}
                        className="px-5"
                      >
                        বাতিল
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        fullWidth
                      >
                        বুকিং অনুরোধ পাঠান
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="py-4 text-center space-y-5"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 shadow-sm">
                      <CheckCircle2 className="h-11 w-11" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#1A1A1A] font-bangla">
                        আপনার বুকিং অনুরোধ পাঠানো হয়েছে
                      </h3>
                      <p className="mt-2 text-base text-[#57534E] font-bangla">
                        কৃষক শীঘ্রই যোগাযোগ করবেন
                      </p>
                    </div>

                    {/* বুকিং সারসংক্ষেপ */}
                    <div className="rounded-2xl bg-white border border-[#E5E0D8] p-4 text-left space-y-2 text-sm font-bangla">
                      <div className="flex justify-between gap-2">
                        <span className="text-[#57534E]">কৃষক:</span>
                        <span className="font-bold text-[#1A1A1A]">
                          {farmer.name}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-[#57534E]">কাজের ধরন:</span>
                        <span className="font-semibold text-[#1A1A1A]">
                          {workType}
                        </span>
                      </div>
                      {date && (
                        <div className="flex justify-between gap-2">
                          <span className="text-[#57534E]">তারিখ:</span>
                          <span className="font-semibold text-[#1A1A1A] bn-num">
                            {formatBnDate(date)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between gap-2">
                        <span className="text-[#57534E]">মেয়াদ ও আনুমানিক মজুরি:</span>
                        <span className="font-bold text-green-600 bn-num">
                          {toBnDigits(days)} দিন • {formatBDT(totalEstimate)}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleFinish}
                    >
                      ঠিক আছে
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
