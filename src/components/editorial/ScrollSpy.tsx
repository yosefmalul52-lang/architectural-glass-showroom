"use client";

import { useEffect, useState } from "react";
import { navSections } from "@/data/funnel";
import { useLenis } from "@/lib/lenis-context";
import { cn } from "@/lib/utils";

export function ScrollSpy() {
  const { scrollTo } = useLenis();
  const [active, setActive] = useState(navSections[0]?.id ?? "pillars");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      aria-label="ניווט סקשנים"
    >
      {navSections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onMouseEnter={() => setHovered(section.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={(e) => {
            e.preventDefault();
            scrollTo(`#${section.id}`);
          }}
          className={cn(
            "group flex items-center gap-3 text-xs tracking-wide transition-colors duration-500",
            active === section.id ? "text-brand-gold" : "text-text-muted hover:text-text-main"
          )}
        >
          <span
            className={cn(
              "h-px transition-all duration-500",
              active === section.id ? "w-10 bg-brand-gold" : "w-6 bg-hairline group-hover:bg-brand-gold/50"
            )}
          />
          <span
            className={cn(
              "transition-opacity duration-300",
              active === section.id || hovered === section.id
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            )}
          >
            {section.number} · {section.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
