"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { ChapterDivider } from "@/components/experience/ChapterDivider";
import {
  materialFilters,
  projectsByCategory,
  showroomCategories,
  type MaterialTag,
  type PortfolioProject,
  type ProjectCategory,
} from "@/data/portfolio";
import { gallerySpanClass, partitionShowroom } from "@/lib/showroom-layout";
import { luxuryTransition } from "@/lib/motion";
import { FunnelCta } from "@/components/conversion/FunnelCta";
import { ProjectLightbox } from "./ProjectLightbox";
import { ShowroomCard } from "./ShowroomCard";
import { cn } from "@/lib/utils";

const SHOWROOM_INTEREST_KEY = "showroom-interest";
const SHOWROOM_TAB_KEY = "showroom-tab";

function handleProjectSelect(
  project: PortfolioProject,
  onSelect: (p: PortfolioProject) => void
) {
  sessionStorage.setItem(SHOWROOM_INTEREST_KEY, project.title);
  onSelect(project);
}

const tabs = showroomCategories;

function filterByMaterial(projects: PortfolioProject[], material: MaterialTag | "all") {
  if (material === "all") return projects;
  return projects.filter((p) => p.materials.includes(material));
}

function ShowroomGrid({
  projects,
  onSelect,
}: {
  projects: PortfolioProject[];
  onSelect: (p: PortfolioProject) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { featured, secondary, gallery } = partitionShowroom(projects);

  if (projects.length === 0) {
    return (
      <p className="py-12 text-center text-text-muted">אין פרויקטים בתצוגה לפי הפילטר הנבחר.</p>
    );
  }

  const projectIndex = (id: string) => projects.findIndex((p) => p.id === id);
  const denseGallery = gallery.length >= 6;

  return (
    <>
      <div className="showroom-stack hidden md:flex">
        <div className="showroom-lead">
          {featured && (
            <div className="showroom-lead__hero">
              <ShowroomCard
                card={featured}
                index={projectIndex(featured.id)}
                variant="hero"
                onSelect={(p) => handleProjectSelect(p, onSelect)}
              />
            </div>
          )}

          {secondary.length > 0 && (
            <div
              className={cn(
                "showroom-lead__side",
                secondary.length === 1 && "showroom-lead__side--single"
              )}
            >
              {secondary.map((card) => (
                <ShowroomCard
                  key={card.id}
                  card={card}
                  index={projectIndex(card.id)}
                  variant="compact"
                  onSelect={(p) => handleProjectSelect(p, onSelect)}
                />
              ))}
            </div>
          )}
        </div>

        {gallery.length > 0 && (
          <div
            className={cn(
              "showroom-gallery",
              denseGallery && "showroom-gallery--dense"
            )}
          >
            {gallery.map((card) => (
              <div
                key={card.id}
                className={cn("min-w-0", gallerySpanClass(card.aspect))}
              >
                <ShowroomCard
                  card={card}
                  index={projectIndex(card.id)}
                  variant="tile"
                  onSelect={(p) => handleProjectSelect(p, onSelect)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="snap-carousel flex items-stretch gap-4 overflow-x-auto pb-6 md:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          const children = el.children;
          if (!children.length) return;
          const center = el.scrollLeft + el.clientWidth / 2;
          let closest = 0;
          let minDist = Infinity;
          Array.from(children).forEach((child, i) => {
            const elChild = child as HTMLElement;
            const childCenter = elChild.offsetLeft + elChild.offsetWidth / 2;
            const dist = Math.abs(center - childCenter);
            if (dist < minDist) {
              minDist = dist;
              closest = i;
            }
          });
          setActiveIndex(closest);
        }}
      >
        {projects.map((card, index) => (
          <div
            key={card.id}
            className={cn(
              "transition-transform duration-500",
              activeIndex === index ? "scale-100" : "scale-[0.94] opacity-85"
            )}
            style={{ transitionTimingFunction: "var(--ease-luxury)" }}
          >
            <ShowroomCard
              card={card}
              index={index}
              variant={card.featured ? "hero" : "tile"}
              active={activeIndex === index}
              onSelect={(p) => handleProjectSelect(p, onSelect)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function DynamicShowroom() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("showers");
  const [material, setMaterial] = useState<MaterialTag | "all">("all");
  const [lightboxProject, setLightboxProject] = useState<PortfolioProject | null>(null);

  const baseProjects = projectsByCategory[activeTab];
  const filteredProjects = useMemo(
    () => filterByMaterial(baseProjects, material),
    [baseProjects, material]
  );

  useEffect(() => {
    setLightboxProject(null);
  }, [activeTab, material]);

  useEffect(() => {
    const tab = sessionStorage.getItem(SHOWROOM_TAB_KEY);
    if (tab === "mirrors" || tab === "showers" || tab === "offices") {
      setActiveTab(tab);
      sessionStorage.removeItem(SHOWROOM_TAB_KEY);
    }
  }, []);

  const projectCount = filteredProjects.length;

  return (
    <section id="showroom" data-funnel-step="desire" className="py-section">
      <ChapterDivider beforeSectionId="showroom" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          number="02"
          label="תיק עבודות"
          title="בחרו את הסגנון שמתקרב לחזון שלכם"
          description="בחרו קטגוריה, סננו לפי חומר — כל פרויקט עם פרטי גימור מלאים. לחצו לצפייה."
        />

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as ProjectCategory)}
          dir="rtl"
        >
          <div className="mb-6 flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
            <TabsList className="relative mb-0 border-0 bg-transparent p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative z-10 px-6 md:px-8"
                >
                  {tab.label}
                  {activeTab === tab.value && (
                    <motion.span
                      layoutId="showroom-tab-indicator"
                      className="absolute inset-x-3 -bottom-4 h-px bg-brand-gold"
                      transition={luxuryTransition}
                    />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <p className="text-xs tracking-wide text-text-muted">
              {projectCount} פרויקטים בתצוגה
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {materialFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setMaterial(f.value)}
                className={cn(
                  "relative border px-4 py-2 text-xs tracking-wide transition-colors duration-500",
                  material === f.value
                    ? "border-brand-gold text-text-main"
                    : "border-hairline text-text-muted hover:border-brand-gold/50 hover:text-text-main"
                )}
              >
                {material === f.value && (
                  <motion.span
                    layoutId="material-filter-active"
                    className="absolute inset-0 bg-brand-gold/10"
                    transition={luxuryTransition}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <AnimatePresence mode="popLayout">
                {activeTab === tab.value && (
                  <motion.div
                    key={`${tab.value}-${material}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={luxuryTransition}
                  >
                    <ShowroomGrid projects={filteredProjects} onSelect={setLightboxProject} />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <FunnelCta step="showroom" />
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
