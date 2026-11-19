const BN_DIGITS: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

/**
 * ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করে (০১২৩৪৫৬৭৮৯)
 * দ্রষ্টব্য: ফোন নম্বরের জন্য এটি ব্যবহার করা হবে না।
 */
export function toBnDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) => BN_DIGITS[digit] ?? digit);
}

/**
 * বাংলাদেশি সংখ্যা বিন্যাস (যেমন: ৫,২০০ বা ১,২৫,০০০) সহ বাংলা সংখ্যায় রূপান্তর
 */
export function formatBnNumber(value: number): string {
  const formatted = new Intl.NumberFormat("en-IN").format(value);
  return toBnDigits(formatted);
}

/**
 * বাংলাদেশি টাকা ফরম্যাটার — ৳ চিহ্নের পর কোনো স্পেস নেই (যেমন: ৳৫০০/দিন)
 */
export function formatBDT(amount: number, suffix = ""): string {
  return `৳${formatBnNumber(amount)}${suffix}`;
}

/**
 * রেটিং এক দশমিক স্থান পর্যন্ত বাংলা সংখ্যায় দেখায় (যেমন: ৪.৯)
 */
export function formatBnRating(rating: number): string {
  return toBnDigits(rating.toFixed(1));
}

/**
 * বাংলা তারিখ ফরম্যাটার (Asia/Dhaka টাইমজোন, ফরম্যাট: ১২ জুন, ২০২৫)
 */
const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function formatBnDate(dateInput: Date | string): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);

  const day = Number(parts.find((p) => p.type === "day")?.value ?? "1");
  const monthIdx =
    Number(parts.find((p) => p.type === "month")?.value ?? "1") - 1;
  const year = parts.find((p) => p.type === "year")?.value ?? "2025";

  return `${toBnDigits(day)} ${BN_MONTHS[monthIdx] ?? "জুন"}, ${toBnDigits(year)}`;
}
