"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject } from "@/data/portfolio";
import { useLenis } from "@/lib/lenis-context";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { luxuryTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;

  useEffect(() => {
    if (project) {
      pause();
      document.documentElement.classList.add("lenis-stopped");
      document.body.style.overflow = "hidden";
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
                className="fixed inset-0 z-[70] backdrop-blur-2xl" style={{ background: "rgba(245, 237, 227, 0.82)" }}
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
                  className="absolute left-6 top-6 z-20 text-[#6b5c4a]/70 transition-colors hover:text-[#6b5c4a]"
                  aria-label="סגור"
                >
                  <X className="h-6 w-6" strokeWidth={1.25} />
                </button>

                {/* Image stage */}
                <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pt-14 pb-3 sm:px-4 lg:px-16 lg:pb-10 lg:pt-16">
                  <div className="relative h-full w-full overflow-hidden">
                    <div
                      className={cn(
                        "relative h-full w-full min-h-[50vh]",
                        !reduced && "ken-burns-active"
                      )}
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        quality={95}
                        sizes="(max-width: 640px) 100vw, 95vw"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* counter */}
                  <p className="absolute top-6 right-6 font-[family-name:var(--font-cormorant)] text-xs tracking-widest text-[#6b5c4a]/50">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </p>

                  <div className="absolute inset-y-0 right-2 flex items-center sm:right-4 lg:right-6">
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex h-11 w-11 items-center justify-center border border-[#C8B49B]/40 bg-[#f5ede3]/60 text-[#6b5c4a] transition-colors hover:border-brand-gold hover:text-brand-gold sm:h-12 sm:w-12"
                      aria-label="פרויקט הבא"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 left-2 flex items-center sm:left-4 lg:left-6">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex h-11 w-11 items-center justify-center border border-[#C8B49B]/40 bg-[#f5ede3]/60 text-[#6b5c4a] transition-colors hover:border-brand-gold hover:text-brand-gold sm:h-12 sm:w-12"
                      aria-label="פרויקט קודם"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
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

