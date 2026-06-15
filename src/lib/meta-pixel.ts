import {
  trackFormSubmit as trackGaFormSubmit,
  trackPhoneClick as trackGaPhoneClick,
  trackWhatsAppClick as trackGaWhatsAppClick,
} from "@/lib/analytics";

export const META_PIXEL_ID = "887556210310562";

export const META_EVENTS = {
  FORM_SUBMIT: "LeadFormSubmit",
  WHATSAPP_CONTACT: "WhatsAppContact",
  PHONE_CONTACT: "PhoneContact",
} as const;

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
    __metaPixelLoaded?: boolean;
  }
}

type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: FbqFunction;
  loaded: boolean;
  version: string;
};

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", eventName, params);
}

export function trackMetaFormSubmit() {
  trackMetaEvent(META_EVENTS.FORM_SUBMIT, {
    content_name: "contact_form",
  });
  trackGaFormSubmit();
}

export function trackMetaWhatsAppContact(source: string) {
  trackMetaEvent(META_EVENTS.WHATSAPP_CONTACT, { source });
}

export function trackMetaPhoneContact(source: string) {
  trackMetaEvent(META_EVENTS.PHONE_CONTACT, { source });
}

export function isWhatsAppUrl(url: string) {
  return url.includes("wa.me") || url.includes("whatsapp.com");
}

export function onWhatsAppClick(source: string) {
  trackMetaWhatsAppContact(source);
  trackGaWhatsAppClick(source);
}

export function onPhoneClick(source: string) {
  trackMetaPhoneContact(source);
  trackGaPhoneClick(source);
}

export function loadMetaPixel() {
  if (typeof window === "undefined" || window.__metaPixelLoaded) return;

  window.__metaPixelLoaded = true;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  } as FbqFunction;

  if (!window._fbq) window._fbq = fbq;
  window.fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");

  const noscriptImg = document.createElement("img");
  noscriptImg.height = 1;
  noscriptImg.width = 1;
  noscriptImg.style.display = "none";
  noscriptImg.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
  noscriptImg.alt = "";
  document.body.appendChild(noscriptImg);
}
