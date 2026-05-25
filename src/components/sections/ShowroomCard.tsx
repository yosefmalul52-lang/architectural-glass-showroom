"use client";

import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio";
import { aspectClass, type ShowroomCardVariant } from "@/lib/showroom-layout";
import { cn } from "@/lib/utils";

interface ShowroomCardProps {
  card: PortfolioProject;
  index: number;
  variant?: ShowroomCardVariant;
  active?: boolean;
  onSelect?: (card: PortfolioProject) => void;
}

export function ShowroomCard({
  card,
  index,
  variant = "tile",
  active = false,
  onSelect,
}: ShowroomCardProps) {
  const projectNumber = String(index + 1).padStart(2, "0");
  const isHero = variant === "hero";
  const isCompact = variant === "compact";

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
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden border border-hairline text-right frame-gold-hover transition-shadow duration-500",
        active && "ring-1 ring-brand-gold",
        isCompact && "h-full min-h-[200px]",
        !isCompact && "w-[min(82vw,320px)] shrink-0 snap-center md:w-full md:shrink md:snap-align-none"
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-bg-secondary",
          aspectClass(card.aspect, variant),
          isCompact && "h-full min-h-[200px]"
        )}
      >
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes={
            isHero
              ? "(max-width: 1024px) 100vw, 65vw"
              : isCompact
                ? "(max-width: 1024px) 50vw, 28vw"
                : "(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover image-hover-scale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-main/80 via-text-main/15 to-transparent" />

        <span className="absolute top-4 right-4 font-display text-[11px] tracking-[0.2em] text-white/45">
          {projectNumber}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <h3
            className={cn(
              "font-display leading-snug text-white",
              isHero ? "text-xl md:text-2xl" : isCompact ? "text-base" : "text-lg"
            )}
          >
            {card.title}
          </h3>
          <div className="mt-3 h-px w-8 bg-brand-gold transition-all duration-500 group-hover:w-12" />
        </div>
      </div>
    </article>
  );
}
