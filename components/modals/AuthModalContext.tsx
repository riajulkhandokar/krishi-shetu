"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  Leaf,
  Phone,
  Sprout,
  User,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export type AuthMode = "login" | "register";
export type UserRole = "farmer" | "landowner";

interface AuthModalContextValue {
  openAuthModal: (mode?: AuthMode, defaultRole?: UserRole) => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue>({
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

export function useAuthModal() {
  return useContext(AuthModalContext);
}

const DISTRICT_OPTIONS = [
  { value: "ময়মনসিংহ", label: "ময়মনসিংহ" },
  { value: "যশোর", label: "যশোর" },
  { value: "বগুড়া", label: "বগুড়া" },
  { value: "রংপুর", label: "রংপুর" },
  { value: "কুমিল্লা", label: "কুমিল্লা" },
  { value: "নরসিংদী", label: "নরসিংদী" },
  { value: "ফরিদপুর", label: "ফরিদপুর" },
  { value: "রাজশাহী", label: "রাজশাহী" },
  { value: "ঢাকা", label: "ঢাকা" },
];

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [role, setRole] = useState<UserRole>("farmer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openAuthModal = (
    nextMode: AuthMode = "login",
    defaultRole: UserRole = "farmer"
  ) => {
    setMode(nextMode);
    setRole(defaultRole);
    setSubmitted(false);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("সফলভাবে পাঠানো হয়েছে");
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setName("");
    setPhone("");
    setDistrict("");
    setSubmitted(false);
    closeAuthModal();
  };

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            {/* ব্যাকড্রপ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAuthModal}
              className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
            />

            {/* মডাল কার্ড */}
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative z-10 w-full max-w-md rounded-2xl bg-[#FAF7F2] border border-[#E5E0D8] shadow-xl overflow-hidden"
            >
              {/* শীর্ষ হেডার */}
              <div className="flex items-center justify-between bg-green-600 px-6 py-5 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 border border-white/25">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2
                      id="auth-modal-title"
                      className="text-lg font-bold font-bangla leading-snug"
                    >
                      {mode === "login"
                        ? "কৃষি সেতুতে প্রবেশ করুন"
                        : "বিনামূল্যে নিবন্ধন করুন"}
                    </h2>
                    <p className="text-xs text-white/85 font-bangla">
                      কৃষক ও জমির মালিকের বিশ্বস্ত নেটওয়ার্ক
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAuthModal}
                  aria-label="বন্ধ করুন"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <div className="py-6 text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] font-bangla">
                      {mode === "login"
                        ? "যাচাইকরণ কোড পাঠানো হয়েছে"
                        : "নিবন্ধন অনুরোধ গৃহীত হয়েছে"}
                    </h3>
                    <p className="text-sm text-[#57534E] font-bangla">
                      {phone ? (
                        <>
                          আপনার <span className="font-english font-semibold text-[#1A1A1A]">{phone}</span> নম্বরে একটি ওটিপি কোড পাঠানো হয়েছে। পরবর্তী ধাপে পূর্ণাঙ্গ অ্যাকাউন্ট চালু করা যাবে।
                        </>
                      ) : (
                        "ধন্যবাদ! আপনার তথ্য নিরাপদে সংরক্ষিত হয়েছে।"
                      )}
                    </p>
                    <div className="pt-2">
                      <Button variant="primary" fullWidth onClick={resetAndClose}>
                        ঠিক আছে
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* প্রবেশ / নিবন্ধন ট্যাব */}
                    <div className="grid grid-cols-2 rounded-full bg-[#E5E0D8]/60 p-1">
                      <button
                        type="button"
                        aria-label="প্রবেশ করুন"
                        onClick={() => setMode("login")}
                        className={`min-h-10 rounded-full text-sm font-semibold font-bangla transition-all active:scale-95 cursor-pointer ${
                          mode === "login"
                            ? "bg-white text-green-600 shadow-sm"
                            : "text-[#57534E] hover:text-[#1A1A1A]"
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2`}
                      >
                        প্রবেশ করুন
                      </button>
                      <button
                        type="button"
                        aria-label="নিবন্ধন করুন"
                        onClick={() => setMode("register")}
                        className={`min-h-10 rounded-full text-sm font-semibold font-bangla transition-all active:scale-95 cursor-pointer ${
                          mode === "register"
                            ? "bg-white text-green-600 shadow-sm"
                            : "text-[#57534E] hover:text-[#1A1A1A]"
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2`}
                      >
                        নিবন্ধন করুন
                      </button>
                    </div>

                    {/* নিবন্ধনের সময় ভূমিকা নির্বাচন */}
                    {mode === "register" && (
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold text-[#1A1A1A] font-bangla">
                          আপনি কোন হিসেবে যোগ দিতে চান?
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            aria-label="কৃষক বা শ্রমিক হিসেবে নিবন্ধন"
                            onClick={() => setRole("farmer")}
                            className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3.5 text-center transition-all active:scale-95 cursor-pointer ${
                              role === "farmer"
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-[#E5E0D8] bg-white text-[#57534E] hover:border-green-600/40"
                            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2`}
                          >
                            <Sprout className="h-6 w-6" />
                            <span className="text-sm font-bold font-bangla">
                              কৃষক / শ্রমিক
                            </span>
                          </button>
                          <button
                            type="button"
                            aria-label="জমির মালিক হিসেবে নিবন্ধন"
                            onClick={() => setRole("landowner")}
                            className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3.5 text-center transition-all active:scale-95 cursor-pointer ${
                              role === "landowner"
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-[#E5E0D8] bg-white text-[#57534E] hover:border-green-600/40"
                            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2`}
                          >
                            <Users className="h-6 w-6" />
                            <span className="text-sm font-bold font-bangla">
                              জমির মালিক
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                    {mode === "register" && (
                      <Input
                        label="আপনার পূর্ণ নাম"
                        placeholder="যেমন: মোঃ আব্দুল করিম"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        leftIcon={<User className="h-4 w-4" />}
                      />
                    )}

                    <Input
                      label="মোবাইল নম্বর"
                      type="tel"
                      placeholder="01712-345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="font-english"
                      helperText="ইংরেজি সংখ্যায় আপনার ১১ ডিজিটের মোবাইল নম্বর লিখুন"
                      leftIcon={<Phone className="h-4 w-4" />}
                    />

                    {mode === "register" && (
                      <Select
                        label="আপনার জেলা"
                        placeholder="জেলা নির্বাচন করুন"
                        options={DISTRICT_OPTIONS}
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                      />
                    )}

                    <div className="pt-2">
                      <Button type="submit" variant="primary" size="md" fullWidth>
                        {mode === "login"
                          ? "ওটিপি কোড পাঠান"
                          : "নিবন্ধন সম্পন্ন করুন"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AuthModalContext.Provider>
  );
}
