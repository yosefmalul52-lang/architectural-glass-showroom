"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/editorial/SectionHeader";
import { ChapterDivider } from "@/components/experience/ChapterDivider";
import { FunnelCta } from "@/components/conversion/FunnelCta";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";

const craftDetails = [
  { title: "פרופיל זהב מברש", detail: "גימור brass מדויק על זוויות וצירים" },
  { title: "זכוכית מחוספת", detail: "Fluted לפרטיות עדינה בלי אובדן אור" },
  { title: "מראות LED", detail: "תאורת halo אחורית עם חיתוך CNC" },
  { title: "פרופיל שחור מאט", detail: "אלומיניום דק לפרופיל מינימלי" },
  { title: "Triplex 8–10 מ״מ", detail: "בטיחות מלאה וליטוש קצוות" },
  { title: "זכוכית מעושנת", detail: "Bronze smoked לעומק ואינטימיות" },
];

export function AtelierReel() {
  const duplicated = [...craftDetails, ...craftDetails];

  return (
    <section
      id="atelier"
      data-funnel-step="depth"
      className="relative overflow-hidden border-y border-hairline bg-bg-primary py-section texture-fluted"
    >
      <ChapterDivider beforeSectionId="atelier" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          number="03"
          label="אמנות החומר"
          title="מה שמבדיל בוטיק ממתקין"
          description="מקרו של חומר, פרופיל ואור — כל פרט נבנה בדיוק מילימטרי."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeUpVariants}
          className="relative -mx-6 overflow-hidden lg:-mx-10"
        >
          <div className="atelier-track gap-6 px-4">
            {duplicated.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="flex h-[180px] w-[260px] shrink-0 flex-col justify-between border border-hairline bg-bg-elevated p-6 md:h-[200px] md:w-[300px]"
              >
                <span className="font-display text-xs tracking-[0.2em] text-brand-teal">
                  פרט חומר
                </span>
                <div>
                  <h3 className="font-display text-xl text-text-main">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.detail}</p>
                </div>
                <div className="h-px w-10 bg-brand-gold" />
              </div>
            ))}
          </div>
        </motion.div>

        <FunnelCta step="atelier" />
      </div>
    </section>
  );
}
