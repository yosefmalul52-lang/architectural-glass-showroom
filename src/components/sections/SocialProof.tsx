"use client";

import { motion } from "framer-motion";
import { ArchitecturalGrid } from "@/components/editorial/ArchitecturalGrid";
import { ChapterDivider } from "@/components/experience/ChapterDivider";
import { FunnelCta } from "@/components/conversion/FunnelCta";
import { testimonial } from "@/data/showroom";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";

const clientMonograms = [
  { initials: "ר.א", label: "אדריכלות פנים" },
  { initials: "ד.כ", label: "משרד אדריכלים" },
  { initials: "מ.ש", label: "יזם פרטי" },
  { initials: "ל.ב", label: "עיצוב בוטיק" },
];

function HighlightedQuote({ text }: { text: string }) {
  const parts = text.split(/(יוקרה|דיוק)/g);
  return (
    <>
      &ldquo;
      {parts.map((part, i) =>
        part === "יוקרה" || part === "דיוק" ? (
          <span key={i} className="text-brand-gold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
      &rdquo;
    </>
  );
}

export function SocialProof() {
  return (
    <section
      id="trust"
      data-funnel-step="trust"
      className="relative border-y border-hairline bg-bg-secondary py-section"
    >
      <ChapterDivider beforeSectionId="trust" />
      <ArchitecturalGrid opacity={0.25} />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeUpVariants}
          className="mb-12 text-center"
        >
          <p className="text-sm tracking-[0.12em] text-brand-teal">אמון מקצועי</p>
          <h2 className="mt-4 font-display text-display-2xl font-light text-text-main">
            לקוחות שחווים תוצאה של יוקרה ודיוק
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeUpVariants}
          className="mb-section flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {clientMonograms.map((client) => (
            <div key={client.initials} className="flex flex-col items-center gap-3 text-center">
              <div
                className="flex h-16 w-16 items-center justify-center border border-hairline bg-bg-elevated font-display text-sm tracking-[0.15em] text-text-muted transition-colors duration-500 hover:border-brand-gold hover:text-brand-gold"
                aria-hidden
              >
                {client.initials}
              </div>
              <span className="text-xs tracking-wide text-text-muted">{client.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.blockquote
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeUpVariants}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto mb-10 h-12 w-px bg-brand-gold" aria-hidden />
          <p className="font-display text-sm tracking-[0.2em] text-brand-gold">תוצאה</p>
          <p className="mt-4 font-display text-display-quote font-light leading-snug text-text-main">
            <HighlightedQuote text={testimonial.quote} />
          </p>
          <footer className="mt-12">
            <cite className="not-italic">
              <span className="block text-base font-medium text-text-main">
                {testimonial.author}
              </span>
              <span className="mt-2 block text-sm tracking-wide text-text-muted">
                {testimonial.role}
              </span>
            </cite>
          </footer>
        </motion.blockquote>

        <FunnelCta step="trust" />
      </div>
    </section>
  );
}
