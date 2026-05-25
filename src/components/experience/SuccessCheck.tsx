"use client";

import { motion } from "framer-motion";

export function SuccessCheck() {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="mx-auto mb-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" className="text-brand-teal/30" />
      <motion.path
        d="M20 32 L28 40 L44 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        fill="none"
        className="text-brand-teal"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  );
}
