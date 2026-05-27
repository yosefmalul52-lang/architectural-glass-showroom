"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/experience/MagneticButton";
import { audienceTags } from "@/data/funnel";
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
  return (
    <section
      id="hero"
      data-funnel-step="awareness"
      className="hero-viewport relative isolate h-screen w-full overflow-hidden will-change-transform"
    >
      <HeroVideo />
      <Navbar />

      {/* Right-aligned block, vertically centered */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-6 pt-28 pb-24 lg:px-16 lg:pb-32">
        <div className="relative z-10 w-full max-w-full md:max-w-3xl">
          {/* Scoped gradient — behind right-aligned text */}
          <motion.div
            className="pointer-events-none absolute right-0 top-0 z-0 h-full w-full max-w-lg bg-gradient-to-l from-stone-950/45 via-stone-950/20 to-transparent blur-xl lg:max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-hidden
          />

          {/* Content enters after gradient is visible */}
          <motion.div
            className="relative z-20 ml-auto flex w-fit max-w-2xl flex-col items-start text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1 className="max-w-[280px] text-balance text-right font-display text-2xl font-light leading-snug text-white md:max-w-sm md:text-3xl lg:max-w-md lg:text-4xl [text-shadow:0_2px_24px_rgba(24,52,74,0.45),0_1px_4px_rgba(24,52,74,0.35)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block font-light"
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.85,
                    duration: 0.85,
                    ease: heroEase,
                  }}
                >
                  לקחת את הזכוכית{" "}
                  <span className="text-[#C7B29A]">לפסגה.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.9, ease: heroEase }}
              className="mb-8 mt-8 max-w-xl text-balance text-right text-base leading-relaxed tracking-wide text-white/85 md:text-lg [text-shadow:0_1px_12px_rgba(24,52,74,0.4)]"
            >
              קו נקי, חומרים בתקן המחמיר ביותר וגימור סופי מושלם. הסטנדרט החדש
              של עבודות הפרימיום.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: heroEase }}
              className="flex max-w-2xl flex-wrap justify-start gap-2"
            >
              {audienceTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  onClick={() =>
                    sessionStorage.setItem("showroom-tab", tag.tab)
                  }
                  className="glass-premium px-4 py-2 text-xs tracking-wide text-white/85 transition-all duration-300 hover:border-white/35 hover:bg-white/15 hover:text-white"
                >
                  {tag.label}
                </Link>
              ))}
            </motion.div>

            <motion.div
              variants={lineExpandVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.65, duration: 1, ease: heroEase }}
              className="mt-8 h-px w-full max-w-xs origin-right bg-brand-gold/70"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75, duration: 0.75, ease: heroEase }}
              className="mt-8"
            >
              <MagneticButton>
                <Button variant="gold" size="lg" asChild>
                  <Link href="#contact" aria-label="תיאום פגישת ייעוץ חינם">
                    ייעוץ ראשוני — ללא עלות
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            <div
              className="my-6 h-[1px] w-full bg-[#c5a059]/20 lg:my-8"
              aria-hidden
            />

            <HeroStats />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
