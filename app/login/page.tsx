import type { Metadata } from "next";
import { LoginClient } from "@/components/auth/LoginClient";

export const metadata: Metadata = {
  title: "প্রবেশ করুন",
  description:
    "কৃষি সেতু অ্যাকাউন্টে প্রবেশ করুন — কৃষক, জমির মালিক ও অ্যাডমিন পোর্টাল।",
};

export default function LoginPage() {
  return <LoginClient />;
}
