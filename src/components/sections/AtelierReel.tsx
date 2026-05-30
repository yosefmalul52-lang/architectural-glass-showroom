"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  headingContainerVariant,
  headingLineVariant,
  scrollRevealViewport,
  subtextVariant,
} from "@/lib/motion";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";

const craftSpecs = [
  {
    code: "01",
    title: "פרופיל זהב מברש",
    spec: "Brass 2.0mm · Anodized",
    detail: "חיתוך CNC לזווית 45° — כל ציר ממוקם לאלפית המילימטר.",
  },
  {
    code: "02",
    title: "זכוכית Fluted",
    spec: "6mm · Tempered · EN12150",
    detail: "חריטה בלחץ גבוה — פרטיות עדינה מבלי לחסום אור טבעי.",
  },
  {
    code: "03",
    title: "מראה LED Halo",
    spec: "3000K · CNC Edge · Full Polish",
    detail: "גב מוכן לתאורת LED, ליטוש קצוות מלא, בדיקת ישרות לפני משלוח.",
  },
  {
    code: "04",
    title: "Triplex בטיחותי",
    spec: "10mm · PVB · EN12150",
    detail: "שתי שכבות מחוסמות עם folion PVB — תעודת בדיקה לכל פרויקט.",
  },
  {
    code: "05",
    title: "פרופיל שחור מאט",
    spec: "Aluminium · RAL 9005 · 1.2mm",
    detail: "Powder Coat עמיד — קו פרופיל שכמעט ונעלם בחלל.",
  },
  {
    code: "06",
    title: "זכוכית Bronze",
    spec: "8mm · Smoked · Tinted",
    detail: "הצללה מחושבת לפי כמות האור — עומק ואינטימיות בלי חסימת ראות.",
  },
] as const;

type CraftSpec = (typeof craftSpecs)[number];

export function AtelierReel() {
  return (
    <section
      id="atelier"
      data-funnel-step="depth"
      className="relative border-t border-black border-b border-brand-gold bg-white py-section"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-start">

          {/* Content column — intro + spec cards */}
          <div className="flex flex-col gap-10">
            {/* Intro */}
            <aside className="text-center lg:text-start">
              <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-stretch lg:gap-5">
                <div
                  className="relative hidden h-44 w-px shrink-0 bg-brand-gold/60 lg:block"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <motion.h2
                    variants={headingContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollRevealViewport}
                    className="font-display text-display-4xl leading-[1.12] tracking-tight text-text-main lg:text-display-5xl"
                  >
                    {[
                      { text: "חומרים שנבחרים בקפידה.", weight: "font-light" },
                      { text: "גימור שמדבר בעד עצמו.", weight: "font-semibold" },
                    ].map(({ text, weight }, i) => (
                      <span key={i} className="block overflow-hidden">
                        <motion.span
                          className={`block ${weight} ${i > 0 ? "mt-1" : ""}`}
                          variants={headingLineVariant}
                          transition={{ duration: 0.88, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                        >
                          {text}
                        </motion.span>
                      </span>
                    ))}
                  </motion.h2>

                  <div className="flex justify-center lg:justify-start">
                    <HeadingAccent align="start" color="#000000" diamondColor="var(--brand-gold)" />
                  </div>

                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={scrollRevealViewport}
                    variants={subtextVariant}
                    className="type-lead mx-auto mt-6 max-w-md font-body leading-relaxed !text-text-main lg:mx-0 lg:max-w-none"
                  >
                    כל רכיב — פרופיל, זכוכית, ציר וחיבור — נבחר לפי ביצועים, אסתטיקה ועמידות
                    לאורך שנים.{" "}
                    <span className="text-brand-gold">מגיע עם תעודת יצרן ואחריות כתובה.</span>
                  </motion.p>
                </div>
              </div>
            </aside>

            {/* Spec plates */}
            <div className="flex flex-col gap-6 lg:gap-8" aria-label="מפרט חומרים">
              {craftSpecs.map((item, index) => (
                <MaterialSpecCard key={item.code} item={item} index={index} />
              ))}
            </div>
          </div>

          {/* Image column — sticky showcase */}
          <div
            className="relative h-[400px] w-full overflow-hidden border-2 border-brand-gold lg:sticky lg:top-32 lg:h-[620px]"
            style={{ boxShadow: "0 20px 60px rgba(200,180,155,0.2)" }}
          >
            <Image
              src="/portfolio/spa-fluted-gold.png"
              alt="מפרט חומרים — צמרת הזכוכית"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}

function MaterialSpecCard({ item, index }: { item: CraftSpec; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.28) }}
      className="relative overflow-hidden border border-brand-gold/45 bg-white rounded-sm"
    >
      <span
        className="pointer-events-none absolute bottom-2 start-4 select-none font-latin font-light italic leading-none text-accent-teal/[0.06]"
        style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}
        aria-hidden
      >
        {item.code}
      </span>

      <div className="relative z-[1] px-7 py-7 md:px-9 md:py-8">
        <h3 className="font-display text-xl font-light leading-snug text-text-main md:text-2xl">
          {item.title}
        </h3>

        <p className="type-spec-teal mt-2">{item.spec}</p>

        <div className="mt-4 h-px w-full bg-brand-gold/45" />

        <p className="type-lead mt-4 max-w-prose font-body text-base leading-[1.75] !text-text-main">
          {item.detail}
        </p>
      </div>
    </motion.article>
  );
}
