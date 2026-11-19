import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // বাংলাদেশ পতাকা-অনুপ্রাণিত নতুন ডিজাইন টোকেন
        flag: {
          green: {
            50: "#E6F2EE",
            100: "#C2E0D5",
            500: "#00875A",
            600: "#006A4E",
            700: "#004D38",
            900: "#002A1F",
          },
          red: {
            50: "#FEE9EC",
            100: "#FCD1D7",
            500: "#F42A41",
            600: "#C41E32",
            700: "#9B1626",
          },
          gold: {
            400: "#EAB308",
            600: "#CA8A04",
          },
        },
        // সরাসরি Tailwind green / red / gold ইউটিলিটি ম্যাপিং
        green: {
          50: "#E6F2EE",
          100: "#C2E0D5",
          500: "#00875A",
          600: "#006A4E",
          700: "#004D38",
          900: "#002A1F",
        },
        red: {
          50: "#FEE9EC",
          100: "#FCD1D7",
          500: "#F42A41",
          600: "#C41E32",
          700: "#9B1626",
        },
        gold: {
          400: "#EAB308",
          600: "#CA8A04",
        },
        // সিম্যান্টিক টোকেন
        bg: "#FAF7F2",
        surface: "#FFFFFF",
        border: "#E5E0D8",
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#57534E",
        },
        muted: "#57534E",
        // পুরোনো টোকেন অ্যালিয়াস (নতুন মানসহ সামঞ্জস্যতার জন্য রাখা হয়েছে)
        primary: {
          DEFAULT: "#006A4E",
          dark: "#004D38",
          light: "#C2E0D5",
          subtle: "#E6F2EE",
        },
        accent: {
          DEFAULT: "#EAB308",
          dark: "#CA8A04",
          light: "#FEF9C3",
        },
        earth: {
          DEFAULT: "#92400E",
          light: "#FEF3C7",
        },
        cream: "#FAF7F2",
        line: "#E5E0D8",
      },
      fontFamily: {
        bangla: ["var(--font-hind-siliguri)", "sans-serif"],
        english: ["var(--font-inter)", "sans-serif"],
        sans: ["var(--font-hind-siliguri)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(26, 26, 26, 0.06), 0 1px 2px -1px rgba(26, 26, 26, 0.05)",
        lift: "0 10px 25px -5px rgba(0, 106, 78, 0.12), 0 4px 10px -4px rgba(26, 26, 26, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
