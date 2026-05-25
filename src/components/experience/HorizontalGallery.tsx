"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalGalleryProps {
  children: ReactNode;
  className?: string;
  itemCount: number;
}

export function HorizontalGallery({
  children,
  className,
  itemCount,
}: HorizontalGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const scrollLeft = Math.abs(el.scrollLeft);
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, itemCount]);

  const scrollBy = useCallback((direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollBy("right");
      if (e.key === "ArrowRight") scrollBy("left");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollBy]);

  return (
    <div className={cn("relative hidden md:block", className)}>
      <div
        ref={trackRef}
        data-lenis-prevent
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.stopPropagation();
          }
        }}
        className="horizontal-gallery-track flex gap-6 overflow-x-auto pb-4 snap-carousel [&>*]:shrink-0"
      >
        {children}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-px flex-1 bg-hairline">
          <motion.div
            className="absolute inset-y-0 right-0 h-px bg-brand-gold"
            style={{ width: `${Math.max(progress * 100, 2)}%` }}
            layout
          />
        </div>
        <span className="text-xs tracking-wide text-text-muted tabular-nums">
          {String(Math.round(progress * Math.max(itemCount - 1, 0)) + 1).padStart(2, "0")} /{" "}
          {String(itemCount).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy("left")}
            disabled={!canScrollLeft}
            className="flex h-10 w-10 items-center justify-center border border-hairline text-text-main transition-colors hover:border-brand-gold disabled:opacity-30"
            aria-label="גלול ימינה"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy("right")}
            disabled={!canScrollRight}
            className="flex h-10 w-10 items-center justify-center border border-hairline text-text-main transition-colors hover:border-brand-gold disabled:opacity-30"
            aria-label="גלול שמאלה"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
