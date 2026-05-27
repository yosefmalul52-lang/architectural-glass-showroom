"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnderlineInput } from "@/components/ui/underline-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { SuccessCheck } from "@/components/experience/SuccessCheck";
import {
  buildLeadPayload,
  consultationIntro,
  projectScopes,
  submitLeadToWebhook,
  type ProjectScopeValue,
} from "@/data/funnel";
import { CONTACT, WHATSAPP_DEFAULT_URL } from "@/data/site";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SHOWROOM_INTEREST_KEY = "showroom-interest";

const trustSignals: { text: string }[] = [
  { text: "מענה תוך 24 שעות לתיאום פגישה" },
  { text: "ייעוץ תכנוני ראשוני ללא עלות" },
  { text: "תקן EN12150 · מדידת לייזר בשטח" },
];

const benefits = [
  "אפיון חומר ופרופיל מותאם לאדריכלות החלל",
  "הצעה מפורטת עם לוח זמנים ואפשרויות גימור",
  "ליווי הנדסי מלא — משרטוט CNC ועד התקנה נקייה",
];

function ContactStrip() {
  return (
    <div className="mb-10 flex flex-col gap-4">
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className="flex items-center gap-4 group"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent-teal/30 text-accent-teal transition-colors group-hover:border-accent-teal group-hover:bg-accent-teal/5">
          <Phone size={16} strokeWidth={1.5} />
        </span>
        <span className="font-display text-base tracking-wide text-text-main group-hover:text-accent-teal transition-colors">
          {CONTACT.phone}
        </span>
      </a>

      <a
        href={`mailto:${CONTACT.email}`}
        className="flex items-center gap-4 group"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent-teal/30 text-accent-teal transition-colors group-hover:border-accent-teal group-hover:bg-accent-teal/5">
          <Mail size={16} strokeWidth={1.5} />
        </span>
        <span className="font-display text-base tracking-wide text-text-main group-hover:text-accent-teal transition-colors">
          {CONTACT.email}
        </span>
      </a>

      <a
        href={WHATSAPP_DEFAULT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 group"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent-teal/30 text-accent-teal transition-colors group-hover:border-accent-teal group-hover:bg-accent-teal/5">
          <MessageCircle size={16} strokeWidth={1.5} />
        </span>
        <span className="font-display text-base tracking-wide text-text-main group-hover:text-accent-teal transition-colors">
          וואטסאפ ישיר
        </span>
      </a>
    </div>
  );
}

export function LeadCapture() {
  const [projectScope, setProjectScope] = useState<ProjectScopeValue | "">("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formFocused, setFormFocused] = useState(false);

  useEffect(() => {
    const interest = sessionStorage.getItem(SHOWROOM_INTEREST_KEY);
    if (interest) {
      setMessage(`מתעניין/ת בסגנון: ${interest}`);
      sessionStorage.removeItem(SHOWROOM_INTEREST_KEY);
    }

    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const scopeMap: Record<string, ProjectScopeValue> = {
      showers: "custom-showers",
      mirrors: "premium-mirrors",
      offices: "office-cladding",
    };
    if (type && scopeMap[type]) {
      setProjectScope(scopeMap[type]);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setNameError(null);
    setPhoneError(null);

    if (!projectScope) {
      setSubmitError("נא לבחור את סוג הפרויקט");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    let hasError = false;
    if (!name) {
      setNameError("נא להזין שם מלא");
      hasError = true;
    }
    if (!phone) {
      setPhoneError("נא להזין מספר טלפון");
      hasError = true;
    }
    if (hasError) return;

    const payload = buildLeadPayload({
      name,
      phone,
      projectScope,
      message: message || undefined,
      showroomInterest: message.includes("מתעניין/ת בסגנון:")
        ? message.replace("מתעניין/ת בסגנון: ", "")
        : undefined,
    });

    setIsSubmitting(true);

    try {
      await submitLeadToWebhook(payload);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "לא הצלחנו לשלוח את הבקשה. נסו שוב או פנו אלינו ישירות בוואטסאפ."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" data-funnel-step="action" className="relative py-section" style={{ background: "#F3EBE1" }}>
      <div
        className={cn(
          "mx-auto max-w-[1400px] px-6 transition-all duration-700 lg:px-10",
          formFocused && "focus-chapter-parent"
        )}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealViewport}
          variants={fadeUpVariants}
          className="mb-10 flex flex-col items-center text-center lg:mb-14"
        >
          <SectionIntro
            number={consultationIntro.number}
            label={consultationIntro.label}
            title={consultationIntro.title}
            description={consultationIntro.description}
            align="center"
            className="mb-0"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealViewport}
            variants={fadeUpVariants}
            className={cn(
              "flex flex-col justify-between lg:col-span-5 transition-all duration-700",
              formFocused && "focus-chapter is-focused"
            )}
          >
            <div className="flex flex-col gap-8">
              <ContactStrip />

              <ul className="flex flex-col gap-3">
                {trustSignals.map(({ text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <svg viewBox="0 0 16 16" width={16} height={16} fill="none" className="shrink-0 text-accent-teal" aria-hidden>
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm text-text-muted">{text}</span>
                  </li>
                ))}
              </ul>

              <div className="h-px w-full bg-hairline" />

              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4 text-sm text-text-muted">
                    <span className="mt-2 h-px w-6 shrink-0 bg-brand-gold" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealViewport}
            variants={fadeUpVariants}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="card-surface border-brand-gold/30 p-10 text-center md:p-14" role="status" aria-live="polite">
                <SuccessCheck />
                <p className="font-display text-display-2xl font-light tracking-tight text-text-main">
                  הבקשה התקבלה
                </p>
                <HeadingAccent align="center" size="sm" className="mx-auto" />
                <p className="type-lead mx-auto mt-4 max-w-md text-text-muted">
                  פנייתכם לייעוץ תכנוני נקלטה במערכת. ניצור קשר תוך 24 שעות לתיאום
                  פגישת אפיון ומדידה בשטח — ללא התחייבות.
                </p>
                <p className="mt-6 text-xs tracking-wide text-text-muted/70">
                  דחוף?{" "}
                  <a
                    href={WHATSAPP_DEFAULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold underline-offset-2 hover:underline"
                  >
                    וואטסאפ ישיר
                  </a>
                </p>
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
                  "card-surface space-y-8 p-8 transition-all duration-700 md:p-12",
                  formFocused && "form-elevated"
                )}
              >
                <p className="font-display text-sm tracking-wide text-text-muted">
                  פרטי קשר לתיאום ייעוץ אישי
                </p>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <UnderlineInput
                      label="שם מלא"
                      name="name"
                      required
                      autoComplete="name"
                      aria-invalid={Boolean(nameError)}
                      aria-describedby={nameError ? "lead-name-error" : undefined}
                    />
                    {nameError && (
                      <p id="lead-name-error" className="mt-2 text-xs text-red-700/90" role="alert">
                        {nameError}
                      </p>
                    )}
                  </div>
                  <div>
                    <UnderlineInput
                      label="טלפון"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      aria-invalid={Boolean(phoneError)}
                      aria-describedby={phoneError ? "lead-phone-error" : undefined}
                    />
                    {phoneError && (
                      <p id="lead-phone-error" className="mt-2 text-xs text-red-700/90" role="alert">
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-b border-hairline pb-1 transition-colors duration-500 focus-within:border-brand-gold">
                  <label
                    htmlFor="project-scope"
                    className="mb-2 block text-xs tracking-[0.1em] text-text-muted"
                  >
                    סוג הפרויקט
                  </label>
                  <Select
                    value={projectScope}
                    onValueChange={(v) => setProjectScope(v as ProjectScopeValue)}
                    required
                    aria-required
                  >
                    <SelectTrigger
                      id="project-scope"
                      aria-label="בחרו את היקף הפרויקט"
                      className="min-h-[48px] border-0 border-none bg-transparent px-0 shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                    >
                      <SelectValue placeholder="בחרו את היקף הפרויקט" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectScopes.map((scope) => (
                        <SelectItem key={scope.value} value={scope.value}>
                          {scope.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <UnderlineInput
                  label="הערות לייעוץ (אופציונלי)"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                {submitError && (
                  <p className="text-sm text-red-700/90" role="alert">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        שולח בקשה...
                      </>
                    ) : (
                      <>
                        לתיאום ייעוץ אישי
                        <ArrowLeft className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-text-muted">
                    ללא ספאם · פרטים שמורים בדיסקרטיות מלאה
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
