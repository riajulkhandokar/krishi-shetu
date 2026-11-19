import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline-white"
  | "white"
  | "accent"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-sm hover:shadow-md border border-transparent",
  secondary:
    "bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50 active:scale-95",
  "outline-white":
    "bg-white/10 text-white border-2 border-white/80 backdrop-blur-sm hover:bg-white hover:text-green-700 active:scale-95",
  white:
    "bg-white text-green-700 hover:bg-bg active:scale-95 shadow-sm hover:shadow-md border border-transparent",
  accent:
    "bg-gold-400 text-ink hover:bg-gold-600 active:scale-95 shadow-sm hover:shadow-md border border-transparent",
  ghost:
    "bg-transparent text-ink hover:bg-border/60 active:scale-95 border border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm gap-1.5",
  md: "min-h-12 px-6 py-3 text-base gap-2",
  lg: "min-h-14 px-8 py-3.5 text-lg gap-2.5",
};

/**
 * কৃষি সেতু গ্লোবাল বাটন কম্পোনেন্ট
 * - বড় ট্যাপ টার্গেট (min-h-12)
 * - মাইক্রো-অ্যানিমেশন (active:scale-95)
 * - দৃশ্যমান ফোকাস রিং (ring-2 ring-green-600) ও অ্যাক্সেসিবল aria-label
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const computedAriaLabel =
      ariaLabel ?? (typeof children === "string" ? children : undefined);

    const classes = cn(
      "inline-flex items-center justify-center font-bangla font-semibold rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link href={href} aria-label={computedAriaLabel} className={classes}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-label={computedAriaLabel}
        className={classes}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
