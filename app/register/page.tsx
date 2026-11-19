import type { Metadata } from "next";
import { RegisterClient } from "@/components/auth/RegisterClient";

export const metadata: Metadata = {
  title: "নিবন্ধন করুন",
  description:
    "কৃষি সেতুতে কৃষক অথবা জমির মালিক হিসেবে বিনামূল্যে নিবন্ধন করুন।",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
