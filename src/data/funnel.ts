export type FunnelSectionId =
  | "hero"
  | "pillars"
  | "showroom"
  | "atelier"
  | "trust"
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
  { id: "trust", label: "לקוחות", number: "04", showInNav: true },
  { id: "contact", label: "צור קשר", number: "05", showInNav: true },
];

export const navSections = funnelSections.filter((s) => s.showInNav);

export type FunnelCtaKey = "pillars" | "showroom" | "atelier" | "trust";

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
    headline: "רוצים לראות איך זה נראה בפרויקט אמיתי?",
    subline: "גלו את תיק העבודות שלנו — ספא, בתים פרטיים ומשרדים",
    primaryLabel: "לתיק העבודות",
    primaryHref: "#showroom",
    secondaryLabel: "תיאום ייעוץ",
    secondaryHref: "#contact",
    variant: "soft",
  },
  showroom: {
    headline: "מצאתם סגנון שמתאים לכם?",
    subline: "נשמח לתכנן יחד פרויקט בסגנון הזה — ללא התחייבות",
    primaryLabel: "תיאום פגישת ייעוץ",
    primaryHref: "#contact",
    secondaryLabel: "וואטסאפ ישיר",
    secondaryHref:
      "https://wa.me/972500000000?text=%D7%91%D7%A8%D7%95%D7%A5%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%96%D7%9B%D7%95%D7%9B%D7%99%D7%AA",
    variant: "emphasis",
  },
  atelier: {
    headline: "מעוניינים באותו רמת גימור?",
    subline: "בוטיק אומר דיוק בכל פרט — מהשרטוט ועד ההתקנה",
    primaryLabel: "תיאום פגישת ייעוץ",
    primaryHref: "#contact",
    secondaryLabel: "וואטסאפ ישיר",
    secondaryHref:
      "https://wa.me/972500000000?text=%D7%91%D7%A8%D7%95%D7%A5%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%96%D7%9B%D7%95%D7%9B%D7%99%D7%AA",
    variant: "soft",
  },
  trust: {
    headline: "הצטרפו ללקוחות שכבר בחרו בנו",
    subline: "ייעוץ אדריכלי ראשוני ללא התחייבות",
    primaryLabel: "תיאום פגישת ייעוץ",
    primaryHref: "#contact",
    secondaryLabel: "וואטסאפ ישיר",
    secondaryHref:
      "https://wa.me/972500000000?text=%D7%91%D7%A8%D7%95%D7%A5%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%96%D7%9B%D7%95%D7%9B%D7%99%D7%AA",
    variant: "emphasis",
  },
};

export const WHATSAPP_URL =
  "https://wa.me/972500000000?text=%D7%91%D7%A8%D7%95%D7%A5%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A4%D7%A8%D7%95%D7%99%D7%A7%D7%98%20%D7%96%D7%9B%D7%95%D7%9B%D7%99%D7%AA";

export const audienceTags = [
  { label: "מקלחונים", href: "#showroom", tab: "showers" },
  { label: "מראות", href: "#showroom", tab: "mirrors" },
  { label: "משרדים", href: "#showroom", tab: "offices" },
] as const;

export const processSteps = [
  { step: "01", label: "ייעוץ אדריכלי" },
  { step: "02", label: "שרטוט ותכנון" },
  { step: "03", label: "התקנה מדויקת" },
];
