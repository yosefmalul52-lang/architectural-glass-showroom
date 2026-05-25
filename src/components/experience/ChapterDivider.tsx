"use client";

import { motion } from "framer-motion";
import { funnelSections } from "@/data/funnel";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";

interface ChapterDividerProps {
  beforeSectionId: string;
}

export function ChapterDivider({ beforeSectionId }: ChapterDividerProps) {
  const section = funnelSections.find((s) => s.id === beforeSectionId);
  if (!section) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      variants={fadeUpVariants}
      className="relative mx-auto max-w-[1400px] px-6 py-12 lg:px-10"
      aria-hidden
    >
      <div className="flex items-center gap-6">
        <span className="font-display text-sm tracking-[0.2em] text-brand-gold">
          {section.number}
        </span>
        <div className="rule-gold h-px flex-1" />
        <span className="text-xs tracking-[0.14em] text-text-muted">{section.label}</span>
      </div>
    </motion.div>
  );
}
