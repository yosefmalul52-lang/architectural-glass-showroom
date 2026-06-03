"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/data/site";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_EXIT = [0.76, 0, 0.24, 1] as const;
const INTRO_HOLD_MS = 1940;

function revealSiteUnderLoader() {
  document.documentElement.classList.add("intro-exiting");
  document.getElementById("intro-loader-static")?.remove();
}

function signalIntroDone() {
  (window as Window & { __introLoaderDone?: boolean }).__introLoaderDone = true;
  window.dispatchEvent(new Event("intro-loader:done"));
}

function finishIntro() {
  document.documentElement.classList.remove("intro-loading", "intro-exiting");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  signalIntroDone();
}

export function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("intro-loading");
    document.getElementById("intro-loader-static")?.remove();

    const t = window.setTimeout(() => {
      revealSiteUnderLoader();
      setIsLoading(false);
    }, INTRO_HOLD_MS);

    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait" onExitComplete={finishIntro}>
      {isLoading && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
          dir="rtl"
          initial={false}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.68, ease: EASE_EXIT }}
          style={{ willChange: "transform" }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(200,180,155,0.12) 55%, rgba(21,21,21,0.04) 100%)",
            }}
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <motion.div
              className="absolute top-0 left-0 h-full w-[50vw] bg-gradient-to-r from-transparent via-[rgba(200,180,155,0.48)] to-transparent blur-2xl"
              initial={{ x: "-50vw" }}
              animate={{ x: "100vw" }}
              transition={{ duration: 1.75, ease: EASE_OUT, delay: 0.08 }}
            />
            <motion.div
              className="absolute top-0 left-0 h-full w-[28vw] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent blur-xl"
              initial={{ x: "-28vw" }}
              animate={{ x: "100vw" }}
              transition={{ duration: 1.95, ease: EASE_OUT, delay: 0.18 }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <img
              src="/logo-loading-transparent.png"
              alt={BRAND.name}
              className="h-52 w-auto object-contain sm:h-60 md:h-[17rem] lg:h-72"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
