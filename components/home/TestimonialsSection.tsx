"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Quote, Star } from "lucide-react";
import { AlponaDivider } from "@/components/ui/AlponaDivider";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/data/homepage";
import { formatBnRating } from "@/lib/bn";

/**
 * ব্যবহারকারীদের অভিজ্ঞতা (Testimonials) — কৃষক ও জমির মালিকদের মতামত
 */
export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="green">বাস্তব অভিজ্ঞতা</Badge>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#1A1A1A] font-bangla">
            কৃষক ও জমির মালিকদের কথা
          </h2>
          <p className="mt-2.5 text-base md:text-lg text-[#57534E] font-bangla">
            যাঁরা নিয়মিত কৃষি সেতুর মাধ্যমে কাজ ও দক্ষ কৃষক খুঁজে পাচ্ছেন,
            তাঁদের অভিজ্ঞতা জানুন
          </p>
          <AlponaDivider className="mt-4" />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                padding="lg"
                hoverLift
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Quote className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-[#FEF9C3] px-3 py-1 text-xs font-bold text-[#854D0E] bn-num">
                      <Star className="h-3.5 w-3.5 fill-[#EAB308] text-[#EAB308]" />
                      <span>{formatBnRating(item.rating)}</span>
                    </div>
                  </div>

                  <p className="text-base text-[#1A1A1A] font-bangla leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar alt={item.name} size="md" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#1A1A1A] font-bangla truncate">
                        {item.name}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-[#57534E] font-bangla truncate">
                        <MapPin className="h-3.5 w-3.5 text-green-600 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <Badge
                      variant={item.role === "কৃষক" ? "green" : "earth"}
                      className="text-[11px]"
                    >
                      {item.role}
                    </Badge>
                    <p className="mt-1 text-[11px] text-[#57534E] font-bangla bn-num">
                      {item.date}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
