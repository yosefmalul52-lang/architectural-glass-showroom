"use client";

import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShowroomCardProps {
  card: PortfolioProject;
  index: number;
  sizes?: string;
  active?: boolean;
  onSelect?: (card: PortfolioProject) => void;
}

export function ShowroomCard({ card, index, sizes, active, onSelect }: ShowroomCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(card)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(card);
        }
      }}
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`צפייה בפרויקט: ${card.title}`}
      className={cn(
        "group relative h-full w-full cursor-pointer select-none overflow-hidden border border-white/18 bg-bg-secondary shadow-[0_8px_24px_rgba(21,21,21,0.2)]",
        "transition-[box-shadow,border-color,transform] duration-700",
        "hover:border-white/30 hover:shadow-[0_14px_34px_rgba(21,21,21,0.28)]",
        active && "ring-1 ring-brand-gold ring-offset-1 ring-offset-bg-elevated"
      )}
    >
      {/* Image */}
      <Image
        src={card.image}
        alt={card.alt}
        fill
        quality={95}
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        className="object-cover object-center transition-opacity duration-300"
        draggable={false}
      />

      {/* Base gradient — subtle, only bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

      {/* Teal border reveal on hover */}
      <div className="pointer-events-none absolute inset-0 border border-accent-teal/0 transition-[border-color] duration-500 group-hover:border-accent-teal/60" />

      {/* Top-right: index number */}
      <span
        className="absolute top-4 right-4 font-[family-name:var(--font-cormorant)] text-sm italic tabular-nums text-white/30 transition-opacity duration-500 group-hover:opacity-0"
        aria-hidden
      >
        {num}
      </span>

      {/* Top-left: category tag — appears on hover */}
      <span className="absolute left-4 top-4 translate-y-2 font-[family-name:var(--font-cormorant)] text-[11px] italic tracking-[0.18em] uppercase text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/70">
        {{ showers: "מקלחונים ייחודיים", mirrors: "מראות LED מוארות", offices: "מחיצות משרד", railings: "מעקים" }[card.category]}
      </span>

      {/* Bottom info panel */}
      <div className="absolute inset-x-0 bottom-0 px-2.5 pb-1.5 pt-0 md:p-5 lg:p-6">
        {/* Gold accent line */}
        <div className="mb-2 h-px w-6 origin-right bg-brand-gold transition-all duration-700 group-hover:w-12 md:mb-3" />

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="text-right font-display text-sm font-light leading-snug text-white md:text-base lg:text-lg"
        >
          {card.title}
        </motion.h3>

        {/* Material spec — slides up on hover */}
        {card.materials?.[0] && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="hidden md:block mt-1.5 text-right translate-y-3 font-[family-name:var(--font-cormorant)] text-xs italic tracking-wide text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/60 md:mt-2"
          >
            {card.materials[0]}
          </motion.p>
        )}

        {/* View CTA */}
        <div className="hidden md:flex mt-2.5 translate-y-3 items-center justify-end gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:mt-3">
          <span className="h-px w-4 bg-brand-gold/70" />
          <span className="font-[family-name:var(--font-cormorant)] text-[11px] italic tracking-[0.14em] text-white/75 uppercase">
            לפרטים מלאים
          </span>
        </div>
      </div>

      {/* Shimmer scan line on hover */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ top: "100%" }}
        whileHover={{ top: "0%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        aria-hidden
      />
    </motion.article>
  );
}
