"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { loadMetaPixel } from "@/lib/meta-pixel";

const STORAGE_KEY = "cookie-consent-accepted";
const DECLINED_KEY = "cookie-consent-declined";
const POST_INTRO_DELAY_MS = 500;

type IntroWindow = Window & { __introLoaderDone?: boolean };

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const accepted = localStorage.getItem(STORAGE_KEY) === "true";
    const declined = localStorage.getItem(DECLINED_KEY) === "true";
    if (accepted || declined) return;

    let showTimer: number | undefined;

    const scheduleShow = () => {
      showTimer = window.setTimeout(() => setOpen(true), POST_INTRO_DELAY_MS);
    };

    const w = window as IntroWindow;
    if (w.__introLoaderDone) {
      scheduleShow();
      return () => {
        if (showTimer !== undefined) window.clearTimeout(showTimer);
      };
    }

    const onIntroDone = () => scheduleShow();
    window.addEventListener("intro-loader:done", onIntroDone);
    return () => {
      window.removeEventListener("intro-loader:done", onIntroDone);
      if (showTimer !== undefined) window.clearTimeout(showTimer);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      loadMetaPixel();
    }
  }, [mounted]);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "true");
    loadMetaPixel();
    setOpen(false);
  }

  function decline() {
    localStorage.setItem(DECLINED_KEY, "true");
    setOpen(false);
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          dir="rtl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-[9999] w-[min(100%-3rem,28rem)] -translate-x-1/2"
        >
          <div className="rounded-xl border border-white/10 bg-neutral-900/70 p-5 shadow-2xl backdrop-blur-md">
            <div
              id="cookie-consent-title"
              className="mb-1 flex items-center gap-2.5"
            >
              <Cookie
                className="h-[1.125rem] w-[1.125rem] shrink-0 text-brand-gold"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="text-base font-semibold text-white">
                כדי שהחוויה שלך תהיה מושלמת
              </p>
            </div>
            <p
              id="cookie-consent-desc"
              className="mb-4 text-xs leading-relaxed text-neutral-300"
            >
              האתר שלנו משתמש בטכנולוגיות בסיסיות (Cookies) כדי להתאים את התצוגה
              והאנימציות בצורה החלקה ביותר, ולהבטיח גלישה נעימה ומותאמת אישית.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={accept}
                className="cursor-pointer rounded-md bg-brand-teal px-4 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#245a6f]"
              >
                אישור
              </button>
              <button
                type="button"
                onClick={decline}
                className="cursor-pointer rounded-md border border-white/20 px-4 py-2 text-xs font-medium text-neutral-300 transition-colors duration-200 hover:border-white/40 hover:text-white"
              >
                דחייה
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
