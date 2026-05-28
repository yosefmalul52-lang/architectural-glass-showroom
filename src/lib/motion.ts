import type { Transition, Variants } from "framer-motion";

export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const luxuryTransition: Transition = {
  duration: 0.7,
  ease: MOTION_EASE,
};

/** Repeatable scroll reveal — fires every time element enters viewport */
export const scrollRevealViewport = {
  once: false,
  // Mobile-friendly threshold: triggers earlier on first downward scroll.
  margin: "0px 0px -12% 0px" as const,
  amount: 0.12,
};

/** One-shot reveal for decorative / non-heading elements */
export const scrollRevealOnce = {
  once: true,
  margin: "0px 0px -10% 0px" as const,
  amount: 0.08,
};

export const fadeUpVariants: Variants = {
  hidden: { y: 36, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: MOTION_EASE },
  },
};

/** Standard heading animation — clip + slide per line, re-triggers on every scroll-in */
export const headingLineVariant: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.88, ease: MOTION_EASE },
  },
};

/** Stagger wrapper for heading lines */
export const headingContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Sub-text fade-up with slight delay after heading */
export const subtextVariant: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: MOTION_EASE, delay: 0.15 },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: luxuryTransition,
  },
};

export const wordRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: MOTION_EASE },
  },
};

export const lineExpandVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: MOTION_EASE, delay: 0.4 },
  },
};

export const parallaxTransition: Transition = {
  duration: 0,
  ease: "linear",
};

export const motionSlow: Transition = {
  duration: 1.2,
  ease: MOTION_EASE,
};

export const magneticSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

export const chapterEnterVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: MOTION_EASE },
  },
};

export const scaleRevealVariants: Variants = {
  hidden: { scale: 0.92, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: MOTION_EASE },
  },
};

export const horizontalStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const horizontalStaggerItem: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: MOTION_EASE },
  },
};
