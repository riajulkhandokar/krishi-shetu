import React from "react";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * কাস্টম বাংলা ৪০৪ পেজ (app/not-found.tsx)
 * গ্রামীণ ধানক্ষেত ও দিকনির্দেশনা ইলাস্ট্রেশন SVG + "পৃষ্ঠাটি খুঁজে পাওয়া যায়নি" + "হোমে ফিরুন" বাটন
 */
export default function NotFound() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#FAF7F2] px-4 py-16 md:py-24">
      <div className="max-w-lg w-full rounded-2xl bg-white border border-[#E5E0D8] p-8 sm:p-10 text-center shadow-sm">
        {/* কাস্টম গ্রামীণ কৃষি ও ৪০৪ ইলাস্ট্রেশন SVG */}
        <div className="mx-auto w-56 max-w-full" aria-hidden="true">
          <svg
            viewBox="0 0 260 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* আকাশ ও সোনালি সূর্য */}
            <circle cx="130" cy="86" r="68" fill="#E6F2EE" />
            <circle cx="188" cy="48" r="18" fill="#FEF08A" />
            <circle cx="188" cy="48" r="11" fill="#EAB308" />

            {/* দূরের সবুজ ফসলের টিলা */}
            <path
              d="M28 134C56 108 98 106 130 124C162 106 204 108 232 134H28Z"
              fill="#C2E0D5"
            />
            <path
              d="M42 146C76 122 118 122 146 138C174 122 204 126 226 146H42Z"
              fill="#00875A"
            />

            {/* গ্রামীণ কাঠের দিকনির্দেশক সাইনপোস্ট */}
            <rect x="125" y="52" width="10" height="92" rx="4" fill="#92400E" />
            <path
              d="M72 64H168L182 78L168 92H72C68.6863 92 66 89.3137 66 86V70C66 66.6863 68.6863 64 72 64Z"
              fill="#006A4E"
            />
            <text
              x="120"
              y="84"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="18"
              fontWeight="700"
              fontFamily="Hind Siliguri, sans-serif"
            >
              ৪০৪
            </text>

            {/* বাঁ দিকে ধানের শীষ */}
            <path
              d="M62 144C62 120 72 102 86 92"
              stroke="#006A4E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="75" cy="112" rx="4.5" ry="9" transform="rotate(-28 75 112)" fill="#EAB308" />
            <ellipse cx="84" cy="100" rx="4.5" ry="8.5" transform="rotate(-35 84 100)" fill="#EAB308" />

            {/* ডান দিকে ধানের শীষ */}
            <path
              d="M198 144C198 120 188 102 174 92"
              stroke="#006A4E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="185" cy="112" rx="4.5" ry="9" transform="rotate(28 185 112)" fill="#EAB308" />
            <ellipse cx="176" cy="100" rx="4.5" ry="8.5" transform="rotate(35 176 100)" fill="#EAB308" />

            {/* মাটির রেখা */}
            <rect x="34" y="144" width="192" height="6" rx="3" fill="#004D38" />
          </svg>
        </div>

        <p className="mt-4 inline-flex items-center rounded-full bg-[#FEF9C3] border border-[#EAB308]/35 px-4 py-1 text-xs font-bold text-[#854D0E] font-bangla bn-num">
          ত্রুটি ৪০৪
        </p>

        <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-[#1A1A1A] font-bangla">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-2.5 text-sm sm:text-base text-[#57534E] font-bangla leading-relaxed">
          আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে অথবা লিংকটি সঠিক
          নয়। নিচের বাটনে ক্লিক করে হোম পেজে ফিরে যেতে পারেন।
        </p>

        <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            href="/"
            leftIcon={<Home className="h-4 w-4" />}
            aria-label="হোমে ফিরুন"
          >
            হোমে ফিরুন
          </Button>
          <Button
            variant="secondary"
            size="md"
            href="/kishok"
            leftIcon={<Search className="h-4 w-4" />}
            aria-label="কৃষক তালিকা দেখুন"
          >
            কৃষক তালিকা দেখুন
          </Button>
        </div>
      </div>
    </section>
  );
}
