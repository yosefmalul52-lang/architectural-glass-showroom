"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ className, label, id, ...props }, ref) => {
  const inputId = id ?? label.replace(/\s/g, "-");
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        id={inputId}
        placeholder=" "
        className={cn(
          "peer min-h-[56px] w-full rounded-sm border border-text-main/15 bg-bg-primary px-4 pt-6 pb-2 text-base text-text-main transition-colors focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20",
          className
        )}
        {...props}
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-brand-teal peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
