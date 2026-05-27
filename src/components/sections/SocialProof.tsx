"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArchitecturalGrid } from "@/components/editorial/ArchitecturalGrid";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { testimonials, trustPillars } from "@/data/social-proof";
import { MOTION_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LUXURY_EASE = MOTION_EASE;
const SLIDE_TRANSITION = {
  duration: 0.65,
  ease: LUXURY_EASE,
} as const;

const quoteVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 20,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -20,
  }),
};

const SWIPE_THRESHOLD = 48;

function NavArrow({
  direction,
  onClick,
  label,
  className,
}: {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
        "border border-accent-teal/50 bg-transparent text-accent-teal/70",
        "transition-colors duration-300 hover:border-accent-teal hover:text-accent-teal",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        {direction === "left" ? (
          <path d="M15 6 9 12l6 6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

function TrustStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: LUXURY_EASE }}
      className="w-full py-2"
      aria-label="עמודי אמון"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {trustPillars.map(({ Icon, title, sub }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: LUXURY_EASE, delay: index * 0.08 }}
            className={cn(
              "flex flex-col items-center px-5 py-2 text-center sm:px-7 lg:px-8",
              index > 0 && "border-s border-hairline",
              (index === 2 || index === 3) && "border-t border-hairline lg:border-t-0"
            )}
          >
            <Icon
              className="mb-3 text-accent-teal"
              size={36}
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="font-display text-lg font-light leading-snug tracking-tight text-text-main lg:text-xl">
              {title}
            </p>
            <p className="type-lead mt-3 leading-relaxed">
              {sub}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const active = testimonials[index];

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStartX.current;
      if (start == null) return;
      const end = e.changedTouches[0]?.clientX;
      if (end == null) return;
      const delta = end - start;
      touchStartX.current = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );

  return (
    <div
      className="relative w-full"
      aria-label="המלצות לקוחות"
      aria-roledescription="carousel"
    >
      {/* Desktop / tablet: arrows + single quote */}
      <div className="relative hidden md:block">
        <div className="relative mx-auto flex max-w-4xl items-center justify-center gap-6 lg:max-w-5xl lg:gap-10">
          {/* RTL: physical left = inline-end → next slide */}
          <NavArrow
            direction="left"
            onClick={goNext}
            label="המלצה הבאה"
            className="absolute end-0 top-1/2 z-10 -translate-y-1/2 lg:-end-2"
          />

          <div className="min-h-[14rem] w-full px-14 lg:min-h-[16rem] lg:px-20">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="relative flex flex-col items-center text-center"
                aria-live="polite"
                aria-atomic="true"
              >
                <span
                  className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none text-gold-light/15"
                  style={{ fontSize: "clamp(8rem, 22vw, 14rem)" }}
                  aria-hidden
                >
                  ״
                </span>

                <p className="relative z-[1] max-w-3xl font-display text-lg font-light leading-[1.65] tracking-tight text-text-main lg:text-xl">
                  {active.quote}
                </p>

                <footer className="relative z-[1] mt-7 lg:mt-9">
                  <p className="font-display text-lg font-semibold text-text-main">
                    {active.author}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-assistant)] text-xs tracking-[0.18em] text-text-muted uppercase">
                    {active.role}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <NavArrow
            direction="right"
            onClick={goPrev}
            label="המלצה קודמת"
            className="absolute start-0 top-1/2 z-10 -translate-y-1/2 lg:-start-2"
          />
        </div>

        <div
          className="mt-7 flex justify-center gap-2"
          role="tablist"
          aria-label="בחירת המלצה"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`המלצה ${i + 1} מתוך ${testimonials.length}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-px transition-all duration-500",
                i === index
                  ? "w-10 bg-accent-teal"
                  : "w-4 bg-black/15 hover:bg-accent-teal/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Mobile: swipeable single quote, no side arrows */}
      <div
        className="md:hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative min-h-[18rem] px-2 py-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={SLIDE_TRANSITION}
              className="relative flex flex-col items-center text-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <span
                  className="pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none text-gold-light/15"
                  style={{ fontSize: "clamp(6rem, 40vw, 9rem)" }}
                aria-hidden
              >
                ״
              </span>

              <p className="relative z-[1] font-display text-base font-light leading-[1.65] tracking-tight text-text-main">
                {active.quote}
              </p>

              <footer className="relative z-[1] mt-10">
                <p className="font-display text-base font-semibold text-text-main">
                  {active.author}
                </p>
                <p className="mt-2 font-[family-name:var(--font-assistant)] text-[10px] tracking-[0.16em] text-text-muted uppercase">
                  {active.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="המלצה קודמת"
            className="min-h-[44px] px-4 font-[family-name:var(--font-assistant)] text-xs tracking-wide text-text-muted underline-offset-4 hover:text-text-main hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          >
            הקודם
          </button>
          <span className="font-display text-xs tabular-nums text-text-muted">
            {index + 1} / {testimonials.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="המלצה הבאה"
            className="min-h-[44px] px-4 font-[family-name:var(--font-assistant)] text-xs tracking-wide text-text-muted underline-offset-4 hover:text-text-main hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          >
            הבא
          </button>
        </div>
        <p className="mt-3 text-center font-[family-name:var(--font-assistant)] text-[10px] text-text-muted/70">
          החליקו לצדדים לניווט
        </p>
      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section
      id="trust"
      data-funnel-step="trust"
      className="relative bg-bg-elevated py-section"
    >
      <ArchitecturalGrid opacity={0.1} />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col items-center gap-10 lg:gap-14">
          <div className="flex w-full flex-col items-center text-center">
            <SectionIntro
              align="center"
              title="מה שנשאר אחרי שהאבק שוקע"
              description="הפרויקט מסתיים — הקשר נשאר. כך נראית עבודה שנעשית בלי קיצורי דרך."
              descriptionClassName="max-w-3xl !text-accent-teal"
              className="mb-0 [&_h2]:mx-auto [&_h2]:max-w-4xl [&_h2]:text-accent-teal"
              numberClassName="text-accent-teal"
              accentColor="#c5a059"
            />
          </div>

          <div className="w-full">
            <div className="relative border border-accent-teal/30 border-t-2 border-t-accent-teal/60 border-b-2 border-b-accent-teal/60 bg-white/90 px-6 py-8 shadow-[0_2px_20px_rgba(45,107,132,0.07)] md:px-12 md:py-10 lg:px-16 lg:py-12">
              <TestimonialCarousel />
            </div>
          </div>

          <div className="w-full pt-2 lg:pt-4">
            <ClientLogos trustStrip={<TrustStrip />} />
          </div>
        </div>
      </div>
    </section>
  );
}
