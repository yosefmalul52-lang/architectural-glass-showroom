"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  headingContainerVariant,
  headingLineVariant,
  scrollRevealViewport,
  subtextVariant,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface SectionIntroProps {
  number?: string;
  label?: string;
  title?: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
  descriptionClassName?: string;
  numberClassName?: string;
  showAccent?: boolean;
  /** Override accent line/diamond color. Defaults to teal (#2d6b84). */
  accentColor?: string;
  children?: ReactNode;
}

export function SectionIntro({
  number,
  label,
  title,
  description,
  align = "start",
  className,
  descriptionClassName,
  numberClassName,
  showAccent = true,
  accentColor,
  children,
}: SectionIntroProps) {
  const accent = accentColor ?? "#2d6b84";
  /** Split title on " — " or "." followed by space into display lines */
  const lines = title
    ? title.split(/(?<=\.)\s+| — /).filter(Boolean)
    : [];

  return (
    <header
      className={cn(
        "mb-10 lg:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {(number || label) && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollRevealViewport}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mb-5 flex items-center gap-2 font-display text-[10px] tracking-[0.22em] uppercase",
            align === "center" && "justify-center"
          )}
        >
          {number && (
            <span className={cn("tabular-nums", numberClassName ?? "text-brand-gold")}>
              {number}.
            </span>
          )}
          {number && label && (
            <span
              className={cn("h-px w-4", numberClassName ? "bg-accent-teal/40" : "bg-text-muted/30")}
              aria-hidden
            />
          )}
          {label && <span className="text-text-muted/70">{label}</span>}
        </motion.p>
      )}

      {children ?? (
        title && (
          <motion.h2
            variants={headingContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealViewport}
            className="font-display text-display-3xl font-light leading-[1.15] tracking-tight text-text-main lg:text-display-4xl"
          >
            {lines.length > 1 ? (
              lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className={`block ${i === lines.length - 1 ? "font-semibold" : "font-light"}`}
                    variants={headingLineVariant}
                    transition={{
                      duration: 0.88,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.1,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))
            ) : (
              <span className="block overflow-hidden">
                <motion.span className="block font-light" variants={headingLineVariant}>
                  {title}
                </motion.span>
              </span>
            )}
          </motion.h2>
        )
      )}

      {showAccent && (title || children) && (
        <div
          className={cn(
            "mt-6 flex items-center gap-3 select-none pointer-events-none",
            align === "center" ? "justify-center w-full" : "justify-start"
          )}
          aria-hidden
        >
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "40px", opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="h-px shrink-0"
            style={{ backgroundColor: accent }}
          />
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
            className="h-2 w-2 shrink-0"
            style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}66` }}
          />
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "40px", opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="h-px shrink-0"
            style={{ backgroundColor: accent }}
          />
        </div>
      )}

      {description && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={subtextVariant}
          className={cn(
            "type-lead mt-6 max-w-2xl",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
