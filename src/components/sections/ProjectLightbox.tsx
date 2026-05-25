"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject, MaterialTag } from "@/data/portfolio";
import { materialLabels } from "@/data/portfolio";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
                className="fixed inset-0 z-[71] flex flex-col"
                data-lenis-prevent
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute left-6 top-6 z-10 text-white/80 transition-colors hover:text-white"
                  aria-label="סגור"
                >
                  <X className="h-6 w-6" strokeWidth={1.25} />
                </button>

                <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pt-16 pb-4 md:px-16">
                  <div className="relative h-full w-full max-w-6xl overflow-hidden">
                    <div
                      className={cn(
                        "relative h-full w-full",
                        !reduced && "ken-burns-active"
                      )}
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  <div className="absolute inset-y-0 right-4 flex items-center md:right-8">
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex h-14 w-14 items-center justify-center border border-white/20 text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
                      aria-label="פרויקט הבא"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 left-4 flex items-center md:left-8">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex h-14 w-14 items-center justify-center border border-white/20 text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
                      aria-label="פרויקט קודם"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 bg-text-main/40 px-6 py-8 backdrop-blur-md md:px-16">
                  <div className="mx-auto max-w-4xl text-center text-white">
                    <p className="text-xs tracking-[0.2em] text-brand-gold">
                      {String(currentIndex + 1).padStart(2, "0")} /{" "}
                      {String(projects.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-display-2xl font-light">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-white/70">
                      {project.description}
                    </p>

                    <p className="mt-6 text-xs tracking-[0.14em] text-brand-gold/80">
                      דגימות זכוכית
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {project.materials.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setActiveMaterial(m)}
                          className={cn(
                            "border px-3 py-1.5 text-xs tracking-wide transition-all duration-300",
                            activeMaterial === m
                              ? "border-brand-gold bg-brand-gold/20 text-brand-gold"
                              : "border-white/20 text-white/80 hover:border-brand-gold/50"
                          )}
                        >
                          {materialLabels[m]}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8">
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
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
