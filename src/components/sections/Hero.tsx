"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/experience/MagneticButton";
import { AnimatedCounter } from "@/components/experience/AnimatedCounter";
import { audienceTags } from "@/data/funnel";
import {
  lineExpandVariants,
  luxuryTransition,
  MOTION_EASE,
  staggerContainer,
  wordRevealVariants,
} from "@/lib/motion";
import { HeroVideo } from "./HeroVideo";

const stats = [
  { value: "120+", label: "פרויקטים" },
  { value: "15", label: "שנות ניסיון" },
  { value: "8-10mm", label: "Triplex" },
];

const headlineLines = [
  { text: "יוצרים מציאות חדשה", weight: "light" as const },
  { text: "בזכוכית — אמנות, הנדסה", weight: "bold" as const },
  { text: "ודיוק מיקרוני", weight: "bold" as const },
];

const heroEase = MOTION_EASE;

export function Hero() {
  return (
    <section
      id="hero"
      data-funnel-step="awareness"
      className="relative min-h-[calc(100dvh-72px)] pt-[72px]"
    >
      <div className="relative min-h-[calc(100dvh-72px)] overflow-hidden">
        <HeroVideo />

        <div
          className="absolute inset-0 bg-gradient-to-t from-text-main/85 via-text-main/40 to-text-main/25"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[calc(100dvh-72px)] max-w-[1400px] flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-24">
          <motion.div
            className="max-w-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8, ease: heroEase }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <p className="text-sm tracking-[0.14em] text-white/80">
                סטודיו בוטיק · זכוכית אדריכלית
              </p>
              <span className="border border-brand-gold/60 px-3 py-1 text-xs tracking-wide text-brand-gold">
                פרופיל זהב מברש
              </span>
            </motion.div>

            <h1 className="font-display text-display-hero text-white drop-shadow-sm">
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
                      delay: 0.5 + lineIndex * 0.14,
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
              transition={{ delay: 1.05, duration: 0.9, ease: heroEase }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-white/75"
            >
              סטודיו בוטיק לתכנון וביצוע פרויקטי זכוכית אדריכליים ומערכות קצה
              לבתים פרטיים, חללי ספא ומשרדים.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: heroEase }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {audienceTags.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  onClick={() => sessionStorage.setItem("showroom-tab", tag.tab)}
                  className="border border-white/25 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-white/80 backdrop-blur-sm transition-colors hover:border-brand-gold hover:text-white"
                >
                  {tag.label}
                </Link>
              ))}
            </motion.div>

            <motion.div
              variants={lineExpandVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.35, duration: 1, ease: heroEase }}
              className="mt-8 h-px w-full max-w-xs origin-right bg-brand-gold"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.75, ease: heroEase }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <MagneticButton>
                <Button variant="gold" asChild>
                  <Link href="#contact" aria-label="תיאום פגישת ייעוץ">
                    תיאום פגישת ייעוץ
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  variant="outline"
                  className="border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-brand-gold hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="#showroom" aria-label="גלה את תיק העבודות">
                    גלה את תיק העבודות
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.65, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-10 border-t border-white/15 pt-10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.75 + i * 0.1, duration: 0.6 }}
                >
                  <AnimatedCounter value={stat.value} label={stat.label} variant="light" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, ...luxuryTransition }}
          aria-hidden
        >
          <span className="text-xs tracking-[0.2em] text-white/50">גלילה</span>
          <div className="h-12 w-px bg-brand-gold/50">
            <div className="h-full w-full animate-scroll-line bg-brand-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
