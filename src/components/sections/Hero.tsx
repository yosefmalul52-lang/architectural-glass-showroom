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
  staggerContainer,
  wordRevealVariants,
} from "@/lib/motion";
import { Navbar } from "@/components/layout/Navbar";
import { HeroVideo } from "./HeroVideo";

const headlineLines = [
  { text: "עיצוב זכוכית", weight: "light" as const },
  { text: "שמשדר יוקרה.", weight: "semibold" as const },
];

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

      {/* Bottom-aligned editorial shell — leaves left side open for the image */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-12 pt-28 lg:px-16 lg:pb-24">
        <motion.div
          className="flex max-w-full flex-col items-start text-right md:max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h1 className="max-w-2xl text-balance text-right font-display text-display-hero leading-[1.12] text-white [text-shadow:0_2px_24px_rgba(24,52,74,0.45),0_1px_4px_rgba(24,52,74,0.35)]">
            {headlineLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                <motion.span
                  className={`block ${
                    line.weight === "light" ? "font-light" : "font-semibold"
                  }`}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.45 + lineIndex * 0.13,
                    duration: 0.85,
                    ease: heroEase,
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: heroEase }}
            className="mb-8 mt-6 max-w-xl text-balance text-right text-lg leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgba(24,52,74,0.4)]"
          >
            קו נקי, חומרים בתקן המחמיר ביותר וגימור סופי מושלם. הסטנדרט החדש
            והגבוה ביותר של עבודות זכוכית.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: heroEase }}
            className="flex w-full max-w-2xl flex-wrap justify-start gap-2"
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
            transition={{ delay: 1.25, duration: 1, ease: heroEase }}
            className="mt-8 h-px w-full max-w-xs origin-right self-start bg-brand-gold/70"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.75, ease: heroEase }}
            className="mt-8 self-start"
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
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, ...luxuryTransition }}
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.25em] text-white/40">
          גלילה
        </span>
        <div className="h-10 w-px bg-brand-gold/40">
          <div className="h-full w-full animate-scroll-line bg-brand-gold" />
        </div>
      </motion.div>
    </section>
  );
}
