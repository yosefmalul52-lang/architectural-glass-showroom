"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CursorLight() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const springConfig = { stiffness: 120, damping: 22, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!enabled || reduced) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[45] hidden md:block"
      aria-hidden
    >
      <motion.div
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x,
          y,
          background:
            "radial-gradient(circle, rgba(200,180,155,0.13) 0%, rgba(220,206,187,0.05) 35%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
