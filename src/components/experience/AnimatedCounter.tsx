"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  variant?: "dark" | "light";
}

function parseValue(value: string): { num: number; suffix: string; prefix: string } {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

export function AnimatedCounter({ value, label, variant = "dark" }: AnimatedCounterProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { prefix, num, suffix } = parseValue(value);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(reduced ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (isInView) motionVal.set(num);
  }, [isInView, num, motionVal, reduced, value]);

  useMotionValueEvent(spring, "change", (v) => {
    if (reduced) return;
    const rounded = suffix.includes("mm") ? v.toFixed(0) : Math.round(v).toString();
    setDisplay(`${prefix}${rounded}${suffix}`);
  });

  const valueClass =
    variant === "light"
      ? "font-display text-3xl font-light text-white md:text-4xl tabular-nums"
      : "font-display text-3xl font-light text-text-main md:text-4xl tabular-nums";
  const labelClass =
    variant === "light"
      ? "mt-1 text-sm tracking-wide text-white/60"
      : "mt-1 text-sm tracking-wide text-text-muted";

  return (
    <div ref={ref}>
      <dt className={valueClass}>{display}</dt>
      <dd className={labelClass}>{label}</dd>
    </div>
  );
}
