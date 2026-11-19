"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  Facebook,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "হোম", href: "/" },
  { label: "কৃষক তালিকা", href: "/kishok" },
  { label: "জমির মালিক", href: "/jomir-malik" },
  { label: "ড্যাশবোর্ড", href: "/dashboard" },
  { label: "প্রবেশ করুন", href: "/login" },
  { label: "নিবন্ধন করুন", href: "/register" },
];

const SERVICE_LINKS = [
  { label: "ধান চাষ ও রোপণ", href: "/kishok?skill=%E0%A6%A7%E0%A6%BE%E0%A6%A8%20%E0%A6%9A%E0%A6%BE%E0%A6%B7" },
  { label: "সবজি চাষ ও পরিচর্যা", href: "/kishok?skill=%E0%A6%B8%E0%A6%AC%E0%A6%9C%E0%A6%BF%20%E0%A6%9A%E0%A6%BE%E0%A6%B7" },
  { label: "ট্রাক্টর ও পাওয়ার টিলার ভাড়া", href: "/kishok?skill=%E0%A6%9F%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%95%E0%A7%8D%E0%A6%9F%E0%A6%B0%20%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AD%E0%A6%BF%E0%A6%B8" },
  { label: "সেচ ও সার ব্যবস্থাপনা", href: "/kishok?skill=%E0%A6%B8%E0%A7%87%E0%A6%9A%20%E0%A6%B8%E0%A7%87%E0%A6%AC%E0%A6%BE" },
  { label: "ফসল কাটা ও মাড়াই", href: "/kishok?skill=%E0%A6%AB%E0%A6%B8%E0%A6%B2%20%E0%A6%95%E0%A6%BE%E0%A6%9F%E0%A6%BE" },
];

/**
 * কৃষি সেতু গ্লোবাল ফুটার — ৪ কলাম, যোগাযোগের তথ্য, সোশ্যাল আইকন ও কপিরাইট
 */
export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-green-900 text-[#FAF7F2] border-t border-green-700/40"
    >
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* কলাম ১: ব্র্যান্ড ও পরিচিতি */}
          <div className="space-y-4">
            <Link
              href="/"
              aria-label="কৃষি সেতু হোম পেজ"
              className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white shadow-sm group-hover:bg-green-700 transition-colors">
                <Leaf className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-bold text-white font-bangla leading-tight">
                  কৃষি সেতু
                </p>
                <p className="text-xs text-green-100 font-bangla">
                  কৃষক ও জমির মালিকের সেতু
                </p>
              </div>
            </Link>

            <p className="text-sm text-white/75 font-bangla leading-relaxed">
              বাংলাদেশের কৃষক, কৃষি শ্রমিক এবং জমির মালিকদের মধ্যে সরাসরি,
              নিরাপদ ও স্বচ্ছ সংযোগ গড়ে তোলার বিশ্বস্ত ডিজিটাল প্ল্যাটফর্ম।
            </p>

            {/* সোশ্যাল আইকন */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="কৃষি সেতু ফেসবুক"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="কৃষি সেতু ইউটিউব"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <Youtube className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="tel:01712345678"
                aria-label="সরাসরি ফোনে যোগাযোগ"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-green-600 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* কলাম ২: দ্রুত লিংক */}
          <div>
            <h3 className="text-base font-bold text-white font-bangla mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EAB308]" />
              দ্রুত লিংক
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/75 hover:text-[#EAB308] font-bangla transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* কলাম ৩: জনপ্রিয় কৃষি সেবা */}
          <div>
            <h3 className="text-base font-bold text-white font-bangla mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EAB308]" />
              জনপ্রিয় কৃষি সেবা
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/75 hover:text-[#EAB308] font-bangla transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* কলাম ৪: যোগাযোগ */}
          <div>
            <h3 className="text-base font-bold text-white font-bangla mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EAB308]" />
              যোগাযোগ করুন
            </h3>
            <ul className="space-y-3.5 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#EAB308] shrink-0 mt-1" aria-hidden="true" />
                <span className="font-bangla">ঢাকা, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#EAB308] shrink-0" aria-hidden="true" />
                <a
                  href="tel:01712345678"
                  className="font-english hover:text-[#EAB308] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  01712-345678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#EAB308] shrink-0" aria-hidden="true" />
                <a
                  href="mailto:hello@krishishetu.com.bd"
                  className="font-english hover:text-[#EAB308] transition-colors break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  hello@krishishetu.com.bd
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-[#EAB308] shrink-0 mt-1" aria-hidden="true" />
                <span className="font-bangla bn-num text-white/70">
                  প্রতিদিন সকাল ৮:০০ – রাত ৮:০০
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* কপিরাইট ও নিচের সারি */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/65 font-bangla">
          <p className="bn-num">© ২০২৫ কৃষি সেতু। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-5">
            <Link
              href="/#contact"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              গোপনীয়তা নীতি
            </Link>
            <Link
              href="/#contact"
              className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              ব্যবহারের শর্তাবলি
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
