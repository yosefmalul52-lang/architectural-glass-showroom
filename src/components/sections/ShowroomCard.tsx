"use client";

import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio";
import { cn } from "@/lib/utils";

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
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(card)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(card);
        }
      }}
      aria-label={`צפייה בפרויקט: ${card.title}`}
      className={cn(
        "card-surface group relative h-full w-full cursor-pointer select-none overflow-hidden border-black/10 bg-bg-secondary transition-[box-shadow,border-color] duration-500",
        "hover:shadow-[var(--card-shadow-hover)]",
        active && "ring-1 ring-brand-gold ring-offset-1 ring-offset-bg-elevated"
      )}
    >
      <Image
        src={card.image}
        alt={card.alt}
        fill
        quality={92}
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
        draggable={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/4 to-transparent" />

      <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <span
        className="absolute top-4 right-4 select-none font-display text-[10px] tracking-[0.3em] text-white/30 tabular-nums"
        aria-hidden
      >
        {num}
      </span>

      <div className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <div className="mb-2.5 h-px w-5 bg-brand-gold transition-all duration-700 group-hover:w-9" />
        <h3 className="font-display text-sm leading-snug text-white md:text-base">{card.title}</h3>
      </div>
    </article>
  );
}
