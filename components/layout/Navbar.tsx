"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Leaf,
  LogIn,
  Menu,
  Phone,
  UserPlus,
  X,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "হোম", href: "/" },
  { label: "কৃষক তালিকা", href: "/kishok" },
  { label: "জমির মালিক", href: "/jomir-malik" },
  { label: "কীভাবে কাজ করে", href: "/#how-it-works" },
  { label: "যোগাযোগ", href: "/#contact" },
];

/**
 * বর্তমান রুট অনুযায়ী ন্যাভবার লিংক সক্রিয় কিনা তা নির্ণয় করে
 * (/kishok/[id] এর মতো নেস্টেড রুটেও "কৃষক তালিকা" সক্রিয় থাকে)
 */
function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * কৃষি সেতু গ্লোবাল ন্যাভবার
 * স্টিকি হেডার, ব্যাকড্রপ ব্লার, লোগো ও ট্যাগলাইন এবং মোবাইলের জন্য স্লাইড-ইন ড্রয়ার
 */
export function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ড্রয়ার খোলা থাকলে ব্যাকগ্রাউন্ড স্ক্রল বন্ধ ও Escape চাপলে বন্ধ করা
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    if (drawerOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5E0D8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* ব্র্যান্ড লোগো */}
          <Link
            href="/"
            aria-label="কৃষি সেতু হোম পেজ"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-xl"
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-sm group-hover:bg-green-700 transition-colors">
              <Leaf className="h-6 w-6" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-1 ring-white"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-[#1A1A1A] font-bangla leading-tight tracking-tight">
                কৃষি সেতু
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-[#57534E] font-bangla leading-none mt-0.5">
                কৃষক ও জমির মালিকের সেতু
              </span>
            </div>
          </Link>

          {/* ডেস্কটপ ন্যাভিগেশন লিংক */}
          <nav
            aria-label="প্রধান নেভিগেশন"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = isNavLinkActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-[15px] font-semibold font-bangla transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-[#1A1A1A] hover:bg-[#E5E0D8]/50 hover:text-green-600"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ডেস্কটপ অ্যাকশন বাটন */}
          <div className="hidden lg:flex items-center gap-2.5">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                aria-label="ড্যাশবোর্ডে যান"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-green-600 pl-2 pr-4 py-1.5 text-sm font-semibold text-white font-bangla hover:bg-green-700 active:scale-95 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <Avatar src={user.avatar} alt={user.name} size="sm" />
                <span>ড্যাশবোর্ড</span>
              </Link>
            ) : (
              <Button
                variant="primary"
                size="md"
                href="/login"
                leftIcon={<LogIn className="h-4 w-4" aria-hidden="true" />}
                aria-label="প্রবেশ করুন"
              >
                প্রবেশ করুন
              </Button>
            )}
          </div>

          {/* মোবাইল মেনু বাটন (বড় ট্যাপ টার্গেট) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="মেনু খুলুন"
            aria-expanded={drawerOpen}
            className="lg:hidden flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#1A1A1A] hover:bg-green-50 hover:border-green-600/40 active:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* মোবাইল স্লাইড-ইন ড্রয়ার */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            {/* ব্যাকড্রপ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm"
            />

            {/* ড্রয়ার প্যানেল */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-10 w-[85vw] max-w-sm bg-[#FAF7F2] shadow-2xl border-l border-[#E5E0D8] flex flex-col"
              aria-label="মোবাইল নেভিগেশন মেনু"
            >
              {/* ড্রয়ার হেডার */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E0D8] bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                    <Leaf className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1A1A1A] font-bangla leading-tight">
                      কৃষি সেতু
                    </p>
                    <p className="text-xs text-[#57534E] font-bangla">
                      কৃষক ও জমির মালিকের সেতু
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="মেনু বন্ধ করুন"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E0D8] text-[#1A1A1A] hover:bg-[#FAF7F2] active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* ড্রয়ার লিংকসমূহ */}
              <nav className="flex-1 overflow-y-auto p-5 space-y-2">
                {NAV_LINKS.map((link) => {
                  const isActive = isNavLinkActive(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-semibold font-bangla transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "text-[#1A1A1A] hover:bg-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  href="/dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center gap-2.5 rounded-xl px-4 py-3 text-base font-semibold font-bangla transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
                    pathname.startsWith("/dashboard")
                      ? "bg-green-100 text-green-700"
                      : "text-[#1A1A1A] hover:bg-white"
                  )}
                >
                  <LayoutDashboard className="h-5 w-5 text-green-600" aria-hidden="true" />
                  <span>ড্যাশবোর্ড</span>
                </Link>
              </nav>

              {/* ড্রয়ার ফুটার বাটন */}
              <div className="p-5 border-t border-[#E5E0D8] bg-white space-y-3">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  href="/login"
                  onClick={() => setDrawerOpen(false)}
                  leftIcon={<LogIn className="h-4 w-4" aria-hidden="true" />}
                  aria-label="প্রবেশ করুন"
                >
                  প্রবেশ করুন
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  href="/register"
                  onClick={() => setDrawerOpen(false)}
                  leftIcon={<UserPlus className="h-4 w-4" aria-hidden="true" />}
                  aria-label="নিবন্ধন করুন"
                >
                  নিবন্ধন করুন
                </Button>
                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#57534E] font-bangla">
                  <Phone className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                  <span>হেল্পলাইন:</span>
                  <a
                    href="tel:01712345678"
                    className="font-english font-semibold text-[#1A1A1A] hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                  >
                    01712-345678
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
