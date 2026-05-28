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
      className="hero-viewport relative isolate w-full overflow-clip"
    >
      <HeroVideo />
      <Navbar />

      {/* Right-aligned block, vertically centered */}
      <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+4rem)] pt-[calc(env(safe-area-inset-top)+4rem)] sm:px-6 md:items-start md:py-20 lg:px-16 lg:py-24">
        <div className="relative z-10 w-full max-w-full md:max-w-3xl">
          {/* Scoped gradient — behind right-aligned text */}
          <motion.div
            className="pointer-events-none absolute right-0 top-0 z-0 h-full w-full max-w-lg bg-gradient-to-l from-stone-950/62 via-stone-950/32 to-transparent blur-xl lg:max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            aria-hidden
          />

          {/* Content enters after gradient is visible */}
          <motion.div
            className="relative z-20 mx-auto flex w-full max-w-[20.5rem] flex-col items-center gap-y-2.5 text-center sm:max-w-[24rem] md:ml-auto md:mr-0 md:w-fit md:max-w-2xl md:items-start md:gap-y-3 md:text-right lg:gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <h1 className="max-w-[300px] text-balance text-center font-display text-[2.65rem] font-light leading-tight text-white md:max-w-sm md:text-right md:text-3xl lg:max-w-md lg:text-4xl [text-shadow:0_2px_24px_rgba(24,52,74,0.45),0_1px_4px_rgba(24,52,74,0.35)]">
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
              className="max-w-[22rem] text-balance text-center text-[1.05rem] leading-relaxed tracking-[0.01em] text-white/90 sm:max-w-xl md:text-right md:text-lg [text-shadow:0_1px_12px_rgba(24,52,74,0.4)]"
            >
              קו נקי, חומרים בתקן המחמיר ביותר וגימור סופי מושלם. הסטנדרט החדש
              של עבודות הפרימיום.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: heroEase }}
              className="grid w-full max-w-[21rem] grid-cols-3 gap-1.5 sm:max-w-2xl sm:grid-cols-none sm:flex sm:flex-wrap sm:justify-center sm:gap-2 md:justify-start"
            >
              {audienceTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  onClick={() =>
                    sessionStorage.setItem("showroom-tab", tag.tab)
                  }
                  className="glass-premium px-2.5 py-2 text-center text-[12px] leading-none tracking-[0.04em] text-white/90 transition-all duration-300 hover:border-white/35 hover:bg-white/15 hover:text-white sm:px-4 sm:text-xs sm:tracking-wide"
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
              className="mt-1.5 h-px w-full max-w-[20.5rem] origin-center bg-brand-gold/70 sm:max-w-xs md:origin-right"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.75, duration: 0.75, ease: heroEase }}
              className="mt-0.5 w-full sm:mt-1 sm:w-auto"
            >
              <MagneticButton>
                <Button variant="gold" size="lg" asChild className="w-full sm:w-auto">
                  <Link href="#contact" aria-label="תיאום פגישת ייעוץ חינם">
                    ייעוץ ראשוני — ללא עלות
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            <div
              className="my-1.5 h-[1px] w-full bg-[#c5a059]/20 lg:my-3"
              aria-hidden
            />

            <HeroStats />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex"
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
