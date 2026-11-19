"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Ban,
  Bell,
  Calendar,
  CalendarCheck,
  Check,
  CheckCheck,
  ChevronDown,
  Clock,
  Eye,
  Home,
  LogOut,
  MapPin,
  Menu,
  Phone,
  Send,
  Settings,
  Star,
  TrendingUp,
  User,
  Wallet,
  X,
} from "lucide-react";
import { DashboardProfileTab } from "@/components/dashboard/DashboardProfileTab";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useAuth } from "@/components/providers/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  INITIAL_DASHBOARD_BOOKINGS,
  INITIAL_DASHBOARD_MESSAGES,
} from "@/data/dashboard";
import { formatBDT, formatBnNumber, formatBnRating, toBnDigits } from "@/lib/bn";
import { cn } from "@/lib/utils";
import type {
  BookingStatus,
  DashboardBooking,
  DashboardMessage,
  DashboardTab,
} from "@/types";

const STATUS_BADGE_CLASSES: Record<BookingStatus, string> = {
  অপেক্ষমাণ: "bg-amber-50 text-amber-800 border-amber-200",
  নিশ্চিত: "bg-green-100 text-green-700 border-green-600/25",
  বাতিল: "bg-red-50 text-red-700 border-red-100",
};

/**
 * কৃষি সেতু ব্যবহারকারী ড্যাশবোর্ড (/dashboard)
 * - কলাপসিবল সাইডবার (মোবাইল ৩৬০px+ এবং ডেস্কটপ)
 * - টপ বার: "স্বাগতম, রহিম উদ্দিন" + অ্যাভাটার ড্রপডাউন
 * - ৪টি পরিসংখ্যান কার্ড (মোট বুকিং, নতুন অনুরোধ, রেটিং, মোট আয়) বাংলা সংখ্যা ও ট্রেন্ড অ্যারোসহ
 * - "সাম্প্রতিক বুকিং" টেবিল + "আমার প্রোফাইল", "বুকিং", "বার্তা", "সেটিংস" ট্যাব
 */
export function DashboardClient() {
  const router = useRouter();
  const { user, updateProfile, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // বুকিং ও বার্তা স্টেট
  const [bookings, setBookings] = useState<DashboardBooking[]>(
    INITIAL_DASHBOARD_BOOKINGS
  );
  const [bookingFilter, setBookingFilter] = useState<"সব" | BookingStatus>(
    "সব"
  );
  const [selectedBooking, setSelectedBooking] =
    useState<DashboardBooking | null>(null);

  const [threads, setThreads] = useState<DashboardMessage[]>(
    INITIAL_DASHBOARD_MESSAGES
  );
  const [activeThreadId, setActiveThreadId] = useState<string>(
    INITIAL_DASHBOARD_MESSAGES[0]?.id ?? ""
  );
  const [replyText, setReplyText] = useState("");

  // সেটিংস স্টেট
  const [smsAlert, setSmsAlert] = useState(true);
  const [bookingAlert, setBookingAlert] = useState(true);
  const [publicPhone, setPublicPhone] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ করা
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAvatarDropdownOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAvatarDropdownOpen(false);
        setMobileSidebarOpen(false);
        setSelectedBooking(null);
      }
    };
    window.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const pendingCount = bookings.filter((b) => b.status === "অপেক্ষমাণ").length;
  const unreadMessagesCount = threads.filter((t) => t.unread).length;
  const confirmedRevenue = bookings
    .filter((b) => b.status === "নিশ্চিত")
    .reduce((sum, b) => sum + b.amount, 0);
  const totalRevenue = 41350 + confirmedRevenue; // মোট আয় (বাংলা সংখ্যায়)
  const totalBookingsCount = 22 + bookings.length;

  const handleBookingStatus = (id: string, nextStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );
    if (selectedBooking?.id === id) {
      setSelectedBooking((prev) =>
        prev ? { ...prev, status: nextStatus } : null
      );
    }

    if (nextStatus === "নিশ্চিত") {
      toast.success("বুকিং নিশ্চিত হয়েছে");
    } else if (nextStatus === "বাতিল") {
      toast.error("বুকিং বাতিল করা হয়েছে");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("সফলভাবে লগ আউট হয়েছে");
    router.push("/login");
  };

  const activeThread =
    threads.find((t) => t.id === activeThreadId) ?? threads[0];

  const handleOpenThread = (id: string) => {
    setActiveThreadId(id);
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    );
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    const text = replyText.trim();
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === activeThread.id
          ? {
              ...thread,
              lastMessage: text,
              time: "এইমাত্র",
              unread: false,
              messages: [
                ...thread.messages,
                {
                  id: `m-${Date.now()}`,
                  from: "me",
                  text,
                  time: "এইমাত্র",
                },
              ],
            }
          : thread
      )
    );
    setReplyText("");
    toast.success("সফলভাবে পাঠানো হয়েছে");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword || confirmNewPassword) {
      if (newPassword.length < 6) {
        toast.error("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast.error("পাসওয়ার্ড দুটি মেলেনি");
        return;
      }
      setNewPassword("");
      setConfirmNewPassword("");
    }
    toast.success("সেটিংস সফলভাবে সংরক্ষিত হয়েছে");
  };

  const filteredBookings =
    bookingFilter === "সব"
      ? bookings
      : bookings.filter((b) => b.status === bookingFilter);

  const statCards = [
    {
      label: "মোট বুকিং",
      value: formatBnNumber(totalBookingsCount),
      trend: "+১২% গত মাসে",
      icon: CalendarCheck,
      iconBg: "bg-green-100 text-green-600",
    },
    {
      label: "নতুন অনুরোধ",
      value: formatBnNumber(pendingCount),
      trend: "+২ আজ",
      icon: Bell,
      iconBg: "bg-[#FEF9C3] text-[#854D0E]",
    },
    {
      label: "রেটিং",
      value: formatBnRating(user.rating || 4.9),
      trend: "+০.২ উন্নতি",
      icon: Star,
      iconBg: "bg-gold-400/15 text-gold-600",
    },
    {
      label: "মোট আয়",
      value: formatBDT(totalRevenue),
      trend: "+১৮% এই মাসে",
      icon: Wallet,
      iconBg: "bg-green-100 text-green-700",
    },
  ];

  const renderBookingsTable = (rows: DashboardBooking[], title: string) => (
    <Card hoverLift={false} padding="none" className="overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-5 border-b border-[#E5E0D8]">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A] font-bangla">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] font-bangla bn-num">
            মোট {toBnDigits(rows.length)}টি বুকিং তালিকাভুক্ত
          </p>
        </div>

        {activeTab === "overview" ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveTab("bookings")}
            aria-label="সব বুকিং দেখুন"
          >
            সব বুকিং দেখুন
          </Button>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {(["সব", "অপেক্ষমাণ", "নিশ্চিত", "বাতিল"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setBookingFilter(status)}
                aria-pressed={bookingFilter === status}
                aria-label={`স্ট্যাটাস ফিল্টার: ${status}`}
                className={cn(
                  "min-h-9 rounded-full border px-3.5 py-1 text-xs font-semibold font-bangla transition-all active:scale-95 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                  bookingFilter === status
                    ? "bg-green-600 border-green-600 text-white"
                    : "bg-white border-[#E5E0D8] text-[#57534E] hover:border-green-600/50"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* হরিজন্টাল স্ক্রলসহ রেসপনসিভ টেবিল (৩৬০px নিরাপদ) */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF7F2] border-b border-[#E5E0D8] text-xs sm:text-sm font-bold text-[#57534E] font-bangla">
              <th className="px-5 py-3.5">তারিখ</th>
              <th className="px-5 py-3.5">কৃষক/মালিক</th>
              <th className="px-5 py-3.5">কাজ</th>
              <th className="px-5 py-3.5">স্ট্যাটাস</th>
              <th className="px-5 py-3.5 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D8] text-sm font-bangla">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#FAF7F2]/70 transition-colors"
              >
                <td className="px-5 py-4 whitespace-nowrap text-[#57534E] bn-num">
                  {row.date}
                </td>
                <td className="px-5 py-4">
                  <p className="font-bold text-[#1A1A1A]">{row.partyName}</p>
                  <p className="text-xs text-[#57534E]">{row.partyLocation}</p>
                </td>
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#1A1A1A]">{row.work}</p>
                  <p className="text-xs text-green-600 font-bold bn-num">
                    {toBnDigits(row.days)} দিন • {formatBDT(row.amount)}
                  </p>
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold font-bangla",
                      STATUS_BADGE_CLASSES[row.status]
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-right">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    {row.status === "অপেক্ষমাণ" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleBookingStatus(row.id, "নিশ্চিত")}
                          aria-label={`${row.partyName} এর বুকিং নিশ্চিত করুন`}
                          className="inline-flex min-h-9 items-center gap-1 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                        >
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>নিশ্চিত</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBookingStatus(row.id, "বাতিল")}
                          aria-label={`${row.partyName} এর বুকিং বাতিল করুন`}
                          className="inline-flex min-h-9 items-center gap-1 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                        >
                          <Ban className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>বাতিল</span>
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(row)}
                      aria-label={`${row.partyName} এর বুকিং বিস্তারিত দেখুন`}
                      className="inline-flex min-h-9 items-center gap-1 rounded-full border border-[#E5E0D8] bg-white px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] hover:border-green-600 hover:text-green-600 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>বিস্তারিত</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex bg-[#FAF7F2]">
      {/* সাইডবার */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={handleLogout}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        role={user.role}
        pendingBookingsCount={pendingCount}
        unreadMessagesCount={unreadMessagesCount}
      />

      {/* মূল কনটেন্ট কলাম */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ড্যাশবোর্ড টপ বার */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E0D8]">
          <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 min-w-0">
              {/* মোবাইল সাইডবার টগল বাটন */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="ড্যাশবোর্ড মেনু খুলুন"
                aria-expanded={mobileSidebarOpen}
                className="lg:hidden flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#1A1A1A] hover:bg-green-50 hover:border-green-600/50 active:scale-95 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-[#1A1A1A] font-bangla truncate">
                  স্বাগতম, {user.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#57534E] font-bangla truncate">
                  {user.upazila}, {user.district} • আজকের কাজ ও বুকিং সারসংক্ষেপ
                </p>
              </div>
            </div>

            {/* অ্যাভাটার ড্রপডাউন */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAvatarDropdownOpen((prev) => !prev)}
                aria-label="ব্যবহারকারী প্রোফাইল মেনু"
                aria-expanded={avatarDropdownOpen}
                aria-haspopup="menu"
                className="flex min-h-12 items-center gap-2.5 rounded-full border border-[#E5E0D8] bg-[#FAF7F2] pl-1.5 pr-3 py-1 hover:border-green-600/50 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <Avatar src={user.avatar} alt={user.name} size="sm" />
                <span className="hidden sm:inline text-sm font-bold text-[#1A1A1A] font-bangla max-w-[130px] truncate">
                  {user.name}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[#57534E] transition-transform",
                    avatarDropdownOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {avatarDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.16 }}
                    role="menu"
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#E5E0D8] shadow-xl py-2 z-50"
                  >
                    <div className="px-4 py-2.5 border-b border-[#E5E0D8]">
                      <p className="text-sm font-bold text-[#1A1A1A] font-bangla truncate">
                        {user.name}
                      </p>
                      <p className="text-xs font-english text-[#57534E]">
                        {user.phone}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setActiveTab("profile");
                        setAvatarDropdownOpen(false);
                      }}
                      aria-label="আমার প্রোফাইল"
                      className="flex min-h-11 w-full items-center gap-2.5 px-4 py-2 text-sm font-semibold text-[#1A1A1A] font-bangla hover:bg-green-50 hover:text-green-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                    >
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span>আমার প্রোফাইল</span>
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setActiveTab("settings");
                        setAvatarDropdownOpen(false);
                      }}
                      aria-label="সেটিংস"
                      className="flex min-h-11 w-full items-center gap-2.5 px-4 py-2 text-sm font-semibold text-[#1A1A1A] font-bangla hover:bg-green-50 hover:text-green-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                    >
                      <Settings className="h-4 w-4" aria-hidden="true" />
                      <span>সেটিংস</span>
                    </button>

                    <Link
                      href="/"
                      role="menuitem"
                      onClick={() => setAvatarDropdownOpen(false)}
                      className="flex min-h-11 w-full items-center gap-2.5 px-4 py-2 text-sm font-semibold text-[#1A1A1A] font-bangla hover:bg-green-50 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                    >
                      <Home className="h-4 w-4" aria-hidden="true" />
                      <span>হোম পেজ</span>
                    </Link>

                    <div className="my-1 border-t border-[#E5E0D8]" />

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setAvatarDropdownOpen(false);
                        handleLogout();
                      }}
                      aria-label="লগ আউট"
                      className="flex min-h-11 w-full items-center gap-2.5 px-4 py-2 text-sm font-semibold text-red-700 font-bangla hover:bg-red-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      <span>লগ আউট</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* ট্যাব কনটেন্ট এরিয়া */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {activeTab === "overview" && (
            <>
              {/* ৪টি পরিসংখ্যান ওভারভিউ কার্ড */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: index * 0.05 }}
                    >
                      <Card padding="md" hoverLift className="h-full">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[#57534E] font-bangla">
                              {stat.label}
                            </p>
                            <p className="mt-2 text-2xl sm:text-3xl font-bold text-[#1A1A1A] bn-num">
                              {stat.value}
                            </p>
                          </div>
                          <div
                            className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                              stat.iconBg
                            )}
                          >
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600 font-bangla bn-num">
                          <TrendingUp
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{stat.trend}</span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* সাম্প্রতিক বুকিং টেবিল */}
              {renderBookingsTable(bookings, "সাম্প্রতিক বুকিং")}
            </>
          )}

          {activeTab === "profile" && (
            <DashboardProfileTab user={user} onSave={updateProfile} />
          )}

          {activeTab === "bookings" &&
            renderBookingsTable(filteredBookings, "সকল বুকিং তালিকা")}

          {activeTab === "messages" && (
            <Card hoverLift={false} padding="none" className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
                {/* বাম কলাম: বার্তার তালিকা */}
                <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-[#E5E0D8] divide-y divide-[#E5E0D8]">
                  <div className="px-5 py-4 bg-[#FAF7F2]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] font-bangla">
                      বার্তা ({toBnDigits(threads.length)})
                    </h2>
                  </div>
                  {threads.map((thread) => {
                    const isActive = activeThread?.id === thread.id;
                    return (
                      <button
                        key={thread.id}
                        type="button"
                        onClick={() => handleOpenThread(thread.id)}
                        aria-label={`${thread.senderName} এর সাথে বার্তা`}
                        className={cn("focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2", 
                          "w-full p-4 text-left flex items-start gap-3 transition-colors cursor-pointer",
                          isActive ? "bg-green-50" : "hover:bg-[#FAF7F2]"
                        )}
                      >
                        <Avatar
                          src={thread.avatar}
                          alt={thread.senderName}
                          size="sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-bold text-[#1A1A1A] font-bangla truncate">
                              {thread.senderName}
                            </p>
                            <span className="text-[11px] text-[#57534E] font-bangla shrink-0 bn-num">
                              {thread.time}
                            </span>
                          </div>
                          <p className="text-xs text-[#57534E] font-bangla">
                            {thread.location}
                          </p>
                          <p className="mt-1 text-xs text-[#1A1A1A] font-bangla line-clamp-1">
                            {thread.lastMessage}
                          </p>
                        </div>
                        {thread.unread && (
                          <span
                            aria-label="অপঠিত বার্তা"
                            className="mt-1 h-2.5 w-2.5 rounded-full bg-green-600 shrink-0"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* ডান কলাম: কথোপকথন */}
                {activeThread && (
                  <div className="md:col-span-7 flex flex-col">
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E0D8] bg-white">
                      <Avatar
                        src={activeThread.avatar}
                        alt={activeThread.senderName}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm sm:text-base font-bold text-[#1A1A1A] font-bangla">
                          {activeThread.senderName}
                        </p>
                        <p className="text-xs text-[#57534E] font-bangla">
                          {activeThread.senderRole} • {activeThread.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 p-5 space-y-3 overflow-y-auto bg-[#FAF7F2]/60 max-h-[360px]">
                      {activeThread.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-3 text-sm font-bangla",
                            msg.from === "me"
                              ? "ml-auto bg-green-600 text-white"
                              : "bg-white border border-[#E5E0D8] text-[#1A1A1A]"
                          )}
                        >
                          <p className="leading-relaxed">{msg.text}</p>
                          <p
                            className={cn(
                              "mt-1 text-[11px] bn-num flex items-center justify-end gap-1",
                              msg.from === "me"
                                ? "text-white/80"
                                : "text-[#57534E]"
                            )}
                          >
                            <span>{msg.time}</span>
                            {msg.from === "me" && (
                              <CheckCheck
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            )}
                          </p>
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleSendReply}
                      className="p-4 border-t border-[#E5E0D8] bg-white flex items-center gap-2.5"
                    >
                      <label htmlFor="dashboard-reply" className="sr-only">
                        বার্তা লিখুন
                      </label>
                      <input
                        id="dashboard-reply"
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="আপনার উত্তর লিখুন..."
                        className="flex-1 min-w-0 min-h-12 rounded-full border border-[#E5E0D8] bg-[#FAF7F2] px-4 py-2.5 text-sm sm:text-base font-bangla text-[#1A1A1A] focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        leftIcon={<Send className="h-4 w-4" aria-hidden="true" />}
                        aria-label="বার্তা পাঠান"
                      >
                        পাঠান
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card hoverLift={false} padding="lg">
              <div className="pb-5 border-b border-[#E5E0D8]">
                <h2 className="text-xl font-bold text-[#1A1A1A] font-bangla">
                  অ্যাকাউন্ট সেটিংস
                </h2>
                <p className="mt-1 text-sm text-[#57534E] font-bangla">
                  নোটিফিকেশন, গোপনীয়তা ও নিরাপত্তা পছন্দ পরিবর্তন করুন
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="mt-6 space-y-6">
                <div className="space-y-3">
                  {[
                    {
                      label: "এসএমএস নোটিফিকেশন",
                      desc: "নতুন বুকিং অনুরোধ এলে মোবাইলে এসএমএস পান",
                      checked: smsAlert,
                      toggle: () => setSmsAlert((p) => !p),
                    },
                    {
                      label: "বুকিং অ্যালার্ট",
                      desc: "বুকিং নিশ্চিত বা বাতিল হলে তাৎক্ষণিক বার্তা দেখুন",
                      checked: bookingAlert,
                      toggle: () => setBookingAlert((p) => !p),
                    },
                    {
                      label: "প্রোফাইলে মোবাইল নম্বর প্রদর্শন",
                      desc: "যাচাইকৃত ব্যবহারকারীরা আপনার নম্বর দেখতে পারবেন",
                      checked: publicPhone,
                      toggle: () => setPublicPhone((p) => !p),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] p-4"
                    >
                      <div>
                        <p className="text-sm sm:text-base font-bold text-[#1A1A1A] font-bangla">
                          {item.label}
                        </p>
                        <p className="text-xs sm:text-sm text-[#57534E] font-bangla">
                          {item.desc}
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={item.checked}
                        aria-label={item.label}
                        onClick={item.toggle}
                        className={cn(
                          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                          item.checked ? "bg-green-600" : "bg-[#E5E0D8]"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                            item.checked ? "translate-x-6" : "translate-x-1"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E5E0D8] space-y-4">
                  <h3 className="text-base font-bold text-[#1A1A1A] font-bangla">
                    পাসওয়ার্ড পরিবর্তন (ঐচ্ছিক)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="নতুন পাসওয়ার্ড"
                      name="settings-new-pass"
                      type="password"
                      placeholder="কমপক্ষে ৬ অক্ষর"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                      label="পাসওয়ার্ড নিশ্চিত করুন"
                      name="settings-confirm-pass"
                      type="password"
                      placeholder="পুনরায় লিখুন"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    aria-label="সেটিংস সংরক্ষণ করুন"
                  >
                    সেটিংস সংরক্ষণ করুন
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>

      {/* বুকিং বিস্তারিত স্লাইড-আপ মডাল */}
      <AnimatePresence>
        {selectedBooking && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-detail-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
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
                  id="booking-detail-modal-title"
                  className="text-lg font-bold font-bangla"
                >
                  বুকিং বিস্তারিত
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  aria-label="বন্ধ করুন"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm font-bangla">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-base font-bold text-[#1A1A1A]">
                      {selectedBooking.partyName}
                    </p>
                    <p className="text-xs text-[#57534E] flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 text-green-600" />
                      {selectedBooking.partyLocation}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-bold",
                      STATUS_BADGE_CLASSES[selectedBooking.status]
                    )}
                  >
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="rounded-2xl bg-white border border-[#E5E0D8] p-4 space-y-2.5">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#57534E] inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-green-600" />
                      তারিখ:
                    </span>
                    <span className="font-semibold text-[#1A1A1A] bn-num">
                      {selectedBooking.date}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#57534E] inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-green-600" />
                      কাজের ধরন:
                    </span>
                    <span className="font-semibold text-[#1A1A1A] text-right">
                      {selectedBooking.work}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#57534E]">মেয়াদ ও মোট মজুরি:</span>
                    <span className="font-bold text-green-600 bn-num">
                      {toBnDigits(selectedBooking.days)} দিন •{" "}
                      {formatBDT(selectedBooking.amount)}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#E5E0D8] p-4">
                  <p className="text-xs font-semibold text-[#57534E] mb-1">
                    কাজের নির্দেশনা
                  </p>
                  <p className="text-sm text-[#1A1A1A] leading-relaxed">
                    {selectedBooking.notes}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <a
                    href={`tel:${selectedBooking.partyPhone.replace(/-/g, "")}`}
                    aria-label="সরাসরি কল করুন"
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span className="font-english">
                      {selectedBooking.partyPhone}
                    </span>
                  </a>
                  {selectedBooking.status === "অপেক্ষমাণ" && (
                    <Button
                      variant="accent"
                      size="md"
                      onClick={() =>
                        handleBookingStatus(selectedBooking.id, "নিশ্চিত")
                      }
                      aria-label="বুকিং নিশ্চিত করুন"
                    >
                      নিশ্চিত করুন
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
