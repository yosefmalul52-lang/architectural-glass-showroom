import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold:
          "bg-brand-gold text-text-main min-h-[52px] px-8 text-sm tracking-wide hover:brightness-105 hover:shadow-[0_4px_0_0_var(--text-main)] glow-halo-hover",
        outline:
          "bg-transparent text-text-main border border-text-main/20 min-h-[52px] px-8 text-sm hover:border-brand-gold hover:text-text-main",
        teal:
          "bg-brand-teal text-white border border-brand-teal min-h-[48px] px-6 text-sm hover:brightness-110",
        ghost: "bg-transparent text-text-main hover:text-brand-teal",
      },
      size: {
        default: "rounded-none",
        sm: "rounded-none min-h-[40px] px-4 text-xs",
        lg: "rounded-none min-h-[56px] px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
