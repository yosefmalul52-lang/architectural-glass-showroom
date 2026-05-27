"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MOTION_EASE } from "@/lib/motion";

const STATS = [
  { label: "פרויקטים ייחודיים", target: 50, suffix: "+" },
  { label: "שנות ניסיון ומומחיות", target: 7, suffix: "+" },
  { label: "דיוק במפרט הנדסי", target: 100, suffix: "%" },
] as const;

const START_DELAY_MS = 2100;

function StatPillar({
  target,
  suffix,
  label,
  start,
  index,
}: {
  target: number;
  suffix: string;
  label: string;
  start: boolean;
  index: number;
}) {
  const reduced = usePrefersReducedMotion();
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 20 });
  const [display, setDisplay] = useState(reduced ? `${target}${suffix}` : `0${suffix}`);

  useEffect(() => {
    if (reduced) {
      setDisplay(`${target}${suffix}`);
      return;
    }
    if (!start) return;
    const t = window.setTimeout(() => motionVal.set(target), index * 120);
    return () => window.clearTimeout(t);
  }, [start, target, motionVal, reduced, suffix, index]);

  useMotionValueEvent(spring, "change", (v) => {
    if (reduced) return;
    setDisplay(`${Math.round(v)}${suffix}`);
  });

  return (
    <div className="flex min-w-[5.5rem] flex-1 flex-col items-center text-center sm:min-w-[6.5rem]">
      <span className="block w-full font-display text-3xl font-light tabular-nums tracking-tight text-black lg:text-4xl">
        {display}
      </span>
      <span className="mt-1.5 block w-full max-w-[8.5rem] text-balance text-xs font-light leading-tight tracking-wide text-[#C7B29A] lg:max-w-[9.5rem] lg:text-sm">
        {label}
      </span>
    </div>
  );
}

export function HeroStats() {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setStart(true), START_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 0.8, ease: MOTION_EASE }}
      className="flex w-full flex-row-reverse items-center justify-end gap-8 sm:gap-10 lg:gap-14"
      aria-label="נתוני חברה"
    >
      {STATS.map((stat, index) => (
        <StatPillar
          key={stat.label}
          target={stat.target}
          suffix={stat.suffix}
          label={stat.label}
          start={start}
          index={index}
        />
      ))}
    </motion.div>
  );
}
