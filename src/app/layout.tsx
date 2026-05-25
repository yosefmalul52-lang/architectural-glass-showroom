import type { Metadata } from "next";
import { El_Messiri, Assistant, Heebo } from "next/font/google";
import { ClientShell } from "@/components/layout/ClientShell";
import "./globals.css";

const elMessiri = El_Messiri({
  variable: "--font-el-messiri",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "זכוכית.סטודיו | בוטיק לזכוכית אדריכלית",
  description:
    "סטודיו בוטיק לתכנון וביצוע פרויקטי זכוכית אדריכלית — דיוק מיקרוני, הנדסה ואמנות החומר לבתים פרטיים, ספא ומשרדים.",
  keywords: ["זכוכית אדריכלית", "מקלחונים יוקרה", "זכוכית בטיחותית", "ספא", "משרדים"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${elMessiri.variable} ${assistant.variable} ${heebo.variable} overflow-x-hidden antialiased`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
