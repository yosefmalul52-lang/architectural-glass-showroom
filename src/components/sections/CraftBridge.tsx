"use client";

import { motion } from "framer-motion";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import { trustPillars } from "@/data/social-proof";
import { BRAND } from "@/data/site";
import {
  fadeUpVariants,
  MOTION_EASE,
  scrollRevealViewport,
} from "@/lib/motion";
export function CraftBridge() {
  return (
    <section
      id="process"
      data-funnel-step="process"
      className="relative py-section"
      style={{ backgroundColor: "#F3ECE1" }}
      aria-label="תהליך העבודה"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeUpVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-display-3xl font-light leading-tight tracking-tight text-heading-light lg:text-display-4xl">
            כל שלב נבנה בדיוק —{" "}
            <span className="font-semibold text-accent-teal">בלי קיצורי דרך</span>
          </h2>
          <HeadingAccent align="center" className="mx-auto" color="#000000" diamondColor="var(--accent-teal)" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: MOTION_EASE }}
          className="mt-14 lg:mt-16"
          aria-label="עמודי אמון"
        >
          <div className="grid grid-cols-1 gap-px bg-accent-teal/45 sm:grid-cols-3">
            {trustPillars.map(({ Icon, title, sub }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: MOTION_EASE, delay: index * 0.08 }}
                className="flex flex-col items-center bg-[#F3ECE1] px-4 py-6 text-center sm:px-6 sm:py-8"
              >
                {Icon ? (
                  <Icon
                    className="mb-3 text-accent-teal"
                    size={32}
                    strokeWidth={1}
                    aria-hidden
                  />
                ) : null}
                <p className="font-display text-lg font-light leading-snug tracking-tight text-text-main lg:text-xl">
                  {title}
                </p>
                <p className="type-lead mt-3 leading-relaxed text-text-muted">{sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeUpVariants}
          className="mx-auto mt-14 max-w-3xl border-t border-accent-teal pt-14 text-center lg:mt-16 lg:pt-16"
        >
          <p className="type-lead mx-auto max-w-[42rem] leading-[1.85] text-text-main">
            <span className="text-accent-teal">{BRAND.name} מלווה אתכם לאורך כל הדרך</span> — מתכנון ומדידה בשטח, דרך ייצור מדויק
            במפעל, ועד התקנה נקייה בחלל. הליווי מתאים את עצמו לצרכים של כל פרויקט:
            בחירת חומרים, דיוק במפרט הנדסי ועמידה בלוחות זמנים — בלי פשרות על איכות
            הגימור.
          </p>
          <p className="type-lead mx-auto mt-6 max-w-[42rem] leading-[1.85] text-text-muted">
            אנחנו עובדים לצד אדריכלים, קבלנים ובעלי בתים פרטיים, ומספקים זכוכית
            אדריכלית מותאמת אישית —{" "}
            <span className="!text-accent-teal">תכנון, הנדסה וביצוע תחת קורת גג אחת</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
