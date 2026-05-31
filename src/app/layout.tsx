import type { Metadata } from "next";
import { Rubik, Assistant, Cormorant_Garamond, Mea_Culpa } from "next/font/google";
import { ClientShell } from "@/components/layout/ClientShell";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "צמרת הזכוכית — תכנון, הנדסה וביצוע",
  description:
    "צמרת הזכוכית — תכנון וביצוע פרויקטי זכוכית אדריכלית בתקן EN12150. ייצור CNC, Triplex מחוסמת, מדידת לייזר ממוחשבת. מקלחונים, מחיצות משרד, מראות מותאמות.",
  keywords: [
    "צמרת הזכוכית",
    "מקלחונים",
    "מחיצות זכוכית",
    "זכוכית בטיחותית",
    "EN12150",
    "Triplex",
    "CNC",
    "קיסריה",
  ],
  openGraph: {
    title: "צמרת הזכוכית — תכנון, הנדסה וביצוע",
    description:
      "פרויקטי זכוכית אדריכלית בתקן EN12150 — ייצור CNC, Triplex מחוסמת, מדידת לייזר ממוחשבת. ייעוץ ראשוני ללא עלות.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${rubik.variable} ${cormorantGaramond.variable} ${assistant.variable} ${meaCulpa.variable} overflow-x-hidden antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:end-4 focus:z-[120] focus:border focus:border-brand-gold/40 focus:bg-bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-text-main"
        >
          דלג לתוכן הראשי
        </a>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
