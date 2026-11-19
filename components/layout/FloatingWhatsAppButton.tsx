"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/8801712345678?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%95%E0%A7%83%E0%A6%B7%E0%A6%BF%20%E0%A6%B8%E0%A7%87%E0%A6%A4%E0%A7%81%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%B8%E0%A6%BE%E0%A6%B9%E0%A6%BE%E0%A6%AF%E0%A7%8D%E0%A6%AF%20%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%AF%E0%A6%BC%E0%A7%8B%E0%A6%9C%E0%A6%A8%E0%A5%A4";

/**
 * সব পাবলিক পেজের নিচে-ডানে ভাসমান সবুজ হোয়াটসঅ্যাপ "হেল্প" বাটন
 */
export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="হোয়াটসঅ্যাপে সাহায্য নিন"
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm sm:text-base font-bold text-white font-bangla shadow-lg shadow-green-600/30 border border-white/20 hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>হেল্প</span>
    </motion.a>
  );
}
