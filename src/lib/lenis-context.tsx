"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (
    target: HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => void;
  stop: () => void;
  start: () => void;
  on: (event: "scroll", handler: () => void) => void;
};

type LenisContextValue = {
  lenis: LenisInstance | null;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void;
  pause: () => void;
  resume: () => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
  pause: () => {},
  resume: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

/** No fixed header — anchors align to section top */
const SCROLL_ANCHOR_OFFSET = 0;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<LenisInstance | null>(null);
  const [lenis, setLenis] = useState<LenisInstance | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
      return;
    }

    let rafId = 0;
    let mounted = true;

    import("lenis").then(({ default: Lenis }) => {
      if (!mounted) return;

      const instance = new Lenis({
        lerp: 0.16,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 0.95,
      }) as LenisInstance;

      instance.on("scroll", () => {
        window.dispatchEvent(new Event("app-scroll"));
      });

      lenisRef.current = instance;
      setLenis(instance);

      document.documentElement.classList.add("lenis", "lenis-smooth");

      const raf = (time: number) => {
        instance.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!lenis) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -SCROLL_ANCHOR_OFFSET, duration: 0.85 });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lenis]);

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { offset?: number }) => {
      const el =
        typeof target === "string"
          ? (document.querySelector(target) as HTMLElement | null)
          : target;
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, {
          offset: options?.offset ?? -SCROLL_ANCHOR_OFFSET,
          duration: 0.85,
        });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis]
  );

  const pause = useCallback(() => lenis?.stop(), [lenis]);
  const resume = useCallback(() => lenis?.start(), [lenis]);

  return (
    <LenisContext.Provider value={{ lenis, scrollTo, pause, resume }}>
      {children}
    </LenisContext.Provider>
  );
}
