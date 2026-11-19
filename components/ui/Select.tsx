import React, { useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

/**
 * স্পষ্ট বাংলা ড্রপডাউন সিলেক্ট কম্পোনেন্ট (min-h-12 ও ফোকাস রিংসহ)
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? props.name ?? generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold text-[#1A1A1A] font-bangla"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={Boolean(error) || undefined}
            className={cn(
              "w-full min-h-12 appearance-none rounded-xl bg-white border border-[#E5E0D8] pl-4 pr-11 py-3 text-base text-[#1A1A1A] font-bangla transition-colors cursor-pointer",
              "focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
              error && "border-red-600 focus:border-red-600 focus:ring-red-600/30",
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#57534E]"
            aria-hidden="true"
          />
        </div>
        {error && (
          <p role="alert" className="text-xs font-medium text-red-600 font-bangla">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
