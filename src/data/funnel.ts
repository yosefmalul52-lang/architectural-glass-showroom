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

