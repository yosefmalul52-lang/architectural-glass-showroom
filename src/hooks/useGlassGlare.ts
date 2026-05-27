"use client";

import { useCallback, useState } from "react";

export function useGlassGlare() {
  const [glare, setGlare] = useState({ x: 0, y: 0, active: false });

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlare({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    setGlare((g) => ({ ...g, active: false }));
  }, []);

  const onPointerEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlare({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const glareBackground =
    glare.active
      ? `radial-gradient(circle at ${glare.x}px ${glare.y}px, rgba(255,255,255,0.12) 0%, transparent 80%)`
      : "transparent";

  return {
    glareBackground,
    onPointerMove,
    onPointerEnter,
    onPointerLeave,
  };
}
