"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/experience/MagneticButton";
import {
  lineExpandVariants,
  luxuryTransition,
  MOTION_EASE,
  wordRevealVariants,
} from "@/lib/motion";
import { Navbar } from "@/components/layout/Navbar";
import { HeroVideo } from "./HeroVideo";
import { HeroStats } from "./HeroStats";


const heroEase = MOTION_EASE;

export function Hero() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const w = window as Window & { __introLoaderDone?: boolean };
    if (w.__introLoaderDone) {
      setIntroDone(true);
      return;
    }

    const onIntroDone = () => setIntroDone(true);
    window.addEventListener("intro-loader:done", onIntroDone);
    return () => window.removeEventListener("intro-loader:done", onIntroDone);
  }, []);

  return (
    <section
      id="hero"
      data-funnel-step="awareness"
      className="hero-viewport relative isolate w-full overflow-clip"
    >
      <HeroVideo />
      <Navbar />

      {/* Right-aligned block, vertically centered */}
      <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-start justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+4rem)] pt-[calc(env(safe-area-inset-top)+5rem)] sm:px-6 sm:pt-[calc(env(safe-area-inset-top)+5.5rem)] lg:px-16 lg:pt-[calc(env(safe-area-inset-top)+6rem)]">
        <div className="relative z-10 mt-8 flex w-full flex-col items-start sm:mt-10 lg:mt-12">
          {/* Scoped gradient — behind text */}
          <motion.div
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 z-0 bg-text-main/40 blur-2xl lg:-inset-x-10 lg:-inset-y-10"
            initial={{ opacity: 0 }}
            animate={introDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-hidden
          />

          {/* Content */}
          <motion.div
            className="relative z-20 flex w-full max-w-2xl flex-col items-start gap-y-2.5 text-right md:gap-y-3 lg:gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1 className="max-w-[360px] text-balance text-right font-display text-display-hero font-semibold leading-[1.05] tracking-tight text-white md:max-w-xl lg:max-w-2xl [text-shadow:0_2px_24px_rgba(0,0,0,0.5),0_1px_4px_rgba(0,0,0,0.4)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block font-semibold"
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate={introDone ? "visible" : "hidden"}
                  transition={{
                    delay: 0.85,
                    duration: 0.85,
                    ease: heroEase,
                  }}
                >
                  לוקחים את הזכוכית
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block font-semibold text-[#C8B49B]"
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate={introDone ? "visible" : "hidden"}
                  transition={{
                    delay: 1.05,
                    duration: 0.85,
                    ease: heroEase,
                  }}
                >
                  שלך לצמרת.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 1.35, duration: 0.9, ease: heroEase }}
              className="max-w-[22rem] text-balance text-right text-[1.15rem] leading-relaxed tracking-[0.01em] text-white/90 sm:max-w-xl md:text-[1.3rem] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"
            >
              קו נקי, חומרים בתקן המחמיר ביותר וגימור סופי מושלם. הסטנדרט החדש
              של עבודות הפרימיום.
            </motion.p>

            <motion.div
              variants={lineExpandVariants}
              initial="hidden"
              animate={introDone ? "visible" : "hidden"}
              transition={{ delay: 1.5, duration: 1, ease: heroEase }}
              className="mt-1.5 h-px w-full max-w-[20.5rem] origin-right bg-brand-gold/70 sm:max-w-xs"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.6, duration: 0.75, ease: heroEase }}
              className="mt-0.5 w-full sm:mt-1 sm:w-auto sm:self-start"
            >
              <MagneticButton>
                <Button variant="gold" size="lg" asChild className="w-full sm:w-auto">
                  <Link href="#contact" aria-label="תיאום פגישת ייעוץ חינם">
                    בואו נתכנן יחד
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            <HeroStats />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex"
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.1, ...luxuryTransition }}
        aria-hidden
      >
        <motion.svg
          viewBox="0 7 24 10"
          width={44}
          height={18}
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        >
          <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <motion.svg
          viewBox="0 7 24 10"
          width={44}
          height={18}
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
