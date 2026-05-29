"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArchitecturalGrid } from "@/components/editorial/ArchitecturalGrid";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { testimonials } from "@/data/social-proof";
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
                whileHover={{ y: -3 }}
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
                  <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm italic tracking-[0.16em] text-text-muted uppercase">
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
        <div className="relative h-[20rem] px-9 py-4">
          <button
            type="button"
            onClick={goNext}
            aria-label="המלצה הבאה"
            className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 p-2 text-accent-teal/80 transition-colors duration-300 hover:text-accent-teal"
          >
            <svg viewBox="0 0 16 16" width={18} height={18} fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goPrev}
            aria-label="המלצה קודמת"
            className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 p-2 text-accent-teal/80 transition-colors duration-300 hover:text-accent-teal"
          >
            <svg viewBox="0 0 16 16" width={18} height={18} fill="none" aria-hidden>
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover={{ y: -3 }}
              transition={SLIDE_TRANSITION}
              className="relative flex h-full flex-col items-center justify-center text-center"
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
                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm italic tracking-[0.16em] text-text-muted uppercase">
                  {active.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export function SocialProof() {
  return (
    <section
      id="trust"
      data-funnel-step="trust"
      className="relative border-t border-black py-section"
      style={{ backgroundColor: "#F3EBE1" }}
    >
      <ArchitecturalGrid opacity={0.1} />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col items-center gap-10 lg:gap-14">
          <div className="flex w-full flex-col items-center text-center">
            <SectionIntro
              align="center"
              description="הפרויקט מסתיים — הקשר נשאר. כך נראית עבודה שנעשית בלי קיצורי דרך."
              descriptionClassName="max-w-3xl !text-accent-teal"
              className="mb-0"
              numberClassName="text-accent-teal"
              accentColor="#2d6b84"
            >
              <h2 className="mx-auto max-w-4xl font-display text-display-4xl leading-[1.12] tracking-tight lg:text-display-5xl">
                <span className="block font-light text-text-main">מה שנשאר —</span>
                <span className="block font-semibold text-[#2d6b84]">אחרי שהאבק שוקע</span>
              </h2>
            </SectionIntro>
          </div>

          <div className="w-full">
            <div className="relative border border-accent-teal/30 border-t-2 border-t-accent-teal/60 border-b-2 border-b-accent-teal/60 bg-white/90 px-6 py-8 shadow-[0_2px_20px_rgba(21,21,21,0.09)] md:px-12 md:py-10 lg:px-16 lg:py-12">
              <TestimonialCarousel />
            </div>
          </div>

          <div className="w-full pt-2 lg:pt-4">
            <ClientLogos />
          </div>
        </div>
      </div>
    </section>
  );
}
