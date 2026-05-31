"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
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
import { WHATSAPP_DEFAULT_URL } from "@/data/site";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SHOWROOM_INTEREST_KEY = "showroom-interest";

type LeadFormBodyProps = {
  submitted: boolean;
  formFocused: boolean;
  setFormFocused: (focused: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  nameError: string | null;
  setNameError: (v: string | null) => void;
  phoneError: string | null;
  setPhoneError: (v: string | null) => void;
  projectScope: ProjectScopeValue | "";
  setProjectScope: (v: ProjectScopeValue) => void;
  projectScopeError: string | null;
  setProjectScopeError: (v: string | null) => void;
  message: string;
  setMessage: (v: string) => void;
  submitError: string | null;
  agreed: boolean;
  setAgreed: (v: boolean) => void;
  agreedError: string | null;
  setAgreedError: (v: string | null) => void;
  isSubmitting: boolean;
};

function LeadFormBody({
  submitted,
  formFocused,
  setFormFocused,
  handleSubmit,
  nameError,
  setNameError,
  phoneError,
  setPhoneError,
  projectScope,
  setProjectScope,
  projectScopeError,
  setProjectScopeError,
  message,
  setMessage,
  submitError,
  agreed,
  setAgreed,
  agreedError,
  setAgreedError,
  isSubmitting,
}: LeadFormBodyProps) {
  const formContent = (
    <>
      {submitted ? (
        <div className="lead-form-panel p-10 text-center md:p-14" role="status" aria-live="polite">
          <SuccessCheck />
          <p className="font-display text-display-2xl font-light tracking-tight text-text-main">
            הבקשה התקבלה
          </p>
          <HeadingAccent align="center" size="sm" className="mx-auto" />
          <p className="type-lead mx-auto mt-4 max-w-md text-text-muted">
            פנייתכם לייעוץ תכנוני נקלטה במערכת. ניצור קשר תוך 24 שעות לתיאום פגישת אפיון
            ומדידה בשטח — ללא התחייבות.
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
                onChange={() => nameError && setNameError(null)}
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
                onChange={() => phoneError && setPhoneError(null)}
              />
              {phoneError && (
                <p id="lead-phone-error" className="mt-2 text-xs text-red-700/90" role="alert">
                  {phoneError}
                </p>
              )}
            </div>
          </div>

          <div
            className={cn(
              "border-b border-brand-gold/70 pb-1 transition-colors duration-500 focus-within:border-brand-gold",
              projectScopeError && "border-red-700/70"
            )}
          >
            <label
              htmlFor="project-scope"
              className="mb-2 block text-xs tracking-[0.1em] text-text-muted"
            >
              סוג הפרויקט
              <span className="ms-1 text-red-600" aria-hidden>
                *
              </span>
            </label>
            <Select
              value={projectScope}
              onValueChange={(v) => {
                setProjectScope(v as ProjectScopeValue);
                if (projectScopeError) setProjectScopeError(null);
              }}
              required
              aria-required
            >
              <SelectTrigger
                id="project-scope"
                aria-label="בחרו את היקף הפרויקט"
                aria-invalid={Boolean(projectScopeError)}
                aria-describedby={projectScopeError ? "lead-scope-error" : undefined}
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
            {projectScopeError && (
              <p id="lead-scope-error" className="mt-2 text-xs text-red-700/90" role="alert">
                {projectScopeError}
              </p>
            )}
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

          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-sm pt-1 transition-colors",
              agreedError && "ring-1 ring-red-700/50 ring-offset-2 ring-offset-bg-elevated"
            )}
          >
            <div className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (agreedError) setAgreedError(null);
                }}
                className="peer sr-only"
                aria-invalid={Boolean(agreedError)}
                aria-describedby={agreedError ? "lead-agreed-error" : undefined}
              />
              <div
                className={cn(
                  "h-4 w-4 border transition-colors peer-checked:border-accent-teal peer-checked:bg-accent-teal",
                  agreedError ? "border-red-700/70" : "border-accent-teal/40"
                )}
              />
              {agreed && (
                <svg
                  className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 text-white"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1.5 5l2.5 2.5 4.5-4.5"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-right text-[13px] leading-relaxed text-text-muted sm:text-sm">
              <span className="text-red-600" aria-hidden>
                *{" "}
              </span>
              קראתי ואני מסכים/ה לקבל יצירת קשר חוזרת בנוגע לפרויקט שלי
            </span>
          </label>
          {agreedError && (
            <p id="lead-agreed-error" className="-mt-4 text-xs text-red-700/90" role="alert">
              {agreedError}
            </p>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              type="submit"
              variant="teal"
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
          </div>
        </form>
      )}
    </>
  );

  return <div className="w-full overflow-hidden">{formContent}</div>;
}

function ContactSideImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative hidden h-full min-h-0 overflow-hidden bg-text-main lg:block">
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        sizes="360px"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
  const [projectScopeError, setProjectScopeError] = useState<string | null>(null);
  const [formFocused, setFormFocused] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState<string | null>(null);

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
    setProjectScopeError(null);
    setAgreedError(null);

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
    if (!projectScope) {
      setProjectScopeError("נא לבחור את סוג הפרויקט");
      hasError = true;
    }
    if (!agreed) {
      setAgreedError("נא לאשר את ההסכמה ליצירת קשר");
      hasError = true;
    }
    if (hasError) return;

    const scope = projectScope;
    if (!scope) return;

    const payload = buildLeadPayload({
      name,
      phone,
      projectScope: scope,
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

  const formBodyProps: LeadFormBodyProps = {
    submitted,
    formFocused,
    setFormFocused,
    handleSubmit,
    nameError,
    setNameError,
    phoneError,
    setPhoneError,
    projectScope,
    setProjectScope,
    projectScopeError,
    setProjectScopeError,
    message,
    setMessage,
    submitError,
    agreed,
    setAgreed,
    agreedError,
    setAgreedError,
    isSubmitting,
  };

  return (
    <section
      id="contact"
      data-funnel-step="action"
      className="relative border-t border-black bg-white py-section"
    >
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
              accentColor="var(--brand-gold)"
            descriptionClassName="!text-brand-gold"
          />
        </motion.div>

        <div className="mx-auto w-full max-w-full overflow-hidden max-lg:border-0 lg:grid lg:w-fit lg:grid-cols-[360px_560px_360px] lg:items-stretch lg:border lg:border-brand-gold/50 lg:shadow-sm">
          <ContactSideImage
            src="/portfolio/contact-panel-2.png"
            alt="עבודות זכוכית אדריכליות — צמרת הזכוכית"
          />

          <div className="min-w-0 shrink-0 overflow-hidden p-6 sm:p-10 lg:w-[560px] lg:p-14">
            <LeadFormBody {...formBodyProps} />
          </div>

          <ContactSideImage
            src="/portfolio/contact-panel.png"
            alt="עבודות זכוכית אדריכליות — צמרת הזכוכית"
          />
        </div>
      </div>
    </section>
  );
}
