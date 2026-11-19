import type { ServiceCategory, Testimonial } from "@/types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "paddy",
    label: "ধান চাষ",
    iconName: "Wheat",
    description: "বোরো, আমন ও আউশ ধানের বীজতলা তৈরি, রোপণ এবং সার্বিক পরিচর্যা।",
    activeFarmersCount: 1420,
    avgDailyWage: 650,
  },
  {
    id: "vegetables",
    label: "সবজি চাষ",
    iconName: "Sprout",
    description: "মৌসুমি ও বারোমাসি শাকসবজি আবাদ, মাচা তৈরি এবং নিরাপদ ফসল উৎপাদন।",
    activeFarmersCount: 980,
    avgDailyWage: 580,
  },
  {
    id: "fisheries",
    label: "মাছ চাষ",
    iconName: "Fish",
    description: "পুকুর প্রস্তুতি, পোনা মজুদ, খাদ্য ব্যবস্থাপনা ও আধুনিক মাছ চাষ সেবা।",
    activeFarmersCount: 540,
    avgDailyWage: 700,
  },
  {
    id: "livestock",
    label: "গবাদিপশু পালন",
    iconName: "Beef",
    description: "গরু, ছাগল ও হাঁস-মুরগির খামারের দৈনন্দিন পরিচর্যা ও খাদ্য ব্যবস্থাপনা।",
    activeFarmersCount: 460,
    avgDailyWage: 600,
  },
  {
    id: "tractor",
    label: "ট্রাক্টর সার্ভিস",
    iconName: "Tractor",
    description: "দক্ষ চালকসহ ট্রাক্টর ও পাওয়ার টিলার ভাড়া দিয়ে দ্রুত জমি চাষ।",
    activeFarmersCount: 615,
    avgDailyWage: 850,
  },
  {
    id: "irrigation",
    label: "সেচ সেবা",
    iconName: "Droplets",
    description: "সঠিক সময়ে গভীর ও অগভীর নলকূপের মাধ্যমে জমিতে পরিমিত সেচ ব্যবস্থা।",
    activeFarmersCount: 510,
    avgDailyWage: 620,
  },
  {
    id: "harvesting",
    label: "ফসল কাটা",
    iconName: "Scissors",
    description: "ধান, গম, আলু, পাট ও ভুট্টা সময়মতো কাটা, মাড়াই ও ঘরে তোলার সেবা।",
    activeFarmersCount: 1180,
    avgDailyWage: 650,
  },
  {
    id: "seeds-fertilizer",
    label: "বীজ ও সার",
    iconName: "Package",
    description: "মানসম্মত বীজ বপন, সঠিক মাত্রায় জৈব ও রাসায়নিক সার এবং কীটনাশক প্রয়োগ।",
    activeFarmersCount: 690,
    avgDailyWage: 600,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "হাজী মোঃ মোস্তাফিজুর রহমান",
    role: "জমির মালিক",
    location: "ত্রিশাল, ময়মনসিংহ",
    quote:
      "আমন ধান কাটার মৌসুমে আগে শ্রমিক খুঁজতে খুব ঝামেলা হতো। কৃষি সেতুর মাধ্যমে এক দিনেই এলাকার যাচাইকৃত ৬ জন দক্ষ কৃষক পেয়েছি, মজুরিও ছিল একদম ন্যায্য।",
    rating: 5.0,
    date: "১২ জুন, ২০২৫",
  },
  {
    id: "t-2",
    name: "মোঃ আব্দুল করিম",
    role: "কৃষক",
    location: "ময়মনসিংহ সদর, ময়মনসিংহ",
    quote:
      "আগে কাজের জন্য হাটে গিয়ে অপেক্ষা করতে হতো। এখন জমির মালিকেরা সরাসরি আমাকে ফোন করে কাজ দেন। কোনো দালাল না থাকায় পুরো মজুরি নিজেই পাচ্ছি।",
    rating: 4.9,
    date: "০৯ জুন, ২০২৫",
  },
  {
    id: "t-3",
    name: "সেলিনা আক্তার",
    role: "জমির মালিক",
    location: "ঝিকরগাছা, যশোর",
    quote:
      "আমার সবজি খামারের জন্য বিশ্বস্ত কৃষক ও পাওয়ার টিলার ভাড়া দুটোই এখান থেকে পেয়েছি। বাংলায় সব কিছু স্পষ্ট থাকায় ব্যবহার করা খুবই সহজ।",
    rating: 4.9,
    date: "০৪ জুন, ২০২৫",
  },
];
