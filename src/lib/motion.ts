import type { Transition, Variants } from "framer-motion";

export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

export const luxuryTransition: Transition = {
  duration: 0.7,
  ease: MOTION_EASE,
};

export const scrollRevealViewport = {
  once: true,
  margin: "-100px" as const,
};

export const fadeUpVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: luxuryTransition,
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
