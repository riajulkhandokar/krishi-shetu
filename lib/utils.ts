import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS ক্লাস নিরাপদে মার্জ করার ইউটিলিটি
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
