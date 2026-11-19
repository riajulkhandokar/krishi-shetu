import React from "react";

/**
 * কোনো কৃষক না পাওয়া গেলে দেখানোর জন্য লটি-মুক্ত কাস্টম বাংলা গ্রামীণ SVG ইলাস্ট্রেশন
 */
export function KishokEmptyIllustration() {
  return (
    <svg
      width="160"
      height="136"
      viewBox="0 0 160 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto"
    >
      {/* হালকা সবুজ ও সোনালি ব্যাকগ্রাউন্ড বৃত্ত */}
      <circle cx="80" cy="68" r="56" fill="#E6F2EE" />
      <circle cx="118" cy="34" r="14" fill="#FEF9C3" />
      <circle cx="118" cy="34" r="8" fill="#EAB308" fillOpacity="0.65" />

      {/* দিগন্ত ও ফসলের মাঠ */}
      <path
        d="M28 96C46 86 68 84 86 88C104 92 120 90 134 84V104C120 116 101 124 80 124C56 124 36 113 28 96Z"
        fill="#C2E0D5"
      />

      {/* বাম ধানের শীষ */}
      <path
        d="M48 98C47 82 49 68 56 54"
        stroke="#006A4E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M52 66C46 63 43 58 44 53C49 54 53 59 52 66Z"
        fill="#006A4E"
        fillOpacity="0.8"
      />
      <path
        d="M50 78C43 76 40 71 41 66C46 67 50 72 50 78Z"
        fill="#006A4E"
        fillOpacity="0.65"
      />
      <path
        d="M54 60C59 56 64 56 67 60C63 64 58 64 54 60Z"
        fill="#EAB308"
      />

      {/* ডান ধানের শীষ */}
      <path
        d="M112 96C113 82 110 70 104 58"
        stroke="#006A4E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M108 70C114 67 118 63 117 58C112 59 108 64 108 70Z"
        fill="#006A4E"
        fillOpacity="0.75"
      />
      <path
        d="M110 82C116 80 120 75 119 70C114 71 110 76 110 82Z"
        fill="#006A4E"
        fillOpacity="0.55"
      />

      {/* কেন্দ্রীয় অনুসন্ধান আতশকাচ */}
      <circle
        cx="78"
        cy="66"
        r="22"
        fill="#FFFFFF"
        stroke="#006A4E"
        strokeWidth="3.5"
      />
      <circle cx="78" cy="66" r="14" fill="#FAF7F2" stroke="#C2E0D5" strokeWidth="2" />
      <path
        d="M72 68C74 63 79 61 84 63"
        stroke="#EAB308"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M94 82L106 94"
        stroke="#004D38"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
