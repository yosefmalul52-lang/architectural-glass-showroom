export const BRAND = {
  name: "צמרת הזכוכית",
  nameEn: "Tzameret Glass",
  tagline: "צמרת הזכוכית — תכנון, הנדסה וביצוע",
  footerBlurb:
    "תכנון, ייצור והתקנה של עבודות זכוכית אדריכלית — מקלחונים, מחיצות, מעקים, מראות ועוד.",
  founded: "2010",
} as const;

export const CONTACT = {
  phone: "050-470-1265",
  phoneTel: "+972504701265",
  email: "tzamerethazchuchit@gmail.com",
  whatsapp: "972504701265",
  address: "פארק תעשיות, קיסריה",
  hours: "ראשון–חמישי: 08:00–17:00",
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT_URL = buildWhatsAppUrl(
  "שלום, אשמח לפרטים על פרויקט זכוכית"
);
