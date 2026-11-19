"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_DASHBOARD_USER } from "@/data/dashboard";
import type { AuthRole, MockAuthUser } from "@/types";

const AUTH_FLAG_KEY = "krishi_shetu_auth_logged_in";
const AUTH_USER_KEY = "krishi_shetu_auth_user";

interface LoginPayload {
  role: AuthRole;
  phone?: string;
  name?: string;
}

interface RegisterPayload {
  name: string;
  role: AuthRole;
  phone: string;
  email: string;
  district: string;
  upazila: string;
  village: string;
  skills: string[];
  dailyWage: number;
}

interface AuthContextValue {
  user: MockAuthUser;
  isLoggedIn: boolean;
  hydrated: boolean;
  login: (payload: LoginPayload) => MockAuthUser;
  register: (payload: RegisterPayload) => MockAuthUser;
  updateProfile: (patch: Partial<MockAuthUser>) => MockAuthUser;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: DEFAULT_DASHBOARD_USER,
  isLoggedIn: false,
  hydrated: false,
  login: () => DEFAULT_DASHBOARD_USER,
  register: () => DEFAULT_DASHBOARD_USER,
  updateProfile: () => DEFAULT_DASHBOARD_USER,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * বাংলা অঙ্ককে ইংরেজি অঙ্কে রূপান্তর (ফোন নম্বর সংরক্ষণের জন্য)
 */
export function normalizePhoneToEnglish(raw: string): string {
  const bnMap: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  const digits = raw
    .replace(/[০-৯]/g, (d) => bnMap[d] ?? d)
    .replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return raw.trim() || DEFAULT_DASHBOARD_USER.phone;
}

/**
 * ক্লায়েন্ট-সাইড মক অথেনটিকেশন প্রোভাইডার (localStorage ভিত্তিক)
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockAuthUser>(DEFAULT_DASHBOARD_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const flag = window.localStorage.getItem(AUTH_FLAG_KEY);
      const savedUser = window.localStorage.getItem(AUTH_USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as MockAuthUser;
        if (parsed && parsed.name) {
          setUser(parsed);
        }
      }
      setIsLoggedIn(flag === "true");
    } catch {
      // localStorage অনুপলব্ধ হলে ডিফল্ট ডেটা ব্যবহার করা
    } finally {
      setHydrated(true);
    }
  }, []);

  const persist = (nextUser: MockAuthUser, loggedInFlag: boolean) => {
    setUser(nextUser);
    setIsLoggedIn(loggedInFlag);
    try {
      window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
      window.localStorage.setItem(AUTH_FLAG_KEY, loggedInFlag ? "true" : "false");
    } catch {
      // স্টোরেজ কোটা পূর্ণ বা নিষ্ক্রিয় হলে নীরবে উপেক্ষা
    }
  };

  const login = (payload: LoginPayload): MockAuthUser => {
    const formattedPhone = payload.phone
      ? normalizePhoneToEnglish(payload.phone)
      : user.phone || DEFAULT_DASHBOARD_USER.phone;

    const nextUser: MockAuthUser = {
      ...DEFAULT_DASHBOARD_USER,
      ...user,
      role: payload.role,
      phone: formattedPhone,
      name: payload.name?.trim() || user.name || DEFAULT_DASHBOARD_USER.name,
    };

    persist(nextUser, true);
    return nextUser;
  };

  const register = (payload: RegisterPayload): MockAuthUser => {
    const formattedPhone = normalizePhoneToEnglish(payload.phone);
    const nextUser: MockAuthUser = {
      id: `user-${Date.now()}`,
      name: payload.name.trim() || DEFAULT_DASHBOARD_USER.name,
      role: payload.role,
      phone: formattedPhone,
      email: payload.email.trim() || "user@krishishetu.com.bd",
      district: payload.district || "ময়মনসিংহ",
      upazila: payload.upazila.trim() || "সদর",
      village: payload.village.trim() || "মধ্যপাড়া",
      skills: payload.skills.length > 0 ? payload.skills : ["ধান চাষ"],
      dailyWage: payload.role === "farmer" ? payload.dailyWage || 600 : 0,
      availability: "সক্রিয়",
      bio:
        payload.role === "farmer"
          ? `${payload.district} জেলার দক্ষ কৃষক। ${payload.skills.join(", ")} কাজে অভিজ্ঞ।`
          : `${payload.district} জেলার জমির মালিক। দক্ষ কৃষক ও আধুনিক কৃষি সেবা খুঁজছি।`,
      avatar:
        payload.role === "farmer"
          ? "/images/farmers/farmer-1.jpg"
          : "/images/farmers/farmer-7.jpg",
      verified: true,
      rating: 4.9,
    };

    persist(nextUser, true);
    return nextUser;
  };

  const updateProfile = (patch: Partial<MockAuthUser>): MockAuthUser => {
    const nextUser: MockAuthUser = {
      ...user,
      ...patch,
      phone: patch.phone ? normalizePhoneToEnglish(patch.phone) : user.phone,
    };
    persist(nextUser, true);
    return nextUser;
  };

  const logout = () => {
    setIsLoggedIn(false);
    try {
      window.localStorage.removeItem(AUTH_FLAG_KEY);
    } catch {
      // উপেক্ষা
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        hydrated,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
