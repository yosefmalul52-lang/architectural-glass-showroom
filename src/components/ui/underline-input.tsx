"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface UnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const UnderlineInput = React.forwardRef<HTMLInputElement, UnderlineInputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id ?? label.replace(/\s/g, "-");
    return (
      <div className="group relative w-full border-b border-hairline pb-1 transition-all duration-500 focus-within:border-brand-gold focus-within:pb-2">
        <label
          htmlFor={inputId}
          className="mb-2 block text-xs tracking-[0.1em] text-text-muted"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "min-h-[48px] w-full bg-transparent text-base text-text-main outline-none placeholder:text-text-muted/50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
UnderlineInput.displayName = "UnderlineInput";

export { UnderlineInput };
