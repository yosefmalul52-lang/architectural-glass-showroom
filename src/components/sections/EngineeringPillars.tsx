"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { engineeringPillars } from "@/data/pillars";
import { ArchitecturalGrid } from "@/components/editorial/ArchitecturalGrid";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import {
  scrollRevealViewport,
  headingContainerVariant,
  headingLineVariant,
} from "@/lib/motion";

const E = [0.16, 1, 0.3, 1] as const;

const titleLines = [
  { text: "הפרטים שמייחדים פרויקט זכוכית", weight: "light" as const, color: "text-heading-light" },
  { text: "שנעשה נכון", weight: "semibold" as const, color: "text-accent-teal" },
];

function PillarsHeader() {
  return (
    <header className="relative mb-12 text-center md:mb-14">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          variants={headingContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          className="font-display text-display-4xl tracking-tight lg:text-display-5xl"
        >
          {titleLines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <motion.span
                className={`block ${line.weight === "semibold" ? "font-semibold" : "font-light"} ${line.color}`}
                variants={headingLineVariant}
                transition={{ duration: 0.88, ease: E, delay: i * 0.1 }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        <HeadingAccent align="center" className="mx-auto" color="#000000" diamondColor="var(--accent-teal)" />
      </div>
    </header>
  );
}

function PillarCard({
  pillar,
  fromRight,
  dotOnLeft,
  delay,
}: {
  pillar: (typeof engineeringPillars)[number];
  fromRight: boolean;
  dotOnLeft: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px", amount: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: fromRight ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromRight ? 40 : -40 }}
      transition={{ duration: 0.75, ease: E, delay }}
      className="card-surface card-surface-interactive group relative overflow-hidden border border-black/25 transition-[border-color,box-shadow] duration-500 hover:border-black/50"
    >
      {/* Top gradient stripe */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/35 to-transparent transition-all duration-500 group-hover:via-black/55" />

      {/* Left gradient stripe */}
      <div className="pointer-events-none absolute inset-y-0 start-0 w-px bg-gradient-to-b from-transparent via-black/35 to-transparent transition-all duration-500 group-hover:via-black/55" aria-hidden />

      {/* Right gradient stripe */}
      <div className="pointer-events-none absolute inset-y-0 end-0 w-px bg-gradient-to-b from-transparent via-black/35 to-transparent transition-all duration-500 group-hover:via-black/55" aria-hidden />

      {/* Dot connector toward center line — desktop only */}
      <div
        className="absolute top-1/2 hidden h-2 w-2 -translate-y-1/2 bg-accent-teal/40 transition-all duration-500 group-hover:bg-accent-teal md:block"
        style={{
          left:  dotOnLeft  ? "calc(-3.5rem - 4px)" : "auto",
          right: !dotOnLeft ? "calc(-3.5rem - 4px)" : "auto",
        }}
        aria-hidden
      />

      {/* Ghost number watermark — background only */}
      <span
        className="pointer-events-none absolute bottom-0 start-1 select-none font-latin font-light italic leading-[0.9] text-text-main/[0.05]"
        style={{ fontSize: "clamp(4rem, 8vw, 6.5rem)" }}
        aria-hidden
      >
        {pillar.number}
      </span>

      <div className="relative p-5 lg:p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-text-main lg:text-xl">
          {pillar.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-muted">{pillar.description}</p>

        <div className="mt-4 h-px w-full bg-brand-gold/40" />
        <p className="mt-3 font-latin text-sm font-light italic leading-relaxed tracking-wide text-accent-teal/80">{pillar.proof}</p>
      </div>

      {/* Bottom gradient stripe */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/35 to-transparent transition-all duration-500 group-hover:via-black/55" />
    </motion.article>
  );
}

export function EngineeringPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 25%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const rightCol = engineeringPillars.filter((_, i) => i % 2 === 0);
  const leftCol  = engineeringPillars.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="pillars"
      data-funnel-step="value"
      className="relative border-b border-black bg-bg-primary pt-0 pb-14 lg:pb-20"
    >
      <ArchitecturalGrid opacity={0.13} />
      <div
        ref={sectionRef}
        className="relative mx-auto max-w-[1400px] px-6 pt-[clamp(3rem,5.5vw,6rem)] lg:px-10"
      >
        <PillarsHeader />

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical thread */}
          <div
            className="absolute inset-y-0 hidden w-px md:block"
            style={{ left: "50%", transform: "translateX(-50%)" }}
            aria-hidden
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-accent-teal/55 via-brand-gold/30 to-transparent"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-x-12 lg:gap-x-14">
            {/* Right column */}
            <div className="flex flex-col gap-4">
              {rightCol.map((pillar, i) => (
                <PillarCard
                  key={pillar.id}
                  pillar={pillar}
                  fromRight
                  dotOnLeft
                  delay={0.05 + i * 0.12}
                />
              ))}
            </div>

            {/* Left column — offset downward */}
            <div className="flex flex-col gap-4 md:mt-16 lg:mt-20">
              {leftCol.map((pillar, i) => (
                <PillarCard
                  key={pillar.id}
                  pillar={pillar}
                  fromRight={false}
                  dotOnLeft={false}
                  delay={0.05 + i * 0.12}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
