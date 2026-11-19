import type {
  DashboardBooking,
  DashboardMessage,
  MockAuthUser,
} from "@/types";

/**
 * ডিফল্ট মক ড্যাশবোর্ড ব্যবহারকারী ("রহিম উদ্দিন")
 * লগইন বা নিবন্ধন না করেই সরাসরি /dashboard ভিজিট করলে এই প্রোফাইল দেখানো হয়
 */
export const DEFAULT_DASHBOARD_USER: MockAuthUser = {
  id: "user-rahim-uddin",
  name: "রহিম উদ্দিন",
  role: "farmer",
  phone: "01712-345678",
  email: "rahim.uddin@krishishetu.com.bd",
  district: "ময়মনসিংহ",
  upazila: "ত্রিশাল",
  village: "কানহর",
  skills: ["ধান চাষ", "ফসল কাটা", "সেচ সেবা", "বীজ ও সার"],
  dailyWage: 650,
  availability: "সক্রিয়",
  bio: "দীর্ঘ ১২ বছর ধরে বোরো ও আমন ধান চাষ, ফসল কাটা এবং সেচ ব্যবস্থাপনায় দক্ষতার সাথে কাজ করছি। সময়মতো ও সততার সাথে কাজ সম্পন্ন করাই আমার লক্ষ্য।",
  avatar: "/images/farmers/farmer-1.jpg",
  verified: true,
  rating: 4.9,
};

/**
 * ড্যাশবোর্ডের "সাম্প্রতিক বুকিং" টেবিলের মক ডেটা
 * স্ট্যাটাস: "অপেক্ষমাণ" | "নিশ্চিত" | "বাতিল"
 */
export const INITIAL_DASHBOARD_BOOKINGS: DashboardBooking[] = [
  {
    id: "bk-101",
    date: "১২ জুন, ২০২৫",
    partyName: "হাজী মোঃ মোস্তাফিজুর রহমান",
    partyRole: "জমির মালিক",
    partyLocation: "ত্রিশাল, ময়মনসিংহ",
    partyPhone: "01715-662211",
    work: "আমন ধান রোপণ ও জমি প্রস্তুত",
    days: 5,
    amount: 3250,
    status: "অপেক্ষমাণ",
    notes: "সকাল ৭টায় উত্তর বিলের ৮ বিঘা জমিতে চারা রোপণ শুরু হবে।",
  },
  {
    id: "bk-102",
    date: "১০ জুন, ২০২৫",
    partyName: "সেলিনা আক্তার",
    partyRole: "জমির মালিক",
    partyLocation: "ঝিকরগাছা, যশোর",
    partyPhone: "01911-334477",
    work: "শাকসবজি চাষ ও সার প্রয়োগ",
    days: 4,
    amount: 2600,
    status: "নিশ্চিত",
    notes: "বেগুন ও পটলের ক্ষেতে জৈব সার ও সেচ দিতে হবে।",
  },
  {
    id: "bk-103",
    date: "৮ জুন, ২০২৫",
    partyName: "মোঃ কামরুল ইসলাম",
    partyRole: "জমির মালিক",
    partyLocation: "ভাঙ্গা, ফরিদপুর",
    partyPhone: "01718-994422",
    work: "ধান কাটা ও মাড়াই",
    days: 6,
    amount: 3900,
    status: "অপেক্ষমাণ",
    notes: "বোরো ধান কাটা ও খলায় মাড়াইয়ের জন্য দক্ষ শ্রমিক প্রয়োজন।",
  },
  {
    id: "bk-104",
    date: "৫ জুন, ২০২৫",
    partyName: "তানভীর আহমেদ চৌধুরী",
    partyRole: "জমির মালিক",
    partyLocation: "শেরপুর, বগুড়া",
    partyPhone: "01819-445588",
    work: "সেচ ও কীটনাশক ছিটানো",
    days: 3,
    amount: 1950,
    status: "নিশ্চিত",
    notes: "সকালের দিকে আলু ও ভুট্টার জমিতে সেচ ও পরিচর্যা।",
  },
  {
    id: "bk-105",
    date: "২ জুন, ২০২৫",
    partyName: "মোঃ নূরুল আমিন ভূঁইয়া",
    partyRole: "জমির মালিক",
    partyLocation: "দাউদকান্দি, কুমিল্লা",
    partyPhone: "01674-552299",
    work: "পাওয়ার টিলার দিয়ে জমি চাষ",
    days: 2,
    amount: 1400,
    status: "বাতিল",
    notes: "বৃষ্টির কারণে জমি চাষের তারিখ পিছিয়ে নেওয়া হয়েছে।",
  },
  {
    id: "bk-106",
    date: "২৮ মে, ২০২৫",
    partyName: "রোকসানা পারভীন",
    partyRole: "জমির মালিক",
    partyLocation: "মিঠাপুকুর, রংপুর",
    partyPhone: "01732-881144",
    work: "পাট কাটা ও জাগ দেওয়া",
    days: 4,
    amount: 2600,
    status: "নিশ্চিত",
    notes: "পুকুরের পাশে পাট জাগ দেওয়ার কাজ সম্পন্ন হয়েছে।",
  },
];

/**
 * ড্যাশবোর্ডের বার্তা (মেসেজ) ট্যাবের মক কথোপকথন
 */
export const INITIAL_DASHBOARD_MESSAGES: DashboardMessage[] = [
  {
    id: "msg-1",
    senderName: "হাজী মোঃ মোস্তাফিজুর রহমান",
    senderRole: "জমির মালিক",
    location: "ত্রিশাল, ময়মনসিংহ",
    avatar: "/images/farmers/farmer-7.jpg",
    lastMessage: "ভাই, আগামী শনিবার সকাল ৭টায় জমিতে আসতে পারবেন তো?",
    time: "সকাল ১০:১৫",
    unread: true,
    messages: [
      {
        id: "m-1-1",
        from: "them",
        text: "আসসালামু আলাইকুম রহিম ভাই, কৃষি সেতু থেকে আপনার নম্বর পেলাম।",
        time: "সকাল ৯:৫০",
      },
      {
        id: "m-1-2",
        from: "me",
        text: "ওয়ালাইকুম আসসালাম হাজী সাহেব। বলুন, কী কাজের জন্য যোগাযোগ করেছেন?",
        time: "সকাল ১০:০২",
      },
      {
        id: "m-1-3",
        from: "them",
        text: "আমার ৮ বিঘা জমিতে আমন ধান রোপণ করতে হবে। আগামী শনিবার সকাল ৭টায় জমিতে আসতে পারবেন তো?",
        time: "সকাল ১০:১৫",
      },
    ],
  },
  {
    id: "msg-2",
    senderName: "সেলিনা আক্তার",
    senderRole: "জমির মালিক",
    location: "ঝিকরগাছা, যশোর",
    avatar: "/images/farmers/farmer-2.jpg",
    lastMessage: "ধন্যবাদ ভাই, সবজি ক্ষেতের কাজ খুব সুন্দর হয়েছে।",
    time: "গতকাল",
    unread: false,
    messages: [
      {
        id: "m-2-1",
        from: "them",
        text: "ধন্যবাদ ভাই, সবজি ক্ষেতের কাজ খুব সুন্দর হয়েছে। পরের মাসে আবার জানাব।",
        time: "গতকাল বিকাল ৫:২০",
      },
      {
        id: "m-2-2",
        from: "me",
        text: "অনেক ধন্যবাদ আপা। প্রয়োজন হলে যেকোনো সময় বুকিং দিন।",
        time: "গতকাল সন্ধ্যা ৬:০৫",
      },
    ],
  },
  {
    id: "msg-3",
    senderName: "মোঃ কামরুল ইসলাম",
    senderRole: "জমির মালিক",
    location: "ভাঙ্গা, ফরিদপুর",
    avatar: "/images/farmers/farmer-5.jpg",
    lastMessage: "ধান কাটার জন্য সাথে আরও ২ জন শ্রমিক আনতে পারবেন?",
    time: "৯ জুন, ২০২৫",
    unread: true,
    messages: [
      {
        id: "m-3-1",
        from: "them",
        text: "রহিম ভাই, আমার ১৫ বিঘা জমির ধান পেকে গেছে। ধান কাটার জন্য সাথে আরও ২ জন শ্রমিক আনতে পারবেন?",
        time: "৯ জুন, ২০২৫",
      },
    ],
  },
];
