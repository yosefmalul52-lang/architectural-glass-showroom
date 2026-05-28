"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import {
  projectsByCategory,
  showroomCategories,
  type PortfolioProject,
  type ProjectCategory,
} from "@/data/portfolio";
import { luxuryTransition, MOTION_EASE } from "@/lib/motion";
import { ProjectLightbox } from "./ProjectLightbox";
import { ShowroomCard } from "./ShowroomCard";
import { cn } from "@/lib/utils";

const SHOWROOM_INTEREST_KEY = "showroom-interest";
const SHOWROOM_TAB_KEY = "showroom-tab";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: MOTION_EASE },
  },
};

const gridStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

function ShowroomGrid({
  projects,
  onSelect,
}: {
  projects: PortfolioProject[];
  onSelect: (p: PortfolioProject) => void;
}) {
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  if (projects.length === 0) {
    return (
      <p className="py-16 text-center text-text-muted">
        אין פרויקטים בתצוגה לפי הפילטר הנבחר.
      </p>
    );
  }

  const select = (p: PortfolioProject) => {
    sessionStorage.setItem(SHOWROOM_INTEREST_KEY, p.title);
    onSelect(p);
  };
  const scrollMobileTrack = (direction: "next" | "prev") => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const amount = Math.round(track.clientWidth * 0.86);
    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  const [hero, sec1, sec2, ...tiles] = projects;

  return (
    <motion.div
      className="flex flex-col gap-1"
      variants={gridStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      {/* Desktop hero row */}
      <div className="hidden md:flex min-h-[min(480px,60dvh)] gap-1 lg:min-h-[min(560px,68dvh)]">
        {hero && (
          <motion.div variants={cardVariant} className="relative flex-[1.75]">
            <ShowroomCard
              card={hero}
              index={0}
              sizes="(max-width: 768px) 100vw, 62vw"
              onSelect={select}
            />
          </motion.div>
        )}

        {(sec1 || sec2) && (
          <div className="flex-1 flex flex-col gap-1">
            {sec1 && (
              <motion.div variants={cardVariant} className="relative flex-1">
                <ShowroomCard
                  card={sec1}
                  index={1}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onSelect={select}
                />
              </motion.div>
            )}
            {sec2 && (
              <motion.div variants={cardVariant} className="relative flex-1">
                <ShowroomCard
                  card={sec2}
                  index={2}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  onSelect={select}
                />
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Mobile: horizontal touch carousel (desktop grid stays unchanged) */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => scrollMobileTrack("next")}
          aria-label="תמונה קודמת"
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 p-2 text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:text-white"
        >
          <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden>
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollMobileTrack("prev")}
          aria-label="תמונה הבאה"
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 p-2 text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:text-white"
        >
          <svg viewBox="0 0 16 16" width={14} height={14} fill="none" aria-hidden>
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={mobileTrackRef}
          className="snap-carousel -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 touch-pan-x overscroll-x-contain"
          data-lenis-prevent
        >
          {projects.map((card, i) => (
            <motion.div
              key={card.id}
              variants={cardVariant}
              className="w-[calc(100vw-3rem)] shrink-0 snap-center"
            >
              <div className="relative aspect-[4/3]">
                <ShowroomCard
                  card={card}
                  index={i}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onSelect={select}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom tiles */}
      {tiles.length > 0 && (
        <div className="hidden gap-1 md:grid md:grid-cols-3">
          {tiles.map((card, i) => (
            <motion.div
              key={card.id}
              variants={cardVariant}
              className="relative aspect-[4/3]"
            >
              <ShowroomCard
                card={card}
                index={i + 3}
                sizes="(max-width: 768px) 50vw, 25vw"
                onSelect={select}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export function DynamicShowroom() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("showers");
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(() => projectsByCategory[activeTab], [activeTab]);

  useEffect(() => { setLightboxProject(null); }, [activeTab]);

  useEffect(() => {
    const tab = sessionStorage.getItem(SHOWROOM_TAB_KEY);
    if (tab === "mirrors" || tab === "showers" || tab === "offices") {
      setActiveTab(tab as ProjectCategory);
      sessionStorage.removeItem(SHOWROOM_TAB_KEY);
    }
  }, []);

  return (
    <section id="showroom" data-funnel-step="desire" className="py-section bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionIntro
          align="center"
          title="כל פרויקט — גימור ייחודי, תכנון מדויק"
          className="[&_h2]:text-accent-teal"
          accentColor="#C7B39A"
        />

        <div className="mb-8 flex flex-col gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <nav className="flex items-end gap-0 border-b border-hairline" role="tablist" aria-label="קטגוריות תיק עבודות">
            {showroomCategories.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  id={`showroom-tab-${tab.value}`}
                  aria-selected={isActive}
                  aria-controls="showroom-panel"
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "relative px-5 pb-4 pt-2 font-display text-sm tracking-wide transition-colors duration-300",
                    isActive ? "text-text-main" : "text-text-muted hover:text-text-main"
                  )}
                  aria-label={`קטגוריה: ${tab.label}${isActive ? " — נבחר" : ""}`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-teal"
                      transition={luxuryTransition}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            id="showroom-panel"
            role="tabpanel"
            aria-labelledby={`showroom-tab-${activeTab}`}
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: MOTION_EASE }}
          >
            <ShowroomGrid projects={filteredProjects} onSelect={setLightboxProject} />
          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectLightbox
        project={lightboxProject}
        projects={filteredProjects}
        onClose={() => setLightboxProject(null)}
        onNavigate={setLightboxProject}
      />
    </section>
  );
}
