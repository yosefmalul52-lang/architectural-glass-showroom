"use client";

import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navSections } from "@/data/funnel";
import { useScrolled } from "@/hooks/useScrolled";
import { luxuryTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrolled(80);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState(navSections[0]?.id ?? "pillars");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.header
        layout
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/30 bg-bg-elevated/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
        transition={luxuryTransition}
      >
        <motion.div
          layout
          className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-10"
          animate={{ height: scrolled ? 60 : 72 }}
          transition={luxuryTransition}
        >
          <Link
            href="/"
            className={cn(
              "justify-self-start font-display tracking-wide text-text-main transition-all duration-500",
              scrolled ? "text-lg" : "text-xl md:text-2xl"
            )}
          >
            זכוכית<span className="text-brand-teal">.</span>סטודיו
          </Link>

          <nav
            className="hidden items-center justify-center gap-10 justify-self-center md:flex lg:gap-12"
            aria-label="ניווט ראשי"
          >
            {navSections.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "group relative text-sm transition-colors duration-500",
                  activeId === link.id
                    ? "text-text-main"
                    : "text-text-muted hover:text-text-main"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 right-0 h-px bg-brand-gold transition-all duration-500",
                    activeId === link.id ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 justify-self-end">
            <Button
              variant="outline"
              size="sm"
              className="hidden border-text-main/20 md:inline-flex"
              asChild
            >
              <Link href="#contact">
                ייעוץ אדריכלי
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center text-text-main transition-colors hover:text-brand-teal md:hidden"
              aria-label="פתח תפריט"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg-elevated"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl text-text-main">
                זכוכית<span className="text-brand-teal">.</span>סטודיו
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center text-text-main"
                aria-label="סגור תפריט"
              >
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-8" aria-label="ניווט נייד">
              {navSections.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, ...luxuryTransition }}
                >
                  <Link
                    href={`#${link.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-6 py-4"
                  >
                    <span className="font-display text-sm text-brand-gold/60">
                      {link.number}
                    </span>
                    <span className="font-display text-display-3xl font-light text-text-main transition-colors group-hover:text-brand-teal">
                      {link.label}
                    </span>
                  </Link>
                  <div className="hairline-h" />
                </motion.div>
              ))}
            </nav>

            <div className="p-8">
              <Button variant="gold" className="w-full" asChild>
                <Link href="#contact" onClick={() => setMobileOpen(false)}>
                  תיאום פגישת ייעוץ
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
