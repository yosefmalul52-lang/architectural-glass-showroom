"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { engineeringPillars } from "@/data/pillars";
import { processSteps } from "@/data/funnel";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { ChapterDivider } from "@/components/experience/ChapterDivider";
import { FunnelCta } from "@/components/conversion/FunnelCta";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0.2, 0.85], [0, 1]);

  return (
    <ol ref={ref} className="relative flex flex-col gap-4 sm:flex-row md:flex-col md:gap-6">
      <motion.div
        className="absolute right-[11px] top-2 bottom-2 w-px origin-top bg-brand-gold/30 md:right-auto md:left-3"
        style={{ scaleY: lineScale }}
        aria-hidden
      />
      {processSteps.map((step) => (
        <li key={step.step} className="relative flex items-center gap-4">
          <span className="relative z-10 font-display text-2xl text-brand-gold">
            {step.step}
          </span>
          <span className="text-sm text-text-main">{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

function PillarArticle({
  pillar,
  index,
}: {
  pillar: (typeof engineeringPillars)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      variants={fadeUpVariants}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative overflow-hidden frame-gold-hover min-h-[280px] border border-hairline bg-bg-elevated transition-all duration-700",
        pillar.span,
        isInView && "ring-1 ring-brand-gold",
        pillar.variant === "watermark" && "bg-bg-secondary"
      )}
      style={{ transitionTimingFunction: "var(--ease-luxury)" }}
    >
      {pillar.variant === "watermark" && (
        <>
          <span
            className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 font-display text-[clamp(8rem,18vw,14rem)] leading-none text-text-main/[0.04] select-none"
            aria-hidden
          >
            {pillar.number}
          </span>
          <div className="relative flex flex-col justify-center gap-8 p-8 md:flex-row md:items-center md:pr-32 lg:p-10">
            <div className="flex-1">
              <span className="font-display text-sm tracking-[0.2em] text-brand-teal">
                {pillar.number}
              </span>
              <h3 className="mt-4 font-display text-display-xl font-light text-text-main lg:text-display-2xl">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-text-muted">
                {pillar.description}
              </p>
            </div>
            <ProcessTimeline />
          </div>
        </>
      )}

      {pillar.variant !== "watermark" && (
        <div className="relative flex h-full flex-col justify-end p-8 lg:p-10">
          <span className="mb-4 font-display text-sm tracking-[0.2em] text-brand-gold">
            {pillar.number}
          </span>
          <div>
            <h3 className="font-display text-display-xl font-light text-text-main lg:text-display-2xl">
              {pillar.title}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-text-muted">
              {pillar.description}
            </p>
            <div className="mt-6 h-px w-12 bg-brand-gold" />
          </div>
        </div>
      )}
    </motion.article>
  );
}

export function EngineeringPillars() {
  return (
    <section
      id="pillars"
      data-funnel-step="value"
      className="relative bg-bg-secondary py-section"
    >
      <ChapterDivider beforeSectionId="pillars" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          number="01"
          label="למה אנחנו"
          title="למה אדריכלים ובעלי בתים בוחרים בסטודיו בוטיק"
          description="דיוק הנדסי, בטיחות מלאה וליווי אדריכלי מהשלב הראשון."
        />

        <div className="grid-12">
          {engineeringPillars.map((pillar, index) => (
            <PillarArticle key={pillar.id} pillar={pillar} index={index} />
          ))}
        </div>

        <FunnelCta step="pillars" />
      </div>
    </section>
  );
}
