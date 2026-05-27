"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariants, lineExpandVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "start" | "center";
}

export function SectionHeader({
  number,
  label,
  title,
  description,
  className,
  align = "start",
}: SectionHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const numberOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.04, 0.08, 0.12]);

  return (
    <motion.header
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      variants={fadeUpVariants}
      className={cn(
        "relative mb-10 lg:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-start gap-6",
          align === "center" && "flex-col items-center"
        )}
      >
        <motion.span
          className="font-display text-section-number text-text-main select-none leading-none"
          style={{ opacity: numberOpacity }}
          aria-hidden
        >
          {number}
        </motion.span>
        <div className={cn("flex-1", align === "center" && "flex flex-col items-center")}>
          <p className="mb-4 text-sm tracking-[0.12em] text-brand-teal">{label}</p>
          <h2 className="font-display text-display-3xl font-light text-text-main lg:text-display-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-5 max-w-xl text-lg text-text-muted leading-relaxed">
              {description}
            </p>
          )}
          <motion.div
            variants={lineExpandVariants}
            className={cn(
              "rule-gold-solid mt-8 h-px w-16 origin-right",
              align === "center" && "origin-center"
            )}
          />
        </div>
      </div>
    </motion.header>
  );
}
