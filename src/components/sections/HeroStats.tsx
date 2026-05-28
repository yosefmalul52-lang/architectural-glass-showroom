"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MOTION_EASE } from "@/lib/motion";

const STATS = [
  { label: "דיוק במפרט הנדסי", target: 100, suffix: "%" },
  { label: "פרויקטים ייחודיים", target: 50, suffix: "+" },
  { label: "שנות ניסיון ומומחיות", target: 7, suffix: "+" },
] as const;

const START_DELAY_MS = 2100;

function StatPillar({
  target,
  suffix,
  label,
  runId,
  index,
}: {
  target: number;
  suffix: string;
  label: string;
  runId: number;
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
    // Re-run counter animation whenever this stat block re-enters viewport.
    motionVal.set(0);
    setDisplay(`0${suffix}`);
    const t = window.setTimeout(() => motionVal.set(target), 180 + index * 120);
    return () => window.clearTimeout(t);
  }, [runId, target, motionVal, reduced, suffix, index]);

  useMotionValueEvent(spring, "change", (v) => {
    if (reduced) return;
    setDisplay(`${Math.round(v)}${suffix}`);
  });

  return (
    <div className="flex w-[4.6rem] flex-col items-center text-center sm:w-[5rem] md:w-[5.5rem]">
      <span className="block w-full font-[family-name:var(--font-cormorant)] text-[2rem] font-light tabular-nums tracking-tight text-black sm:text-4xl lg:text-5xl">
        {display}
      </span>
      <span
        className={`mt-1.5 block w-full text-balance font-[family-name:var(--font-assistant)] text-xs font-light leading-tight tracking-wide text-[#C7B29A] lg:text-sm ${
          suffix === "%" ? "mx-auto max-w-[6.25rem]" : "max-w-[8.5rem] lg:max-w-[9.5rem]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function HeroStats() {
  const [runId, setRunId] = useState(0);
  const [startedOnce, setStartedOnce] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(statsRef, { amount: 0.2, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!isInView) return;
    const delay = startedOnce ? 120 : START_DELAY_MS;
    const t = window.setTimeout(() => {
      setRunId((id) => id + 1);
      setStartedOnce(true);
    }, delay);
    return () => window.clearTimeout(t);
  }, [isInView, startedOnce]);

  return (
    <motion.div
      ref={statsRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 0.8, ease: MOTION_EASE }}
      className="flex w-full max-w-[20.5rem] flex-row-reverse items-center justify-between sm:max-w-[23rem] md:w-auto md:max-w-none md:justify-end md:gap-9 lg:gap-12"
      aria-label="נתוני חברה"
    >
      {STATS.map((stat, index) => (
        <StatPillar
          key={stat.label}
          target={stat.target}
          suffix={stat.suffix}
          label={stat.label}
          runId={runId}
          index={index}
        />
      ))}
    </motion.div>
  );
}
