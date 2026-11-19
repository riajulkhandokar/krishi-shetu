import type { Farmer, FarmerDetailExtra } from "@/types";
import { farmers } from "@/data/farmers";

/**
 * প্রতিটি কৃষকের বিস্তারিত প্রোফাইল তথ্য (পরিচিতি, কাজের অভিজ্ঞতার টাইমলাইন, প্রশিক্ষণ ও রিভিউ)
 */
const customFarmerDetails: Record<string, Partial<FarmerDetailExtra>> = {
  "farmer-1": {
    detailedBio:
      "আমি মোঃ আব্দুল করিম, ময়মনসিংহ সদর উপজেলার চর নিলক্ষীয়া গ্রামের একজন অভিজ্ঞ কৃষক ও কৃষি শ্রমিক। গত ১৫ বছর ধরে বোরো ও আমন ধান রোপণ, বীজতলা তৈরি, আগাছা দমন এবং সময়মতো ধান কাটার কাজ করে আসছি। বড় জমিতে এককভাবে কিংবা আমার বিশ্বস্ত দলের সাথে দ্রুত ও নিখুঁতভাবে ফসল ঘরে তুলতে সহায়তা করি। জমির মালিকদের সাথে স্বচ্ছ মজুরি ও সময়নিষ্ঠার সাথে কাজ করাই আমার মূল অঙ্গীকার।",
    experienceTimeline: [
      {
        period: "২০২২–২০২৫",
        role: "ধান চাষ ও ধান কাটা",
        location: "ময়মনসিংহ সদর, ময়মনসিংহ",
        description:
          "প্রতি মৌসুমে গড়ে ৫০ বিঘার বেশি জমিতে বোরো ও আমন ধান রোপণ ও কাটার কাজ সফলভাবে সম্পন্ন করেছি।",
      },
      {
        period: "২০১৮–২০২২",
        role: "সেচ ও সার ব্যবস্থাপনা",
        location: "ত্রিশাল, ময়মনসিংহ",
        description:
          "আধুনিক পদ্ধতিতে জমিতে পরিমিত সেচ ও সুষম সার প্রয়োগ করে ধানের ফলন বৃদ্ধিতে ভূমিকা রেখেছি।",
      },
      {
        period: "২০১৩–২০১৮",
        role: "রোপণ ও বীজতলা পরিচর্যা",
        location: "মুক্তাগাছা, ময়মনসিংহ",
        description:
          "উন্নত জাতের বীজ নির্বাচন, সুস্থ চারা উৎপাদন ও সারিবদ্ধভাবে ধানের চারা রোপণের কাজ করেছি।",
      },
    ],
    certificates: [
      {
        title: "কৃষি প্রশিক্ষণ",
        issuer: "উপজেলা কৃষি অফিস, ময়মনসিংহ সদর",
        year: "২০২২",
      },
      {
        title: "জৈব চাষ প্রশিক্ষণ",
        issuer: "বাংলাদেশ কৃষি উন্নয়ন কর্পোরেশন",
        year: "২০২৪",
      },
    ],
    reviews: [
      {
        id: "r-101",
        reviewerName: "হাজী মোঃ মোস্তাফিজুর রহমান",
        reviewerLocation: "ত্রিশাল, ময়মনসিংহ",
        rating: 5,
        date: "১০ জুন, ২০২৫",
        comment:
          "করিম ভাই খুবই সৎ ও পরিশ্রমী। আমার ১৮ বিঘা জমির আমন ধান নির্ধারিত সময়ের আগেই খুব যত্ন করে কেটে ঘরে তুলে দিয়েছেন।",
      },
      {
        id: "r-102",
        reviewerName: "মোঃ আনোয়ার হোসেন",
        reviewerLocation: "ময়মনসিংহ সদর, ময়মনসিংহ",
        rating: 5,
        date: "২৮ মে, ২০২৫",
        comment:
          "সকাল ৭টার মধ্যেই মাঠে চলে আসেন। ধান রোপণের লাইন ও দূরত্ব এত সুন্দর রাখেন যে ফসলের ফলন আগের চেয়ে অনেক ভালো হয়েছে।",
      },
      {
        id: "r-103",
        reviewerName: "শাহানাজ পারভীন",
        reviewerLocation: "ভালুকা, ময়মনসিংহ",
        rating: 4.8,
        date: "১৪ মে, ২০২৫",
        comment:
          "কাজের মান খুবই ভালো এবং দৈনিক মজুরি নিয়ে কোনো ঝামেলা করেননি। আবার মৌসুমে ওনাকে বুকিং করব।",
      },
    ],
  },
  "farmer-2": {
    detailedBio:
      "আমি সুমিত্রা রানী দাস, যশোর সদর উপজেলার চাঁচড়া গ্রামে দীর্ঘ ১১ বছর ধরে নিরাপদ ও বিষমুক্ত শাকসবজি চাষের সাথে যুক্ত। শীতকালীন লাউ, শিম, টমেটো, বাঁধাকপি থেকে শুরু করে গ্রীষ্মকালীন করলা ও পুঁইশাকের মাচা তৈরি এবং জৈব সার প্রয়োগে বিশেষ দক্ষতা রয়েছে। যত্নসহকারে চারা রোপণ ও ফসল সংগ্রহের জন্য এলাকার জমির মালিকদের আস্থা অর্জন করেছি।",
    experienceTimeline: [
      {
        period: "২০২১–২০২৫",
        role: "নিরাপদ শাকসবজি চাষ",
        location: "যশোর সদর, যশোর",
        description:
          "জৈব সার ও ফেরোমন ফাঁদ ব্যবহার করে বিষমুক্ত সবজি উৎপাদন ও ফসল সংগ্রহে কাজ করছি।",
      },
      {
        period: "২০১৮–২০২১",
        role: "বীজ ও চারা উৎপাদন",
        location: "ঝিকরগাছা, যশোর",
        description:
          "উন্নত মানের সবজির বীজ বপন, নার্সারি পরিচর্যা ও মাচা তৈরির কাজ পরিচালনা করেছি।",
      },
      {
        period: "২০১৪–২০১৮",
        role: "মৌসুমি ফসল কাটা ও বাছাই",
        location: "যশোর সদর, যশোর",
        description:
          "বাজারজাতকরণের উপযোগী করে সতেজ শাকসবজি সংগ্রহ ও পরিচ্ছন্নভাবে সংরক্ষণের কাজ করেছি।",
      },
    ],
    certificates: [
      {
        title: "জৈব চাষ প্রশিক্ষণ",
        issuer: "যশোর কৃষি সম্প্রসারণ অধিদপ্তর",
        year: "২০২৩",
      },
      {
        title: "কৃষি প্রশিক্ষণ",
        issuer: "নারী কৃষি উদ্যোক্তা উন্নয়ন প্রকল্প",
        year: "২০২১",
      },
    ],
  },
  "farmer-3": {
    detailedBio:
      "আমি মোঃ রফিকুল ইসলাম, বগুড়া জেলার শেরপুর উপজেলার একজন অভিজ্ঞ কৃষক ও কৃষি যন্ত্রপাতি অপারেটর। আমার নিজস্ব ট্রাক্টর ও পাওয়ার টিলার রয়েছে, যা দিয়ে অল্প সময়ে গভীর ও সমানভাবে জমি চাষ করে দিই। পাশাপাশি বাণিজ্যিক আলু চাষ, সার ব্যবস্থাপনা এবং সঠিক সময়ে সেচ প্রদানে ১৩ বছরের বাস্তব অভিজ্ঞতা রয়েছে।",
    experienceTimeline: [
      {
        period: "২০২০–২০২৫",
        role: "ট্রাক্টর সার্ভিস ও জমি চাষ",
        location: "শেরপুর, বগুড়া",
        description:
          "নিজস্ব ট্রাক্টর ও পাওয়ার টিলার দিয়ে আলু ও ধান আবাদের জন্য দ্রুত জমি প্রস্তুতের সেবা দিচ্ছি।",
      },
      {
        period: "২০১৬–২০২০",
        role: "বাণিজ্যিক আলু চাষ",
        location: "শিবগঞ্জ, বগুড়া",
        description:
          "উন্নত বীজ আলু বপন, মাটি তোলা এবং রোগবালাই দমনে সরাসরি মাঠে কাজ করেছি।",
      },
      {
        period: "২০১২–২০১৬",
        role: "সেচ ও পাম্প পরিচালনা",
        location: "শেরপুর, বগুড়া",
        description:
          "শুকনো মৌসুমে গভীর ও অগভীর নলকূপ পরিচালনা করে জমিতে সুষম সেচ নিশ্চিত করেছি।",
      },
    ],
    certificates: [
      {
        title: "আধুনিক কৃষি যন্ত্রপাতি প্রশিক্ষণ",
        issuer: "বগুড়া পল্লী উন্নয়ন একাডেমি (আরডিএ)",
        year: "২০২২",
      },
      {
        title: "কৃষি প্রশিক্ষণ",
        issuer: "উপজেলা কৃষি অফিস, শেরপুর",
        year: "২০২০",
      },
    ],
  },
};

/**
 * যেকোনো কৃষকের জন্য পূর্ণাঙ্গ প্রোফাইল ডেটা তৈরি করে
 */
export function getFarmerDetail(farmer: Farmer): FarmerDetailExtra {
  const custom = customFarmerDetails[farmer.id];
  const primarySkill = farmer.skills[0] ?? "ধান চাষ";
  const secondarySkill = farmer.skills[1] ?? "ফসল কাটা";
  const tertiarySkill = farmer.skills[2] ?? "বীজ ও সার";

  return {
    detailedBio:
      custom?.detailedBio ??
      `${farmer.bio} আমি ${farmer.location.district} জেলার ${farmer.location.upazila} উপজেলার ${farmer.location.village} গ্রামে নিয়মিত কৃষি কাজ করে আসছি। ${farmer.skills.join(", ")}—এই কাজগুলোতে নিষ্ঠা ও সততার সাথে সেবা দিই। সময়মতো কাজ শুরু করা এবং জমির মালিকের প্রত্যাশা অনুযায়ী যত্নসহকারে ফসল পরিচর্যা করাই আমার প্রধান লক্ষ্য।`,
    workHours: "সকাল ৭টা – বিকাল ৫টা",
    minBookingDays: 1,
    experienceTimeline: custom?.experienceTimeline ?? [
      {
        period: "২০২২–২০২৫",
        role: primarySkill,
        location: `${farmer.location.upazila}, ${farmer.location.district}`,
        description: `${farmer.location.district} অঞ্চলের বিভিন্ন জমিতে দক্ষতার সাথে ${primarySkill} ও পরিচর্যার কাজ করছি।`,
      },
      {
        period: "২০১৯–২০২২",
        role: secondarySkill,
        location: farmer.location.district,
        description: `মৌসুমি ফসলের সঠিক উৎপাদন ও সময়মতো ${secondarySkill} সম্পন্ন করতে জমির মালিকদের সহায়তা করেছি।`,
      },
      {
        period: "২০১৬–২০১৯",
        role: tertiarySkill,
        location: farmer.location.district,
        description: `স্থানীয় খামার ও কৃষিজমিতে নিয়মিত ${tertiarySkill} এবং মাঠ পর্যায়ের কাজে যুক্ত ছিলাম।`,
      },
    ],
    certificates: custom?.certificates ?? [
      {
        title: "কৃষি প্রশিক্ষণ",
        issuer: `উপজেলা কৃষি অফিস, ${farmer.location.upazila}`,
        year: "২০২৩",
      },
      {
        title: "জৈব চাষ প্রশিক্ষণ",
        issuer: "কৃষি সম্প্রসারণ অধিদপ্তর",
        year: "২০২৪",
      },
    ],
    reviews: custom?.reviews ?? [
      {
        id: `${farmer.id}-r1`,
        reviewerName: "মোঃ মাহবুবুর রহমান",
        reviewerLocation: `${farmer.location.upazila}, ${farmer.location.district}`,
        rating: 5,
        date: "১১ জুন, ২০২৫",
        comment: `${farmer.name} অত্যন্ত দায়িত্বশীল ও দক্ষ। ${primarySkill}-এর কাজ খুব পরিচ্ছন্নভাবে ও সময়মতো শেষ করেছেন।`,
      },
      {
        id: `${farmer.id}-r2`,
        reviewerName: "রোকসানা বেগম",
        reviewerLocation: farmer.location.district,
        rating: 4.9,
        date: "২৯ মে, ২০২৫",
        comment:
          "সরাসরি ফোনে কথা বলে দৈনিক মজুরি ঠিক করেছিলাম। কাজের মান ও ব্যবহার দুটোই খুব ভালো লেগেছে।",
      },
      {
        id: `${farmer.id}-r3`,
        reviewerName: "মোঃ সাইফুল ইসলাম",
        reviewerLocation: farmer.location.district,
        rating: 4.7,
        date: "১৬ মে, ২০২৫",
        comment:
          "কাজের ব্যাপারে খুবই আন্তরিক। পরের মৌসুমে আবার জমির কাজের জন্য ওনাকে বুকিং করার পরিকল্পনা আছে।",
      },
    ],
  };
}

/**
 * একই জেলা (অগ্রাধিকার) ও সমধর্মী দক্ষতার ৩ জন সম্পর্কিত কৃষক ফেরত দেয়
 */
export function getRelatedFarmers(current: Farmer, count = 3): Farmer[] {
  const others = farmers.filter((f) => f.id !== current.id);

  const sameDistrict = others.filter(
    (f) => f.location.district === current.location.district
  );
  const sameSkills = others.filter(
    (f) =>
      f.location.district !== current.location.district &&
      f.skills.some((s) => current.skills.includes(s))
  );
  const remaining = others.filter(
    (f) => !sameDistrict.includes(f) && !sameSkills.includes(f)
  );

  return [...sameDistrict, ...sameSkills, ...remaining].slice(0, count);
}
