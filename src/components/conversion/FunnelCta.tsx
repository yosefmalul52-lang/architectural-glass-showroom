"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { funnelCtas, type FunnelCtaKey } from "@/data/funnel";
import { isWhatsAppUrl, onWhatsAppClick } from "@/lib/meta-pixel";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface FunnelCtaProps {
  step: FunnelCtaKey;
  className?: string;
}

export function FunnelCta({ step, className }: FunnelCtaProps) {
  const cta = funnelCtas[step];
  const isExternal = cta.secondaryHref.startsWith("http");
  const isWhatsApp = isExternal && isWhatsAppUrl(cta.secondaryHref);

  return (
    <motion.aside
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      variants={fadeUpVariants}
      className={cn(
        "card-surface mt-10 p-7 md:p-9",
        cta.variant === "emphasis"
          ? "card-surface--cream border-t-2 border-t-brand-gold"
          : "card-surface--muted",
        className
      )}
    >
      <h3 className="font-display text-display-xl font-light tracking-tight text-text-main">
        {cta.headline}
      </h3>
      <HeadingAccent size="sm" />
      {cta.subline && (
        <p className="type-lead mt-3 max-w-xl">{cta.subline}</p>
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
            <a
              href={cta.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={
                isWhatsApp
                  ? () => onWhatsAppClick(`funnel_${step}`)
                  : undefined
              }
            >
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
