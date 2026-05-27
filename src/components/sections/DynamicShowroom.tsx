"use client";

import { useEffect, useMemo, useState } from "react";
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

  const [hero, sec1, sec2, ...tiles] = projects;

  return (
    <motion.div
      className="flex flex-col gap-2"
      variants={gridStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
    >
      <div className="hidden md:flex min-h-[min(440px,55dvh)] gap-2 lg:min-h-[min(520px,65dvh)]">
        {hero && (
          <motion.div variants={cardVariant} className="relative flex-[1.65]">
            <ShowroomCard
              card={hero}
              index={0}
              sizes="(max-width: 768px) 100vw, 62vw"
              onSelect={select}
            />
          </motion.div>
        )}

        {(sec1 || sec2) && (
          <div className="flex-1 flex flex-col gap-2">
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

      <div className="md:hidden flex flex-col gap-2">
        {hero && (
          <motion.div variants={cardVariant} className="relative aspect-[4/3]">
            <ShowroomCard card={hero} index={0} sizes="100vw" onSelect={select} />
          </motion.div>
        )}
        {(sec1 || sec2) && (
          <div className="grid grid-cols-2 gap-2">
            {[sec1, sec2].filter(Boolean).map((card, i) =>
              card ? (
                <motion.div key={card.id} variants={cardVariant} className="relative aspect-[3/4]">
                  <ShowroomCard card={card} index={i + 1} sizes="50vw" onSelect={select} />
                </motion.div>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* Bottom row — fixed 2-col grid (same division as משרדים) */}
      {tiles.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
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

  const filteredProjects = useMemo(
    () => projectsByCategory[activeTab],
    [activeTab]
  );

  useEffect(() => {
    setLightboxProject(null);
  }, [activeTab]);

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
          description="עיינו בתיק עבודותינו — לחצו על כל פרויקט לפרטי גימור, חומרים ומפרט טכני מלא."
          className="[&_h2]:text-accent-teal"
          descriptionClassName="!text-accent-teal"
        />

        <div className="mb-8 flex flex-col gap-6 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
          <nav className="flex gap-0" role="tablist" aria-label="קטגוריות תיק עבודות">
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
                    "relative px-5 py-3 font-display text-sm tracking-wide transition-colors duration-300",
                    isActive ? "text-text-main" : "text-text-muted hover:text-text-main"
                  )}
                  aria-label={`קטגוריה: ${tab.label}${isActive ? " — נבחר" : ""}`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-3 -bottom-6 h-px bg-brand-gold"
                      transition={luxuryTransition}
                    />
                  )}
                </button>
              );
            })}
          </nav>
          <span className="text-xs tracking-wide text-text-muted">
            {filteredProjects.length} פרויקטים
          </span>
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
