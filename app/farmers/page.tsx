import { redirect } from "next/navigation";

interface FarmersRedirectProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

/**
 * পুরোনো /farmers লিংকগুলো স্বয়ংক্রিয়ভাবে /kishok রুটে রিডাইরেক্ট করে
 */
export default function FarmersRedirectPage({
  searchParams,
}: FarmersRedirectProps) {
  const params = new URLSearchParams();
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim()) {
        params.set(key, value);
      }
    });
  }
  const qs = params.toString();
  redirect(qs ? `/kishok?${qs}` : "/kishok");
}
