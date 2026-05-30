"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      (window as Window & { __introLoaderDone?: boolean }).__introLoaderDone = true;
      window.dispatchEvent(new Event("intro-loader:done"));
    }, 3900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white"
          dir="rtl"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="absolute inset-0 opacity-55"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(0,0,0,0.04) 100%)",
            }}
          />
          <motion.div
            className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-[rgba(200,180,155,0.34)] to-transparent blur-2xl"
            initial={{ x: "-10%" }}
            animate={{ x: "260%" }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.15 }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="relative overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              <motion.img
                src="/logo-tzameret-latest-transparent.png"
                alt="צמרת הזכוכית"
                className="h-60 w-auto object-contain md:h-80"
                initial={{ opacity: 0, scale: 1.2, filter: "blur(22px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 2.2, ease: "easeOut", delay: 0.28 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
