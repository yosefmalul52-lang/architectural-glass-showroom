"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { UnderlineInput } from "@/components/ui/underline-input";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { SuccessCheck } from "@/components/experience/SuccessCheck";
import { consultationIntro } from "@/data/funnel";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/contact-form-schema";
import { WHATSAPP_DEFAULT_URL } from "@/data/site";
import { onWhatsAppClick, trackMetaLeadSuccess } from "@/lib/meta-pixel";
import { fadeUpVariants, scrollRevealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SHOWROOM_INTEREST_KEY = "showroom-interest";

type LeadFormBodyProps = {
  submitted: boolean;
  formFocused: boolean;
  setFormFocused: (focused: boolean) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: ReturnType<typeof useForm<ContactFormData>>["register"];
  errors: ReturnType<typeof useForm<ContactFormData>>["formState"]["errors"];
  submitError: string | null;
  isSubmitting: boolean;
};

function LeadFormBody({
  submitted,
  formFocused,
  setFormFocused,
  onSubmit,
  register,
  errors,
  submitError,
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
              onClick={() => onWhatsAppClick("contact_form_success")}
              className="text-brand-gold underline-offset-2 hover:underline"
            >
              וואטסאפ ישיר
            </a>
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit(e);
          }}
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
          <div className="space-y-5 md:space-y-6">
            <div>
              <UnderlineInput
                label="שם"
                {...register("fullName")}
                required
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "lead-name-error" : undefined}
              />
              {errors.fullName?.message && (
                <p id="lead-name-error" className="mt-2 text-xs text-red-700/90" role="alert">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <UnderlineInput
                label="טלפון"
                {...register("phone")}
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "lead-phone-error" : undefined}
              />
              {errors.phone?.message && (
                <p id="lead-phone-error" className="mt-2 text-xs text-red-700/90" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <UnderlineInput
                label="הערות"
                {...register("notes")}
                aria-invalid={Boolean(errors.notes)}
                aria-describedby={errors.notes ? "lead-notes-error" : undefined}
              />
              {errors.notes?.message && (
                <p id="lead-notes-error" className="mt-2 text-xs text-red-700/90" role="alert">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </div>

          {submitError && (
            <p className="text-sm text-red-700/90" role="alert">
              {submitError}
            </p>
          )}

          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-sm pt-1 transition-colors",
              errors.consent && "ring-1 ring-red-700/50 ring-offset-2 ring-offset-bg-elevated"
            )}
          >
            <div className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                {...register("consent")}
                className="peer sr-only"
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "lead-agreed-error" : undefined}
              />
              <div
                className={cn(
                  "h-4 w-4 border transition-colors peer-checked:border-accent-teal peer-checked:bg-accent-teal",
                  errors.consent ? "border-red-700/70" : "border-accent-teal/40"
                )}
              />
              <svg
                className="pointer-events-none absolute inset-0 m-auto h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100"
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
            </div>
            <span className="text-right text-[13px] leading-relaxed text-text-muted sm:text-sm">
              <span className="text-red-600" aria-hidden>
                *{" "}
              </span>
              קראתי ואני מסכים/ה לקבל יצירת קשר חוזרת בנוגע לפרויקט שלי
            </span>
          </label>
          {errors.consent?.message && (
            <p id="lead-agreed-error" className="-mt-4 text-xs text-red-700/90" role="alert">
              {errors.consent.message}
            </p>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="teal"
              size="lg"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
              onClick={() => void onSubmit()}
            >
              {isSubmitting ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4" />
                  <path d="M22 12a10 10 0 0 1-10 10" strokeWidth="4" />
                </svg>
              ) : (
                <>
                  לתיאום ייעוץ אישי
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
              {isSubmitting && " שולח בקשה..."}
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
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formFocused, setFormFocused] = useState(false);
  const [showroomInterest, setShowroomInterest] = useState<string | undefined>(undefined);
  const leadTrackedRef = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      notes: "",
      consent: false,
      showroomInterest: "",
    },
  });

  useEffect(() => {
    const interest = sessionStorage.getItem(SHOWROOM_INTEREST_KEY);
    if (interest) {
      setShowroomInterest(interest);
      setValue("showroomInterest", interest);
      sessionStorage.removeItem(SHOWROOM_INTEREST_KEY);
    }
  }, [setValue]);

  useEffect(() => {
    if (!submitted || leadTrackedRef.current) return;
    leadTrackedRef.current = true;
    trackMetaLeadSuccess();
  }, [submitted]);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          showroomInterest: data.showroomInterest || showroomInterest,
        }),
      });

      if (!response.ok) {
        let message = "שגיאת שרת פנימית";
        try {
          const rawText = await response.text();
          if (rawText) {
            try {
              const parsed = JSON.parse(rawText) as { error?: string };
              message = parsed.error || message;
            } catch {
              message = rawText || message;
            }
          }
        } catch {
          message = "שגיאת שרת פנימית";
        }
        throw new Error(message);
      }

      const result = (await response.json()) as { ok?: boolean };
      if (!result.ok) {
        throw new Error("לא הצלחנו לשלוח את הבקשה. נסו שוב או פנו אלינו ישירות בוואטסאפ.");
      }

      setSubmitted(true);
      reset({
        fullName: "",
        phone: "",
        notes: "",
        consent: false,
        showroomInterest: showroomInterest ?? "",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "לא הצלחנו לשלוח את הבקשה. נסו שוב או פנו אלינו ישירות בוואטסאפ."
      );
    }
  });

  const formBodyProps: LeadFormBodyProps = {
    submitted,
    formFocused,
    setFormFocused,
    onSubmit,
    register,
    errors,
    submitError,
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
