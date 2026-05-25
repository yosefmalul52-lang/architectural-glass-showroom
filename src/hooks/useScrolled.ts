"use client";

import { useEffect, useState } from "react";

export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > threshold);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("app-scroll", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("app-scroll", update);
    };
  }, [threshold]);

  return scrolled;
}
