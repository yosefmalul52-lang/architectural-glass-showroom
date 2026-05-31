"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone } from "lucide-react";
import { navSections } from "@/data/funnel";
import { BRAND, CONTACT } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <header
      className="absolute inset-x-0 top-0 z-[100]"
      style={{ direction: "rtl" }}
    >
      {/* Glass blue bg */}
      <div className="absolute inset-0 bg-transparent border-b border-brand-gold/60" />

      <div className="relative mx-auto flex h-[62px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-16 sm:gap-6 sm:px-6 lg:h-[72px] lg:px-10">

        <Link
          href="#hero"
          className="flex shrink-0 items-center justify-center bg-transparent"
          aria-label="דף הבית"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="flex items-center justify-center bg-transparent"
          >
            <Image
              src="/logo-tzameret-navbar-transparent.png"
              alt={BRAND.name}
              width={320}
              height={320}
              priority
              unoptimized
              className="h-[3.75rem] w-auto object-contain object-center sm:h-[4rem] lg:h-[4.25rem]"
            />
          </motion.div>
        </Link>

        {/* Nav links — center (desktop only) */}
        <nav
          className="hidden flex-1 items-center justify-center gap-9 md:flex lg:gap-12"
          aria-label="ניווט ראשי"
        >
          {navSections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.06 }}
            >
              <Link
                href={`#${section.id}`}
                className="group relative py-1 font-display text-[16px] tracking-[0.12em] uppercase text-white transition-colors duration-300 hover:text-brand-gold"
              >
                {section.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-brand-gold transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Phone + mobile hamburger — left */}
        <div className="flex shrink-0 items-center gap-3">
          <motion.a
            href={`tel:${CONTACT.phoneTel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            className="hidden items-center gap-2 border border-brand-gold px-4 py-2 font-display text-[15px] tracking-[0.09em] text-white transition-all duration-300 hover:bg-brand-gold/10 hover:text-brand-gold sm:flex"
            aria-label={`טלפון: ${CONTACT.phone}`}
          >
            <Phone size={12} strokeWidth={1.5} />
            {CONTACT.phone}
          </motion.a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className={cn("block h-px w-5 bg-white/70 transition-all duration-300", mobileOpen && "translate-y-[7px] rotate-45")} />
            <span className={cn("block h-px w-5 bg-white/70 transition-all duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block h-px w-5 bg-white/70 transition-all duration-300", mobileOpen && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        ref={menuRef}
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="overflow-hidden bg-text-main/80 backdrop-blur-lg md:hidden"
      >
        <nav className="flex flex-col px-6 py-4" aria-label="תפריט ניווט מובייל">
          {navSections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setMobileOpen(false)}
            className="border-b border-white/6 py-4 font-display text-[17px] tracking-[0.1em] text-white/65 transition-colors duration-200 hover:text-white"
            >
              <span className="me-3 font-display text-[10px] tracking-[0.18em] text-white/25 tabular-nums">
                {section.number}.
              </span>
              {section.label}
            </Link>
          ))}
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="mt-4 inline-flex items-center gap-2 border border-brand-gold px-4 py-2.5 font-display text-base text-white transition-colors duration-200 hover:bg-brand-gold/10 hover:text-brand-gold"
          >
            <Phone size={13} strokeWidth={1.5} />
            {CONTACT.phone}
          </a>
        </nav>
      </motion.div>
    </header>
  );
}
