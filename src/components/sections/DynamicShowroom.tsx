"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import {
  projectsByCategory,
  showroomCategories,
  type PortfolioProject,
  type ProjectCategory,
} from "@/data/portfolio";
import { MOTION_EASE, scrollRevealOnce } from "@/lib/motion";
import { ProjectLightbox } from "./ProjectLightbox";

const gridStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

/** Whole card (image + frame) reveals as one unit — no empty black box */
const cardVariant = {
  hidden: {
    opacity: 0,
    y: 36,
    clipPath: "inset(100% 0% 0% 0%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.95,
      ease: MOTION_EASE,
      clipPath: { duration: 1.05, ease: MOTION_EASE },
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const labelReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: MOTION_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const accentLineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.45, ease: MOTION_EASE },
  },
};

export function DynamicShowroom() {
  const [lightboxCategory, setLightboxCategory] = useState<ProjectCategory | null>(null);
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);

  const lightboxProjects = lightboxCategory ? projectsByCategory[lightboxCategory] : [];

  function openCategory(category: ProjectCategory) {
    const projects = projectsByCategory[category];
    if (projects.length === 0) return;
    setLightboxCategory(category);
    setLightboxProject(projects[0]);
  }

  function handleClose() {
    setLightboxCategory(null);
    setLightboxProject(null);
  }

  return (
    <section id="showroom" data-funnel-step="desire" className="border-b border-black py-section bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionIntro
          align="center"
          title="כל פרויקט — גימור ייחודי, תכנון מדויק"
          description="חלק מהפרויקטים האחרונים שלנו:"
          className="mb-10 lg:mb-14"
          accentColor="var(--brand-gold)"
          descriptionClassName="!text-brand-gold"
        />

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6"
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealOnce}
        >
          {showroomCategories.map((cat, index) => {
            const projects = projectsByCategory[cat.value];
            const isEmpty = projects.length === 0;

            return (
              <motion.div
                key={cat.value}
                variants={cardVariant}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm border-2 border-brand-gold will-change-[clip-path,opacity,transform] sm:aspect-[16/10]"
              >
                <button
                  type="button"
                  onClick={() => openCategory(cat.value)}
                  disabled={isEmpty}
                  className="absolute inset-0 z-[5] cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                  aria-label={`${cat.label}${isEmpty ? " — בקרוב" : ` — ${projects.length} פרויקטים`}`}
                />
                {cat.cover ? (
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={cat.cover.image}
                      alt={cat.cover.alt}
                      fill
                      priority={index < 2}
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 700px"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  </div>
                ) : null}

                {/* Dedicated bottom gradient — ensures text legibility on any image */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                {!cat.cover && (
                  <div className="flex h-full w-full items-center justify-center bg-bg-secondary">
                    <span className="font-latin text-base italic tracking-widest text-text-muted">
                      בקרוב
                    </span>
                  </div>
                )}

                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-start px-6 pb-6 pt-16 text-right"
                  variants={labelReveal}
                >
                  <div className="inline-flex flex-col items-start">
                    <p className="font-display text-xl font-light tracking-wide text-white drop-shadow-md lg:text-2xl">
                      {cat.label}
                    </p>
                    <motion.div
                      className="mt-2 h-px w-full min-w-[2.5rem] origin-right bg-brand-gold"
                      variants={accentLineReveal}
                    />
                  </div>
                </motion.div>

                {!isEmpty && (
                  <div className="pointer-events-none absolute left-5 top-5 z-10 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/25 text-white/80">
                    <svg viewBox="0 0 14 14" width={13} height={13} fill="none" aria-hidden>
                      <path d="M11 7H3M7 3l4 4-4 4" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <ProjectLightbox
        project={lightboxProject}
        projects={lightboxProjects}
        onClose={handleClose}
        onNavigate={setLightboxProject}
      />
    </section>
  );
}
