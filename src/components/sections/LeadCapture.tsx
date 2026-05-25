"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnderlineInput } from "@/components/ui/underline-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChapterDivider } from "@/components/experience/ChapterDivider";
import { SuccessCheck } from "@/components/experience/SuccessCheck";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SHOWROOM_INTEREST_KEY = "showroom-interest";

const projectTypes = [
  { value: "spa", label: "חלל ספא / רחצה פרטי" },
  { value: "residential", label: "בית פרטי" },
  { value: "office", label: "משרד / מסחרי" },
  { value: "pool", label: "בריכה / חוץ" },
  { value: "other", label: "אחר" },
];

const benefits = [
  "ייעוץ אדריכלי ראשוני ללא התחייבות",
  "לוח זמנים ואפשרויות חומר תוך 24 שעות",
  "תיאום ישיר עם צוות ההנדסה",
];

export function LeadCapture() {
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    const interest = sessionStorage.getItem(SHOWROOM_INTEREST_KEY);
    if (interest) {
      setMessage(`מתעניין/ת בסגנון: ${interest}`);
      sessionStorage.removeItem(SHOWROOM_INTEREST_KEY);
    }

    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type && projectTypes.some((t) => t.value === type)) {
      setProjectType(type);
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!projectType) return;
    setSubmitted(true);
  }

  return (
    <section id="contact" data-funnel-step="action" className="relative py-section">
      <ChapterDivider beforeSectionId="contact" />
      <div
        className={cn(
          "mx-auto max-w-[1400px] px-6 transition-all duration-700 lg:px-10",
          formFocused && "focus-chapter-parent"
        )}
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealViewport}
            variants={fadeUpVariants}
            className={cn(
              "lg:col-span-5 transition-all duration-700",
              formFocused && "focus-chapter is-focused"
            )}
          >
            <p className="mb-4 text-sm tracking-[0.12em] text-brand-teal">ייעוץ והצעת מחיר</p>
            <h2 className="font-display text-display-4xl font-light text-text-main">
              קבעו ייעוץ אדריכלי — ללא התחייבות
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              מענה תוך 24 שעות · ליווי הנדסי מלא
            </p>
            <div className="rule-gold-solid mt-8 h-px w-16" />
            <ul className="mt-10 space-y-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-4 text-text-muted">
                  <span className="mt-2 h-px w-8 shrink-0 bg-brand-gold" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealViewport}
            variants={fadeUpVariants}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="border border-brand-teal/20 bg-bg-secondary p-12 text-center">
                <SuccessCheck />
                <p className="font-display text-display-xl text-brand-teal">תודה רבה</p>
                <p className="mt-4 text-text-muted">הפנייה התקבלה. ניצור קשר בהקדם.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                onFocus={() => setFormFocused(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setFormFocused(false);
                  }
                }}
                className={cn(
                  "space-y-8 border border-hairline bg-bg-elevated p-8 transition-all duration-700 md:p-12",
                  formFocused && "form-elevated"
                )}
              >
                <UnderlineInput label="שם מלא" name="name" required autoComplete="name" />
                <UnderlineInput
                  label="טלפון"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                />
                <UnderlineInput
                  label="אימייל"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />

                <div className="border-b border-hairline pb-1 transition-colors duration-500 focus-within:border-brand-gold">
                  <label
                    htmlFor="project-type"
                    className="mb-2 block text-xs tracking-[0.1em] text-text-muted"
                  >
                    סוג הפרויקט
                  </label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger
                      id="project-type"
                      aria-label="בחרו את סוג הפרויקט שלכם"
                      className="min-h-[48px] border-0 border-none bg-transparent px-0 shadow-none focus:ring-0"
                    >
                      <SelectValue placeholder="בחרו את סוג הפרויקט שלכם" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <UnderlineInput
                  label="הודעה (אופציונלי)"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto">
                  שליחת פנייה
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
