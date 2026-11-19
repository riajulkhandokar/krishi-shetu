import { redirect } from "next/navigation";

/**
 * পুরোনো /landowners লিংক স্বয়ংক্রিয়ভাবে /jomir-malik রুটে রিডাইরেক্ট করে
 */
export default function LandownersRedirectPage() {
  redirect("/jomir-malik");
}
