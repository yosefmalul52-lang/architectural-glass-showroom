"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { funnelCtas, type FunnelCtaKey } from "@/data/funnel";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FunnelCtaProps {
  step: FunnelCtaKey;
  className?: string;
}

export function FunnelCta({ step, className }: FunnelCtaProps) {
  const cta = funnelCtas[step];
  const isExternal = cta.secondaryHref.startsWith("http");

  return (
    <motion.aside
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      variants={fadeUpVariants}
      className={cn(
        "mt-16 border border-hairline p-8 md:p-10",
        cta.variant === "emphasis"
          ? "border-t-2 border-t-brand-gold bg-bg-elevated"
          : "bg-bg-secondary",
        className
      )}
    >
      <h3 className="font-display text-display-xl font-light text-text-main">
        {cta.headline}
      </h3>
      {cta.subline && (
        <p className="mt-3 max-w-xl text-text-muted leading-relaxed">{cta.subline}</p>
      )}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button variant="gold" asChild>
          <Link href={cta.primaryHref}>
            {cta.primaryLabel}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          {isExternal ? (
            <a href={cta.secondaryHref} target="_blank" rel="noopener noreferrer">
              {cta.secondaryLabel}
            </a>
          ) : (
            <Link href={cta.secondaryHref}>{cta.secondaryLabel}</Link>
          )}
        </Button>
      </div>
    </motion.aside>
  );
}
