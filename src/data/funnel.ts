import { buildWhatsAppUrl } from "@/data/site";

export type FunnelSectionId =
  | "hero"
  | "pillars"
  | "showroom"
  | "atelier"
  | "contact";

export type FunnelSection = {
  id: FunnelSectionId;
  label: string;
  number: string;
  showInNav?: boolean;
};

export const funnelSections: FunnelSection[] = [
  { id: "hero", label: "בית", number: "00", showInNav: false },
  { id: "pillars", label: "למה אנחנו", number: "01", showInNav: true },
  { id: "showroom", label: "תיק עבודות", number: "02", showInNav: true },
  { id: "atelier", label: "אמנות החומר", number: "03", showInNav: true },
  { id: "contact", label: "צור קשר", number: "04", showInNav: true },
];

export const navSections = funnelSections.filter((s) => s.showInNav);

export type FunnelCtaKey = "pillars" | "showroom" | "atelier";

export const funnelCtas: Record<
  FunnelCtaKey,
  {
    headline: string;
    subline?: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    variant: "soft" | "emphasis";
  }
> = {
  pillars: {
    headline: "רוצים לראות את הדיוק הזה בפרויקט שלכם?",
    subline: "ייעוץ אדריכלי ראשוני — ללא עלות וללא התחייבות",
    primaryLabel: "לתיק העבודות",
    primaryHref: "#showroom",
    secondaryLabel: "שאלה מהירה בוואטסאפ",
    secondaryHref: buildWhatsAppUrl("שלום, יש לי שאלה על פרויקט זכוכית"),
    variant: "soft",
  },
  showroom: {
    headline: "מצאתם סגנון שמתאים לפרויקט?",
    subline: "כל פרויקט בתיק נוצר מדידה — נשמח לתכנן עבורכם ממש כך",
    primaryLabel: "קבעו פגישת ייעוץ ללא עלות",
    primaryHref: "#contact",
    secondaryLabel: "וואטסאפ ישיר",
    secondaryHref: buildWhatsAppUrl("שלום, אשמח לפרטים על פרויקט זכוכית"),
    variant: "emphasis",
  },
  atelier: {
    headline: "רוצים את אותה רמת גימור בפרויקט שלכם?",
    subline: "מהשרטוט הראשון ועד הניקוי הסופי — אנחנו לצדכם",
    primaryLabel: "קבעו שיחת היכרות",
    primaryHref: "#contact",
    secondaryLabel: "וואטסאפ ישיר",
    secondaryHref: buildWhatsAppUrl("שלום, אשמח לפרטים על פרויקט זכוכית"),
    variant: "emphasis",
  },
};

export const WHATSAPP_URL = buildWhatsAppUrl(
  "שלום, אשמח לפרטים על פרויקט זכוכית"
);

export const audienceTags = [
  { label: "מקלחונים ייחודיים", href: "#showroom", tab: "showers" },
  { label: "מראות LED מוארות", href: "#showroom", tab: "mirrors" },
  { label: "מחיצות משרד", href: "#showroom", tab: "offices" },
  { label: "מעקים", href: "#showroom", tab: "railings" },
] as const;

export const processSteps = [
  { step: "01", label: "ייעוץ אדריכלי ומידות" },
  { step: "02", label: "שרטוט ואישור לקוח" },
  { step: "03", label: "ייצור CNC מדויק" },
  { step: "04", label: "התקנה ובדיקה סופית" },
];

/** Lead capture — private consultation request */
export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ?? "";

export const consultationIntro = {
  number: "",
  label: "",
  title: "נתחיל בשיחה — נסיים בפרויקט שלם",
  description:
    "ספרו לנו על החלל. נחזור אליכם עם ייעוץ חומר, לוח זמנים ריאלי והצעת מחיר מפורטת — ללא התחייבות וללא עלות.",
} as const;

export const projectScopes = [
  { value: "office-cladding", label: "חיפויי זכוכית למשרדים" },
  { value: "custom-showers", label: "מקלחונים בעיצוב אישי" },
  { value: "premium-mirrors", label: "מראות פרימיום מוארות" },
  { value: "complex-architectural", label: "פרויקט אדריכלי מורכב" },
] as const;

export type ProjectScopeValue = (typeof projectScopes)[number]["value"];

export const consultationProcessSteps = [
  { step: "01", label: "אפיון וייעוץ" },
  { step: "02", label: "מדידת לייזר מדויקת בשטח" },
  { step: "03", label: "ייצור CNC והקשחה" },
  { step: "04", label: "התקנה נקייה ואחריות" },
] as const;

export type LeadPayload = {
  name: string;
  phone: string;
  projectScope: ProjectScopeValue;
  projectScopeLabel: string;
  message?: string;
  showroomInterest?: string;
  submittedAt: string;
  source: "website";
};

export function buildLeadPayload(data: {
  name: string;
  phone: string;
  projectScope: ProjectScopeValue;
  message?: string;
  showroomInterest?: string;
}): LeadPayload {
  const scope = projectScopes.find((s) => s.value === data.projectScope);
  return {
    name: data.name.trim(),
    phone: data.phone.trim(),
    projectScope: data.projectScope,
    projectScopeLabel: scope?.label ?? data.projectScope,
    message: data.message?.trim() || undefined,
    showroomInterest: data.showroomInterest?.trim() || undefined,
    submittedAt: new Date().toISOString(),
    source: "website",
  };
}

export async function submitLeadToWebhook(payload: LeadPayload): Promise<void> {
  if (!WEBHOOK_URL) {
    if (process.env.NODE_ENV === "development") {
      console.info("[LeadCapture] WEBHOOK_URL not set — payload:", payload);
    }
    return;
  }

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Webhook failed: ${res.status}`);
  }
}
