"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MOTION_EASE } from "@/lib/motion";

const STATS = [
  { lines: ["דיוק במפרט", "הנדסי"], target: 100, suffix: "%" },
  { lines: ["פרויקטים", "ייחודיים"], target: 50, suffix: "+" },
  { lines: ["שנות ניסיון", "ומומחיות"], target: 7, suffix: "+" },
] as const;

const START_DELAY_MS = 2100;

function StatPillar({
  target,
  suffix,
  lines,
  runId,
  index,
}: {
  target: number;
  suffix: string;
  lines: readonly [string, string];
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
    <div className="flex min-w-0 flex-col items-start text-right">
      <span className="block w-full text-right font-[family-name:var(--font-playfair)] text-[1.5rem] font-bold tabular-nums tracking-tight text-brand-gold sm:text-3xl lg:text-4xl">
        {display}
      </span>
      <span className="relative mt-1.5 block w-full text-right font-[family-name:var(--font-assistant)] text-xs font-light leading-snug tracking-wide text-white lg:text-sm">
        <span className="block">{lines[0]}</span>
        <span className="block">{lines[1]}</span>
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
      className="relative inline-flex w-fit max-w-full flex-col items-start pt-3 lg:pt-4"
      aria-label="נתוני חברה"
    >
      <div
        className="absolute top-0 right-0 -left-2 h-px bg-[#c5a059]/20 sm:-left-2.5"
        aria-hidden
      />
      <div className="flex flex-row flex-wrap items-start justify-start gap-x-8 gap-y-4 sm:gap-x-9 lg:gap-x-12">
        {STATS.map((stat, index) => (
          <StatPillar
            key={stat.lines.join("-")}
            target={stat.target}
            suffix={stat.suffix}
            lines={stat.lines}
            runId={runId}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
