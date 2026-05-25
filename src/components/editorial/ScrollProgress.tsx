"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { funnelSections } from "@/data/funnel";
import { cn } from "@/lib/utils";

const trackedSections = funnelSections.filter((s) => s.id !== "hero");

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeChapter, setActiveChapter] = useState(trackedSections[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    trackedSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveChapter(section);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 right-0 left-0 z-[55] h-px origin-right bg-brand-gold"
        style={{ scaleX }}
        aria-hidden
      />
      <div
        className={cn(
          "fixed top-3 left-1/2 z-[55] hidden -translate-x-1/2 items-center gap-3 md:flex",
          "pointer-events-none"
        )}
        aria-live="polite"
      >
        <span className="font-display text-xs tracking-[0.2em] text-brand-gold">
          {activeChapter.number}
        </span>
        <span className="h-3 w-px bg-hairline" aria-hidden />
        <span className="text-xs tracking-wide text-text-muted">{activeChapter.label}</span>
      </div>
    </>
  );
}
