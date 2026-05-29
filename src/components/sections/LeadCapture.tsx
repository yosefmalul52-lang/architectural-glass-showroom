"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

function ContactStrip() {
  return (
    <div className="mb-10 flex flex-col gap-4">
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className="flex items-center gap-3 group"
      >
        <Phone className="shrink-0 text-brand-gold" size={18} strokeWidth={1.5} />
        <span className="font-display text-base tracking-wide text-text-main transition-colors group-hover:text-text-main/70">
          {CONTACT.phone}
        </span>
      </a>

      <a
        href={`mailto:${CONTACT.email}`}
        className="flex items-center gap-3 group"
      >
        <Mail className="shrink-0 text-brand-gold" size={18} strokeWidth={1.5} />
        <span className="font-display text-base tracking-wide text-text-main transition-colors group-hover:text-text-main/70">
          {CONTACT.email}
        </span>
      </a>

      <a
        href={WHATSAPP_DEFAULT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        <MessageCircle className="shrink-0 text-brand-gold" size={18} strokeWidth={1.5} />
        <span className="font-display text-base tracking-wide text-text-main transition-colors group-hover:text-text-main/70">
          וואטסאפ ישיר
        </span>
      </a>
    </div>
  );
}

export function LeadCapture() {
  const [projectScope, setProjectScope] = useState<ProjectScopeValue | "">("");
  const [message, setMessage] = useState("");
  const [showroomInterest, setShowroomInterest] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formFocused, setFormFocused] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const interest = sessionStorage.getItem(SHOWROOM_INTEREST_KEY);
    if (interest) {
      setShowroomInterest(interest);
      sessionStorage.removeItem(SHOWROOM_INTEREST_KEY);
    }

    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const scopeMap: Record<string, ProjectScopeValue> = {
      showers: "custom-showers",
      mirrors: "premium-mirrors",
      offices: "office-cladding",
      railings: "complex-architectural",
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
      showroomInterest,
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
    <section id="contact" data-funnel-step="action" className="relative border-t border-black bg-white py-section">
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
            accentColor="#C8B49B"
            descriptionClassName="!text-brand-gold"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-stretch border border-stone-200 overflow-hidden shadow-sm">
          {/* Form + contact side */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-14 p-6 sm:p-10 lg:p-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealViewport}
            variants={fadeUpVariants}
            className={cn(
              "order-2 flex flex-col justify-between lg:order-1 lg:col-span-5 transition-all duration-700",
              formFocused && "focus-chapter is-focused"
            )}
          >
            <div className="flex flex-col gap-6 lg:gap-8">
              <ContactStrip />

              <div className="h-px w-full bg-hairline" />

              <ul className="flex flex-col gap-3">
                {trustSignals.map(({ text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <svg viewBox="0 0 16 16" width={16} height={16} fill="none" className="shrink-0 text-brand-gold" aria-hidden>
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-base text-text-main">{text}</span>
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
            className="order-1 lg:order-2 lg:col-span-7"
          >
            {submitted ? (
              <div className="lead-form-panel p-10 text-center md:p-14" role="status" aria-live="polite">
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
                  "lead-form-panel space-y-6 p-5 sm:p-7 md:space-y-8 md:p-12",
                  formFocused && "form-elevated"
                )}
              >
                <div className="grid gap-5 sm:grid-cols-2 md:gap-8">
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
                      className="min-h-[48px] border-0 border-none bg-transparent px-0 text-right shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold [&>span]:flex [&>span]:w-full [&>span]:justify-end"
                    >
                      <SelectValue placeholder="בחרו את היקף הפרויקט" />
                    </SelectTrigger>
                    <SelectContent className="text-right" dir="rtl">
                      {projectScopes.map((scope) => (
                        <SelectItem key={scope.value} value={scope.value} className="justify-end">
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

                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="h-4 w-4 border border-accent-teal/40 transition-colors peer-checked:border-accent-teal peer-checked:bg-accent-teal" />
                    {agreed && (
                      <svg
                        className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 text-white"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-right text-[13px] leading-relaxed text-text-muted sm:text-sm">
                    קראתי ואני מסכים/ה לקבל יצירת קשר חוזרת בנוגע לפרויקט שלי
                  </span>
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting || !agreed}
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
                </div>
              </form>
            )}
          </motion.div>
          </div>{/* end inner grid */}

          {/* Image panel — desktop only */}
          <div className="relative hidden lg:block min-h-[600px] bg-stone-900">
            <Image
              src="/portfolio/spa-backlit-mirror-fluted.png"
              alt="עבודות זכוכית אדריכליות — צמרת הזכוכית"
              fill
              sizes="420px"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-8 inset-x-0 px-8 text-right">
              <p className="font-[family-name:var(--font-cormorant)] text-sm italic tracking-[0.18em] text-white/70 uppercase">
                כל פרויקט — גימור ייחודי
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
