import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "ড্যাশবোর্ড",
  description:
    "কৃষি সেতু ব্যবহারকারী ড্যাশবোর্ড — বুকিং, আয়, প্রোফাইল ও বার্তা পরিচালনা করুন।",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
