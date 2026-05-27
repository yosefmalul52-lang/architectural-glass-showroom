export const BRAND = {
  name: "זכוכית הפסגה",
  nameEn: "Pisga Glass",
  tagline: "זכוכית אדריכלית — תכנון, הנדסה וביצוע",
  founded: "2010",
} as const;

export const CONTACT = {
  phone: "073-345-6789",
  phoneTel: "+972733456789",
  email: "office@pisga-glass.co.il",
  whatsapp: "972733456789",
  address: "פארק תעשיות, קיסריה",
  hours: "ראשון–חמישי: 08:00–17:00",
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT_URL = buildWhatsAppUrl(
  "שלום, אשמח לפרטים על פרויקט זכוכית"
);
