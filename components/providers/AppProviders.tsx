"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { AuthModalProvider } from "@/components/modals/AuthModalContext";
import { AuthProvider } from "@/components/providers/AuthProvider";

/**
 * গ্লোবাল ক্লায়েন্ট প্রোভাইডারসমূহ:
 * - AuthProvider (localStorage মক অথেনটিকেশন)
 * - AuthModalProvider (বিদ্যমান মডাল সামঞ্জস্যতা)
 * - react-hot-toast Toaster (টপ-সেন্টার বাংলা নোটিফিকেশন)
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthModalProvider>
        {children}
        <Toaster
          position="top-center"
          gutter={10}
          toastOptions={{
            duration: 3500,
            style: {
              background: "#FFFFFF",
              color: "#1A1A1A",
              border: "1px solid #E5E0D8",
              borderRadius: "16px",
              padding: "12px 18px",
              fontFamily: 'var(--font-hind-siliguri), "Hind Siliguri", sans-serif',
              fontSize: "15px",
              fontWeight: 600,
              boxShadow: "0 10px 25px -5px rgba(26, 26, 26, 0.12)",
            },
            success: {
              iconTheme: {
                primary: "#006A4E",
                secondary: "#FFFFFF",
              },
              style: {
                borderColor: "#C2E0D5",
                background: "#E6F2EE",
                color: "#004D38",
              },
            },
            error: {
              iconTheme: {
                primary: "#C41E32",
                secondary: "#FFFFFF",
              },
              style: {
                borderColor: "#FCD1D7",
                background: "#FEE9EC",
                color: "#9B1626",
              },
            },
          }}
        />
      </AuthModalProvider>
    </AuthProvider>
  );
}
