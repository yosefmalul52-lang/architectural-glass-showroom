"use client";

import { useMemo, useRef, type RefObject } from "react";
import { motion, useInView, useScroll, useTransform, type MotionStyle } from "framer-motion";
import {
  MOTION_EASE,
  headingContainerVariant,
  headingLineVariant,
  scrollRevealViewport,
  subtextVariant,
} from "@/lib/motion";
import { useGlassGlare } from "@/hooks/useGlassGlare";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import { cn } from "@/lib/utils";

const E = MOTION_EASE;
const STACK_BASE_TOP = 96;
const STACK_TOP_STEP = 20;

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
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useMemo(
    () =>
      craftSpecs.map(
        () => ({ current: null }) as RefObject<HTMLDivElement | null>
      ),
    []
  );
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 0.15", "end 0.85"],
  });

  return (
    <section
      id="atelier"
      data-funnel-step="depth"
      className="relative py-section"
      style={{ backgroundColor: "#F3EBE1" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-12 md:grid md:grid-cols-[minmax(0,22rem)_1fr] md:gap-x-14 xl:grid-cols-[minmax(0,26rem)_1fr] xl:gap-x-20">
          {/* Wrapper stretches to card-stack height so sticky aside can pin inside it */}
          <div className="relative min-h-0 md:self-stretch">
            <aside className="text-center md:sticky md:top-24 md:z-20 md:text-start lg:top-28">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:gap-5">
              <div
                className="relative hidden h-44 w-px shrink-0 overflow-hidden bg-accent-teal/15 md:block"
                aria-hidden
              >
                <motion.div
                  className="absolute inset-x-0 top-0 h-full origin-top bg-accent-teal"
                  style={{ scaleY: reduced ? 1 : scrollYProgress }}
                />
              </div>

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

                <div className="flex justify-center md:justify-start">
                  <HeadingAccent align="start" color="#2d6b84" />
                </div>

                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={scrollRevealViewport}
                  variants={subtextVariant}
                  className="type-lead mx-auto mt-6 max-w-md font-[family-name:var(--font-assistant)] leading-relaxed md:mx-0 md:max-w-none"
                >
                  כל רכיב — פרופיל, זכוכית, ציר וחיבור — נבחר לפי ביצועים, אסתטיקה ועמידות
                  לאורך שנים. מגיע עם תעודת יצרן ואחריות כתובה.
                </motion.p>
              </div>
            </div>
            </aside>
          </div>

          <div
            ref={stackRef}
            className="relative hidden pb-[40vh] md:block"
            aria-label="מפרט חומרים"
          >
            {craftSpecs.map((item, index) => {
              const isLast = index === craftSpecs.length - 1;
              const nextCardRef = isLast ? null : cardRefs[index + 1];

              return (
                <div
                  key={item.code}
                  ref={cardRefs[index]}
                  className={cn("sticky", !isLast && "mb-10")}
                  style={{
                    top: STACK_BASE_TOP + index * STACK_TOP_STEP,
                    zIndex: 10 + index,
                  }}
                >
                  {isLast || reduced ? (
                    <GlassCardShell item={item} withGlare={!reduced} />
                  ) : (
                    <DepthStackingCard item={item} nextCardRef={nextCardRef!} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-8 md:hidden" aria-label="מפרט חומרים">
            {craftSpecs.map((item, index) => (
              <MobileGlassCard key={item.code} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const MATERIAL_CARD_BASE = cn(
  "card-surface card-surface-interactive group relative overflow-hidden bg-white"
);

function MaterialCard({
  item,
  motionStyle,
  withGlare = false,
}: {
  item: CraftSpec;
  motionStyle?: MotionStyle;
  withGlare?: boolean;
}) {
  const glare = useGlassGlare();

  const handlers = withGlare
    ? {
        onPointerMove: glare.onPointerMove,
        onPointerEnter: glare.onPointerEnter,
        onPointerLeave: glare.onPointerLeave,
      }
    : {};

  return (
    <motion.article
      style={motionStyle}
      className={MATERIAL_CARD_BASE}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.45, ease: E }}
      {...handlers}
    >
      {/* Top teal accent stripe */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-teal/45 to-transparent transition-all duration-500 group-hover:via-accent-teal/70" />

      {/* Left teal accent stripe */}
      <div className="pointer-events-none absolute inset-y-0 start-0 w-px bg-gradient-to-b from-transparent via-accent-teal/45 to-transparent transition-all duration-500 group-hover:via-accent-teal/70" aria-hidden />

      {/* Right teal accent stripe */}
      <div className="pointer-events-none absolute inset-y-0 end-0 w-px bg-gradient-to-b from-transparent via-accent-teal/45 to-transparent transition-all duration-500 group-hover:via-accent-teal/70" aria-hidden />

      {/* Glare overlay */}
      {withGlare && (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: glare.glareBackground }}
          aria-hidden
        />
      )}

      <CardInner item={item} />

      {/* Bottom teal accent stripe */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-teal/45 to-transparent transition-all duration-500 group-hover:via-accent-teal/70" />
    </motion.article>
  );
}

function GlassCardShell({
  item,
  withGlare,
}: {
  item: CraftSpec;
  withGlare?: boolean;
}) {
  return <MaterialCard item={item} withGlare={withGlare} />;
}

function DepthStackingCard({
  item,
  nextCardRef,
}: {
  item: CraftSpec;
  nextCardRef: RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: nextCardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.72]);

  return (
    <MaterialCard
      item={item}
      withGlare
      motionStyle={{ scale, opacity, willChange: "transform, opacity" }}
    />
  );
}

function MobileGlassCard({ item, index }: { item: CraftSpec; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px", amount: 0.12 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: E, delay: index * 0.05 }}
      className={cn(MATERIAL_CARD_BASE, "shadow-[0_10px_24px_rgba(24,52,74,0.12)]")}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-teal/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 start-0 w-px bg-gradient-to-b from-transparent via-accent-teal/45 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-px bg-gradient-to-b from-transparent via-accent-teal/45 to-transparent" aria-hidden />
      <CardInner item={item} />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-teal/40 to-transparent" />
    </motion.article>
  );
}

function CardInner({ item }: { item: CraftSpec }) {
  return (
    <>
      <span
        className="pointer-events-none absolute bottom-2 start-3 select-none font-[family-name:var(--font-cormorant)] font-light italic leading-none text-accent-teal/[0.07]"
        style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)" }}
        aria-hidden
      >
        {item.code}
      </span>

      <div className="relative z-[2] p-8 md:p-10">
        <span className="type-spec mb-4 block tabular-nums">{item.code}</span>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.5, ease: E }}
          className="font-display text-xl font-light leading-snug text-text-main md:text-2xl"
        >
          {item.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.45, ease: E, delay: 0.05 }}
          className="type-spec mt-2"
        >
          {item.spec}
        </motion.p>

        <div className="mt-4 h-px w-full bg-accent-teal/30" />

        <p className="type-lead mt-4 max-w-prose font-[family-name:var(--font-assistant)] text-base leading-[1.75] text-text-muted">
          {item.detail}
        </p>
      </div>
    </>
  );
}
