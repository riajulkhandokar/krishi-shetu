"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  Banknote,
  Check,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { BANGLADESH_DISTRICTS, SKILL_CATEGORIES } from "@/data/districts";
import { formatBDT } from "@/lib/bn";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus, MockAuthUser } from "@/types";

interface DashboardProfileTabProps {
  user: MockAuthUser;
  onSave: (patch: Partial<MockAuthUser>) => void;
}

/**
 * ড্যাশবোর্ডের "আমার প্রোফাইল" ট্যাব — সম্পাদনাযোগ্য প্রোফাইল ফর্ম
 */
export function DashboardProfileTab({
  user,
  onSave,
}: DashboardProfileTabProps) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [district, setDistrict] = useState(user.district);
  const [upazila, setUpazila] = useState(user.upazila);
  const [village, setVillage] = useState(user.village);
  const [dailyWage, setDailyWage] = useState(String(user.dailyWage || 650));
  const [availability, setAvailability] = useState<AvailabilityStatus>(
    user.availability
  );
  const [skills, setSkills] = useState<string[]>(user.skills);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    setName(user.name);
    setPhone(user.phone);
    setEmail(user.email);
    setDistrict(user.district);
    setUpazila(user.upazila);
    setVillage(user.village);
    setDailyWage(String(user.dailyWage || 650));
    setAvailability(user.availability);
    setSkills(user.skills);
    setBio(user.bio);
  }, [user]);

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.length > 1
          ? prev.filter((item) => item !== skill)
          : prev
        : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }

    onSave({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      district,
      upazila: upazila.trim(),
      village: village.trim(),
      dailyWage: Number(dailyWage) || user.dailyWage,
      availability,
      skills,
      bio: bio.trim(),
    });

    toast.success("প্রোফাইল সফলভাবে হালনাগাদ হয়েছে");
  };

  return (
    <div className="space-y-6">
      {/* প্রোফাইল সারসংক্ষেপ কার্ড */}
      <Card hoverLift={false} padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={user.avatar}
              alt={user.name}
              size="xl"
              className="ring-4 ring-green-100"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] font-bangla">
                  {user.name}
                </h2>
                {user.verified && (
                  <Badge
                    variant="green"
                    icon={<BadgeCheck className="h-3.5 w-3.5" />}
                  >
                    যাচাইকৃত
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-[#57534E] font-bangla">
                {user.village}, {user.upazila}, {user.district}
              </p>
              <p className="mt-0.5 text-sm font-english font-semibold text-green-600">
                {user.phone}
              </p>
            </div>
          </div>

          {/* কাজের অবস্থা টগল */}
          <div className="flex flex-col sm:items-end gap-1.5">
            <span className="text-xs font-semibold text-[#57534E] font-bangla">
              কাজের অবস্থা
            </span>
            <div className="inline-flex rounded-full bg-[#FAF7F2] border border-[#E5E0D8] p-1">
              {(["সক্রিয়", "ব্যস্ত"] as AvailabilityStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setAvailability(status)}
                  aria-pressed={availability === status}
                  aria-label={`কাজের অবস্থা ${status}`}
                  className={cn(
                    "min-h-10 rounded-full px-4 py-1.5 text-sm font-semibold font-bangla transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                      availability === status
                        ? status === "সক্রিয়"
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-red-500 text-white font-bold shadow-sm"
                        : "text-[#57534E] hover:text-[#1A1A1A]"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* সম্পাদনাযোগ্য প্রোফাইল ফর্ম */}
      <Card hoverLift={false} padding="lg">
        <div className="pb-5 border-b border-[#E5E0D8]">
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] font-bangla">
            আমার প্রোফাইল তথ্য সম্পাদনা করুন
          </h3>
          <p className="mt-1 text-sm text-[#57534E] font-bangla">
            সঠিক ও হালনাগাদ তথ্য দিলে জমির মালিক ও কৃষকরা সহজে আপনার সাথে
            যোগাযোগ করতে পারবেন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="পূর্ণ নাম"
              name="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              leftIcon={<User className="h-4 w-4" aria-hidden="true" />}
            />

            <Input
              label="মোবাইল নম্বর"
              name="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="font-english"
              leftIcon={<Phone className="h-4 w-4" aria-hidden="true" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ইমেইল"
              name="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-english"
              leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
            />

            {user.role === "farmer" && (
              <Input
                label="দৈনিক মজুরি (টাকা)"
                name="profile-wage"
                type="number"
                min="100"
                value={dailyWage}
                onChange={(e) => setDailyWage(e.target.value)}
                helperText={
                  Number(dailyWage) > 0
                    ? `প্রদর্শিত মজুরি: ${formatBDT(Number(dailyWage), "/দিন")}`
                    : undefined
                }
                leftIcon={<Banknote className="h-4 w-4" aria-hidden="true" />}
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="জেলা"
              name="profile-district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              options={BANGLADESH_DISTRICTS.map((d) => ({
                value: d,
                label: d,
              }))}
            />

            <Input
              label="উপজেলা"
              name="profile-upazila"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              leftIcon={<MapPin className="h-4 w-4" aria-hidden="true" />}
            />

            <Input
              label="গ্রাম"
              name="profile-village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              leftIcon={<MapPin className="h-4 w-4" aria-hidden="true" />}
            />
          </div>

          {/* দক্ষতা মাল্টি-সিলেক্ট */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#1A1A1A] font-bangla">
              কৃষি দক্ষতা
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
                      "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold font-bangla transition-all active:scale-95 cursor-pointer",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                      selected
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-white border-[#E5E0D8] text-[#1A1A1A] hover:border-green-600/50"
                    )}
                  >
                    {selected && (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* পরিচিতি */}
          <div className="space-y-1.5">
            <label
              htmlFor="profile-bio"
              className="block text-sm font-semibold text-[#1A1A1A] font-bangla"
            >
              নিজের সম্পর্কে সংক্ষিপ্ত পরিচিতি
            </label>
            <textarea
              id="profile-bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="আপনার কৃষি কাজের অভিজ্ঞতা ও দক্ষতা সম্পর্কে লিখুন..."
              className="w-full rounded-xl bg-white border border-[#E5E0D8] px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#57534E]/70 font-bangla transition-colors focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              leftIcon={<Save className="h-5 w-5" aria-hidden="true" />}
              aria-label="পরিবর্তন সংরক্ষণ করুন"
            >
              পরিবর্তন সংরক্ষণ করুন
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
