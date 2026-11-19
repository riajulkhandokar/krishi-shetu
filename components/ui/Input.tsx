import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

/**
 * বড় ট্যাপ টার্গেট (min-h-12), স্পষ্ট বাংলা লেবেল ও ফোকাস রিংসহ ইনপুট কম্পোনেন্ট
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightSlot,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? props.name ?? generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-semibold text-[#1A1A1A] font-bangla"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#57534E]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error) || undefined}
            className={cn(
              "w-full min-h-12 rounded-xl bg-white border border-[#E5E0D8] px-4 py-3 text-base text-[#1A1A1A] placeholder:text-[#57534E]/70 font-bangla transition-colors",
              "focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
              "disabled:bg-[#FAF7F2] disabled:cursor-not-allowed",
              leftIcon && "pl-11",
              rightSlot && "pr-12",
              error && "border-red-600 focus:border-red-600 focus:ring-red-600/30",
              className
            )}
            {...props}
          />
          {rightSlot && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {rightSlot}
            </div>
          )}
        </div>
        {error ? (
          <p role="alert" className="text-xs font-medium text-red-600 font-bangla">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#57534E] font-bangla">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
