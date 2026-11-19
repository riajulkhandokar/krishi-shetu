"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * প্রতিটি পেজে মসৃণ ফেড-ইন মাইক্রো-অ্যানিমেশন
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}
