"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxMediaProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  parallaxRange?: [number, number];
}

export function ParallaxMedia({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className,
  parallaxRange = [0, 0.15],
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${parallaxRange[0] * 100}%`, `${parallaxRange[1] * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-0 h-[115%] w-full -top-[7.5%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover image-hover-scale"
        />
      </motion.div>
    </div>
  );
}
