"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ArrowLeft } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject, MaterialTag } from "@/data/portfolio";
import { materialLabels } from "@/data/portfolio";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/lib/lenis-context";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { luxuryTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SHOWROOM_INTEREST_KEY = "showroom-interest";

interface ProjectLightboxProps {
  project: PortfolioProject | null;
  projects: PortfolioProject[];
  onClose: () => void;
  onNavigate: (project: PortfolioProject) => void;
}

export function ProjectLightbox({
  project,
  projects,
  onClose,
  onNavigate,
}: ProjectLightboxProps) {
  const { pause, resume } = useLenis();
  const reduced = usePrefersReducedMotion();
  const [activeMaterial, setActiveMaterial] = useState<MaterialTag | null>(null);
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;

  useEffect(() => {
    if (project) {
      pause();
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
      setActiveMaterial(project.materials[0] ?? null);
    } else {
      resume();
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }
    return () => {
      resume();
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [project, pause, resume]);

  function goPrev() {
    if (currentIndex <= 0) onNavigate(projects[projects.length - 1]);
    else onNavigate(projects[currentIndex - 1]);
  }

  function goNext() {
    if (currentIndex >= projects.length - 1) onNavigate(projects[0]);
    else onNavigate(projects[currentIndex + 1]);
  }

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goNext();
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <DialogPrimitive.Root open={!!project} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {project && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-text-main/95 backdrop-blur-xl"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={luxuryTransition}
                className="fixed inset-0 z-[71] flex flex-col lg:flex-row"
                data-lenis-prevent
                aria-label="תצוגת פרויקט מלאה"
              >
                <DialogPrimitive.Title className="sr-only">
                  {project.title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  {project.description}
                </DialogPrimitive.Description>

                <button
                  type="button"
                  onClick={onClose}
                  className="absolute left-6 top-6 z-20 text-white/80 transition-colors hover:text-white"
                  aria-label="סגור"
                >
                  <X className="h-6 w-6" strokeWidth={1.25} />
                </button>

                {/* Image stage */}
                <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pt-16 pb-4 lg:px-12 lg:pb-8 lg:pt-16">
                  <div className="relative h-full w-full max-w-5xl overflow-hidden">
                    <div
                      className={cn(
                        "relative h-full w-full min-h-[40vh] lg:min-h-0",
                        !reduced && "ken-burns-active"
                      )}
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        quality={95}
                        sizes="(max-width: 768px) 100vw, 65vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-y-0 right-4 flex items-center lg:right-6">
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
                      aria-label="פרויקט הבא"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 left-4 flex items-center lg:left-6">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
                      aria-label="פרויקט קודם"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Floating data sidebar — desktop */}
                <aside
                  className="glass-premium relative z-10 hidden w-full max-w-sm shrink-0 flex-col p-8 text-white lg:m-6 lg:flex lg:w-80 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto xl:w-96"
                  aria-label="פרטי פרויקט"
                >
                  <ProjectDetails
                    project={project}
                    currentIndex={currentIndex}
                    total={projects.length}
                    activeMaterial={activeMaterial}
                    onMaterialChange={setActiveMaterial}
                    onClose={onClose}
                  />
                </aside>

                {/* Mobile details panel */}
                <div className="glass-premium border-t border-white/20 p-6 lg:hidden">
                  <ProjectDetails
                    project={project}
                    currentIndex={currentIndex}
                    total={projects.length}
                    activeMaterial={activeMaterial}
                    onMaterialChange={setActiveMaterial}
                    onClose={onClose}
                    compact
                  />
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

function ProjectDetails({
  project,
  currentIndex,
  total,
  activeMaterial,
  onMaterialChange,
  onClose,
  compact = false,
}: {
  project: PortfolioProject;
  currentIndex: number;
  total: number;
  activeMaterial: MaterialTag | null;
  onMaterialChange: (m: MaterialTag) => void;
  onClose: () => void;
  compact?: boolean;
}) {
  return (
    <div className={cn(compact ? "text-center" : "flex flex-col")}>
      <p className="type-spec text-brand-gold">
        {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h3
        className={cn(
          "mt-3 font-display font-light tracking-tight text-white",
          compact ? "text-display-2xl" : "text-display-3xl"
        )}
      >
        {project.title}
      </h3>
      <p className="type-lead mt-4 text-white/75">{project.description}</p>

      <p className="type-spec mt-8 text-brand-gold/90" id="material-filter-label">
        דגימות זכוכית
      </p>
      <div
        role="group"
        aria-labelledby="material-filter-label"
        className={cn(
          "mt-3 flex flex-wrap gap-2",
          compact && "justify-center"
        )}
      >
        {project.materials.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onMaterialChange(m)}
            aria-label={`בחירת חומר: ${materialLabels[m]}`}
            aria-pressed={activeMaterial === m}
            className={cn(
              "border px-3 py-1.5 transition-all duration-300",
              activeMaterial === m
                ? "border-brand-gold text-brand-gold"
                : "border-white/25 text-white/80 hover:border-brand-gold/50"
            )}
          >
            <span className="type-spec text-[9px]">{materialLabels[m]}</span>
          </button>
        ))}
      </div>

      <div className={cn("mt-8", compact && "flex justify-center")}>
        <Button variant="gold" asChild>
          <Link
            href="#contact"
            onClick={() => {
              sessionStorage.setItem(SHOWROOM_INTEREST_KEY, project.title);
              onClose();
            }}
          >
            רוצים פרויקט בסגנון הזה?
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
