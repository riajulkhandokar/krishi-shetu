export type AvailabilityStatus = "সক্রিয়" | "ব্যস্ত";

export interface Location {
  village: string;
  upazila: string;
  district: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: Location;
  avatar: string;
  skills: string[];
  experienceYears: number;
  dailyWage: number; // BDT
  rating: number;
  totalReviews: number;
  verified: boolean;
  phone: string; // ইংরেজি সংখ্যায় (যেমন: 01712-345678)
  bio: string;
  availability: AvailabilityStatus;
  joinedAt: string; // ISO তারিখ (যেমন: "2025-06-12") — "নতুন আগে" সাজানোর জন্য
}

export interface FarmerExperienceItem {
  period: string; // যেমন: "২০২০–২০২৩"
  role: string; // যেমন: "ধান চাষ"
  location: string; // যেমন: "ময়মনসিংহ"
  description: string;
}

export interface FarmerCertificate {
  title: string; // যেমন: "কৃষি প্রশিক্ষণ"
  issuer: string; // যেমন: "উপজেলা কৃষি অফিস"
  year: string; // যেমন: "২০২২"
}

export interface FarmerReview {
  id: string;
  reviewerName: string;
  reviewerLocation: string;
  rating: number;
  date: string; // বাংলা তারিখ (যেমন: "১২ জুন, ২০২৫")
  comment: string;
}

export interface FarmerDetailExtra {
  detailedBio: string;
  workHours: string;
  minBookingDays: number;
  experienceTimeline: FarmerExperienceItem[];
  certificates: FarmerCertificate[];
  reviews: FarmerReview[];
}

export type WageRangeFilter = "" | "under500" | "500to1000" | "above1000";

export type FarmerSortOption = "rating" | "wage_asc" | "experience" | "newest";

export type LandownerServiceType =
  | "শ্রমিক প্রয়োজন"
  | "জমি ভাড়া"
  | "যন্ত্রপাতি ভাড়া";

export type LandownerSortOption = "newest" | "budget_desc" | "budget_asc";

export interface Landowner {
  id: string;
  name: string;
  location: Location;
  avatar: string;
  landSize: string; // যেমন: "১২ বিঘা"
  cropType: string[]; // যেমন: ["ধান", "পাট", "শাকসবজি"]
  serviceType: LandownerServiceType;
  budget: number; // BDT
  budgetUnit?: string; // যেমন: "/দিন" বা "/মৌসুম"
  verified: boolean;
  phone: string; // ইংরেজি সংখ্যায়
  bio: string;
  postedDate: string; // বাংলা তারিখ (যেমন: "১২ জুন, ২০২৫")
  postedAt?: string; // ISO তারিখ — "নতুন আগে" সাজানোর জন্য
}

export interface ServiceCategory {
  id: string;
  label: string;
  iconName:
    | "Wheat"
    | "Sprout"
    | "Fish"
    | "Beef"
    | "Tractor"
    | "Droplets"
    | "Scissors"
    | "Package";
  description: string;
  activeFarmersCount: number;
  avgDailyWage: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: "কৃষক" | "জমির মালিক";
  location: string;
  quote: string;
  rating: number;
  date: string;
}

/* ===== ফেজ ৪: অথেনটিকেশন ও ড্যাশবোর্ড টাইপসমূহ ===== */

export type AuthRole = "farmer" | "landowner" | "admin";

export interface MockAuthUser {
  id: string;
  name: string;
  role: AuthRole;
  phone: string; // ইংরেজি সংখ্যায় (যেমন: 01712-345678)
  email: string;
  district: string;
  upazila: string;
  village: string;
  skills: string[];
  dailyWage: number;
  availability: AvailabilityStatus;
  bio: string;
  avatar: string;
  verified: boolean;
  rating: number;
}

export type BookingStatus = "অপেক্ষমাণ" | "নিশ্চিত" | "বাতিল";

export interface DashboardBooking {
  id: string;
  date: string; // বাংলা তারিখ (যেমন: "১২ জুন, ২০২৫")
  partyName: string; // কৃষক/মালিক এর নাম
  partyRole: "জমির মালিক" | "কৃষক";
  partyLocation: string;
  partyPhone: string; // ইংরেজি সংখ্যায়
  work: string;
  days: number;
  amount: number; // মোট টাকা (BDT)
  status: BookingStatus;
  notes: string;
}

export interface DashboardMessage {
  id: string;
  senderName: string;
  senderRole: "জমির মালিক" | "কৃষক";
  location: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: {
    id: string;
    from: "them" | "me";
    text: string;
    time: string;
  }[];
}

export type DashboardTab =
  | "overview"
  | "profile"
  | "bookings"
  | "messages"
  | "settings";
