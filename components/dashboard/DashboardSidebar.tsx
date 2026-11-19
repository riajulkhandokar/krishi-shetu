"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  Home,
  LayoutDashboard,
  Leaf,
  LogOut,
  MessageSquare,
  Settings,
  User,
  X,
} from "lucide-react";
import { toBnDigits } from "@/lib/bn";
import { cn } from "@/lib/utils";
import type { AuthRole, DashboardTab } from "@/types";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  role: AuthRole;
  pendingBookingsCount: number;
  unreadMessagesCount: number;
}

const ROLE_LABELS: Record<AuthRole, string> = {
  farmer: "কৃষক অ্যাকাউন্ট",
  landowner: "জমির মালিক অ্যাকাউন্ট",
  admin: "অ্যাডমিন প্যানেল",
};

/**
 * ড্যাশবোর্ড সাইডবার (ডেস্কটপে স্থির এবং মোবাইলে কলাপসিবল স্লাইড-ওভার ড্রয়ার)
 * মেনু: ড্যাশবোর্ড, আমার প্রোফাইল, বুকিং, বার্তা, সেটিংস, লগ আউট
 */
export function DashboardSidebar({
  activeTab,
  onSelectTab,
  onLogout,
  mobileOpen,
  onCloseMobile,
  role,
  pendingBookingsCount,
  unreadMessagesCount,
}: DashboardSidebarProps) {
  const navItems: {
    id: DashboardTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { id: "overview", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
    { id: "profile", label: "আমার প্রোফাইল", icon: User },
    {
      id: "bookings",
      label: "বুকিং",
      icon: CalendarCheck,
      badge: pendingBookingsCount,
    },
    {
      id: "messages",
      label: "বার্তা",
      icon: MessageSquare,
      badge: unreadMessagesCount,
    },
    { id: "settings", label: "সেটিংস", icon: Settings },
  ];

  const handleSelect = (tab: DashboardTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-white">
      {/* ব্র্যান্ড লোগো */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#E5E0D8]">
        <Link
          href="/"
          aria-label="কৃষি সেতু হোম পেজ"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-xl"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-sm group-hover:bg-green-700 transition-colors">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#1A1A1A] font-bangla leading-tight">
              কৃষি সেতু
            </p>
            <p className="text-[11px] font-medium text-green-600 font-bangla">
              {ROLE_LABELS[role]}
            </p>
          </div>
        </Link>

        {/* মোবাইল বন্ধ বাটন */}
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="সাইডবার বন্ধ করুন"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E0D8] text-[#1A1A1A] hover:bg-[#FAF7F2] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* নেভিগেশন তালিকা */}
      <nav
        aria-label="ড্যাশবোর্ড নেভিগেশন"
        className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1.5"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
              className={cn(
                "flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-2.5 text-base font-semibold font-bangla transition-all active:scale-95 cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                active
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-[#1A1A1A] hover:bg-green-50 hover:text-green-700"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </span>

              {typeof item.badge === "number" && item.badge > 0 && (
                <span
                  className={cn(
                    "inline-flex min-w-6 items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold bn-num",
                    active
                      ? "bg-[#EAB308] text-[#1A1A1A]"
                      : "bg-green-100 text-green-700"
                  )}
                >
                  {toBnDigits(item.badge)}
                </span>
              )}
            </button>
          );
        })}

        {/* লগ আউট বাটন */}
        <div className="pt-3 mt-3 border-t border-[#E5E0D8]">
          <button
            type="button"
            onClick={() => {
              onCloseMobile();
              onLogout();
            }}
            aria-label="লগ আউট"
            className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-2.5 text-base font-semibold text-red-700 font-bangla hover:bg-red-50 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>লগ আউট</span>
          </button>
        </div>
      </nav>

      {/* ফুটার: মূল সাইটে ফিরুন */}
      <div className="p-4 border-t border-[#E5E0D8] bg-[#FAF7F2]">
        <Link
          href="/"
          aria-label="মূল সাইটে ফিরুন"
          className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#E5E0D8] bg-white px-4 py-2 text-sm font-semibold text-[#1A1A1A] font-bangla hover:border-green-600 hover:text-green-600 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span>মূল সাইটে ফিরুন</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* ডেস্কটপ স্থির সাইডবার */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-[#E5E0D8] bg-white">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>

      {/* মোবাইল কলাপসিবল ড্রয়ার */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-[#1A1A1A]/55 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              aria-label="মোবাইল ড্যাশবোর্ড মেনু"
              className="fixed left-0 top-0 bottom-0 z-10 w-[82vw] max-w-xs shadow-2xl border-r border-[#E5E0D8]"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
