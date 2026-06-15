export const GA_MEASUREMENT_ID = "G-S1RX9TZCP2";

export const GA_EVENTS = {
  FORM_SUBMIT: "generate_lead",
  WHATSAPP_CONTACT: "whatsapp_contact",
  PHONE_CONTACT: "phone_contact",
} as const;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGaEvent(
  eventName: string,
  params?: Record<string, string>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackFormSubmit() {
  trackGaEvent(GA_EVENTS.FORM_SUBMIT, {
    form_name: "contact_form",
    method: "website",
  });
}

export function trackWhatsAppClick(source: string) {
  trackGaEvent(GA_EVENTS.WHATSAPP_CONTACT, { source });
}

export function trackPhoneClick(source: string) {
  trackGaEvent(GA_EVENTS.PHONE_CONTACT, { source });
}
