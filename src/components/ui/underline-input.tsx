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
    const isInvalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
    return (
      <div
        className={cn(
          "group relative w-full border-b border-brand-gold/70 pb-1 transition-all duration-500 focus-within:border-brand-gold focus-within:pb-2",
          isInvalid && "border-red-700/70"
        )}
      >
        <label
          htmlFor={inputId}
          className="mb-2 block text-xs tracking-[0.1em] text-text-muted"
        >
          {label}
          {props.required && (
            <span className="ms-1 text-red-600" aria-hidden>
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "min-h-[48px] w-full bg-transparent text-base text-text-main outline-none placeholder:text-text-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold",
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
