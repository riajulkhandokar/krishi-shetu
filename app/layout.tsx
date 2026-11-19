import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://krishishetu.com.bd"),
  title: {
    default: "কৃষি সেতু — কৃষক ও জমির মালিকের সেতু",
    template: "%s | কৃষি সেতু",
  },
  description:
    "বাংলাদেশের কৃষক, কৃষি শ্রমিক এবং জমির মালিকদের সরাসরি সংযোগের বিশ্বস্ত মার্কেটপ্লেস। ন্যায্য দৈনিক মজুরিতে দক্ষ কৃষক, ট্রাক্টর, পাওয়ার টিলার, জমি ভাড়া ও কৃষি সেবা খুঁজুন দেশের ৬৪ জেলায়।",
  keywords: [
    "কৃষি সেতু",
    "কৃষক",
    "কৃষি শ্রমিক",
    "জমির মালিক",
    "দৈনিক মজুরি",
    "ধান চাষ",
    "ধান কাটা",
    "ট্রাক্টর ভাড়া",
    "জমি ভাড়া",
    "বাংলাদেশ কৃষি",
  ],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "কৃষি সেতু — কৃষক ও জমির মালিকের সেতু",
    description:
      "দক্ষ কৃষক, কৃষি শ্রমিক ও জমির মালিকদের সরাসরি সংযোগ। ন্যায্য দৈনিক মজুরিতে দেশের ৬৪ জেলায় বিশ্বস্ত কৃষি সেবা।",
    type: "website",
    locale: "bn_BD",
    siteName: "কৃষি সেতু",
    images: [
      {
        url: "/images/hero-paddy-field.jpg",
        width: 1200,
        height: 630,
        alt: "কৃষি সেতু — বাংলাদেশের সবুজ ধানক্ষেত ও কৃষক",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "কৃষি সেতু — কৃষক ও জমির মালিকের সেতু",
    description:
      "দক্ষ কৃষক ও জমির মালিকদের সরাসরি সংযোগের বিশ্বস্ত কৃষি মার্কেটপ্লেস।",
    images: ["/images/hero-paddy-field.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Fonts থেকে Hind Siliguri (বাংলা) ও Inter (ইংরেজি) লোড */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A1A1A] font-bangla antialiased">
        <AppProviders>
          <SiteChrome>{children}</SiteChrome>
        </AppProviders>
      </body>
    </html>
  );
}
