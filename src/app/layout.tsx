import type { Metadata } from "next";
import localFont from "next/font/local";
import { Rubik, Assistant, Cormorant_Garamond, Mea_Culpa, Montserrat } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { EqualWebAccessibility } from "@/components/EqualWebAccessibility";
import { ClientShell } from "@/components/layout/ClientShell";
import "./globals.css";

const fupGalil = localFont({
  src: "../fonts/FUP-Galil-Medium.otf",
  variable: "--font-fup-galil",
  weight: "500",
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const meaCulpa = Mea_Culpa({
  variable: "--font-mea-culpa",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://tzameret-glass.com");

const canonicalUrl = new URL("/", siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "צמרת הזכוכית — עבודות זכוכית | תכנון, הנדסה וביצוע",
    template: "%s | צמרת הזכוכית",
  },
  description:
    "צמרת הזכוכית — מומחים לעבודות זכוכית אדריכלית ברמת פרימיום: מקלחונים, מחיצות, מעקים, מראות LED וחזיתות. תכנון הנדסי, ייצור CNC ומתקין מוסמך בתקן EN12150. ייעוץ ראשוני ללא עלות.",
  applicationName: "צמרת הזכוכית",
  keywords: [
    "צמרת הזכוכית",
    "עבודות זכוכית",
    "זכוכית אדריכלית",
    "מקלחונים",
    "מחיצות זכוכית",
    "מעקי זכוכית",
    "מראות LED",
    "זכוכית בטיחותית",
    "EN12150",
    "קיסריה",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: canonicalUrl,
    languages: {
      "he-IL": canonicalUrl,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    title: "צמרת הזכוכית — עבודות זכוכית | תכנון, הנדסה וביצוע",
    description:
      "עבודות זכוכית אדריכלית ברמת פרימיום — מקלחונים, מחיצות, מעקים ומראות. תכנון הנדסי, ייצור CNC ומתקין מוסמך.",
    url: canonicalUrl,
    siteName: "צמרת הזכוכית",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "צמרת הזכוכית — עבודות זכוכית אדריכלית",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "צמרת הזכוכית — עבודות זכוכית",
    description:
      "תכנון, ייצור והתקנת עבודות זכוכית אדריכלית בתקן EN12150 — מקלחונים, מחיצות, מעקים ומראות.",
    images: ["/og-image.png"],
  },
  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="overflow-x-clip intro-loading">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('intro-loading');",
          }}
        />
      </head>
      <body
        className={`${rubik.variable} ${cormorantGaramond.variable} ${assistant.variable} ${meaCulpa.variable} ${fupGalil.variable} ${montserrat.variable} overflow-x-clip antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:end-4 focus:z-[120] focus:border focus:border-brand-gold/40 focus:bg-bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-text-main"
        >
          דלג לתוכן הראשי
        </a>
        <ClientShell>{children}</ClientShell>
        <CookieConsent />
        <EqualWebAccessibility />
      </body>
    </html>
  );
}
