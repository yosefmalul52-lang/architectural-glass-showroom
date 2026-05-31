"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/data/site";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_EXIT = [0.76, 0, 0.24, 1] as const;

export function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setIsLoading(false);
      (window as Window & { __introLoaderDone?: boolean }).__introLoaderDone = true;
      window.dispatchEvent(new Event("intro-loader:done"));
    }, 3600);

    return () => {
      clearTimeout(t);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
          dir="rtl"
          style={{ width: "100%", maxWidth: "100%" }}
          initial={{ opacity: 0, scale: 0.96, filter: "blur(14px)" }}
          animate={{
            opacity: 1,
            scale: [0.96, 1],
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{
            opacity: { duration: 0.85, ease: EASE_OUT, delay: 0.1 },
            scale: { duration: 1.25, ease: EASE_OUT, delay: 0.1 },
            filter: { duration: 1.2, ease: "easeOut", delay: 0.1 },
            default: { duration: 0.85, ease: EASE_EXIT },
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-70"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.55) 0%, rgba(200,180,155,0.12) 55%, rgba(21,21,21,0.04) 100%)",
            }}
          />

          {/* Page-wide gold shimmer — kept inside viewport bounds */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <motion.div
              className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[rgba(200,180,155,0.45)] to-transparent blur-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: "400%" }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
              className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.35)] to-transparent blur-xl"
              initial={{ x: "-120%" }}
              animate={{ x: "380%" }}
              transition={{ duration: 2.1, ease: "easeInOut", delay: 0.55 }}
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
