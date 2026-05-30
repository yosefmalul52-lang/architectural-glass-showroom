"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeadingAccentAlign = "start" | "center" | "end";

interface HeadingAccentProps {
  align?: HeadingAccentAlign;
  /** @deprecated size is ignored — kept for API compat */
  size?: "default" | "sm";
  /** tone="light" for dark backgrounds (e.g. Hero) */
  tone?: "default" | "light";
  /** override accent color (hex/css color) */
  color?: string;
  /** override diamond color; defaults to `color` */
  diamondColor?: string;
  className?: string;
  animated?: boolean;
}

const containerAlign: Record<HeadingAccentAlign, string> = {
  start:  "justify-start",
  center: "justify-center",
  end:    "justify-end",
};

const GOLD      = "#C8B49B";
const GOLD_RGBA = "rgba(200,180,155,0.4)";
const WHITE     = "rgba(255,255,255,0.45)";

/** Diamond + flanking hairlines architectural divider */
export function HeadingAccent({
  align = "start",
  tone = "default",
  color,
  diamondColor,
  className,
  animated = true,
}: HeadingAccentProps) {
  const lineColor  = color ?? (tone === "light" ? WHITE : GOLD);
  const markerColor = diamondColor ?? color ?? GOLD;
  const lineOpacity = color && diamondColor ? 0.55 : 0.3;
  const glowColor  = diamondColor
    ? `${diamondColor}66`
    : color
      ? `${color}66`
      : tone === "light"
        ? "rgba(255,255,255,0.25)"
        : GOLD_RGBA;

  const lineMotion = animated
    ? {
        initial:    { width: 0, opacity: 0 },
        whileInView:{ width: "40px", opacity: lineOpacity },
        viewport:   { once: true },
        transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] },
      }
    : { style: { width: "40px", opacity: lineOpacity } };

  const diamondMotion = animated
    ? {
        initial:    { scale: 0, rotate: 45 },
        whileInView:{ scale: 1,  rotate: 45 },
        viewport:   { once: true },
        transition: { duration: 0.5, delay: 0.3, ease: "backOut" as const },
      }
    : { style: { rotate: 45 } };

  return (
    <div
      className={cn(
        "my-6 flex items-center gap-3 select-none pointer-events-none",
        containerAlign[align],
        className
      )}
      aria-hidden
    >
      <motion.div
        {...lineMotion}
        className="h-px shrink-0"
        style={{ backgroundColor: lineColor }}
      />
      <motion.div
        {...diamondMotion}
        className="h-2 w-2 shrink-0"
        style={{
          backgroundColor: markerColor,
          boxShadow: `0 0 8px ${glowColor}`,
          ...(animated ? {} : { transform: "rotate(45deg)" }),
        }}
      />
      <motion.div
        {...lineMotion}
        className="h-px shrink-0"
        style={{ backgroundColor: lineColor }}
      />
    </div>
  );
}
