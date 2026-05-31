import { Award, Handshake, ScrollText, type LucideIcon } from "lucide-react";

export type TrustPillar = {
  Icon?: LucideIcon;
  faClassName?: string;
  title: string;
  sub: string;
};

export const trustPillars: TrustPillar[] = [
  {
    Icon: Award,
    title: "חומרים ללא פשרות",
    sub: "תקן EN12150 · תעודת יצרן לכל רכיב · אחריות כתובה",
  },
  {
    Icon: Handshake,
    title: "שותפים לאדריכל",
    sub: "מעורבים מהתכנון הראשוני — לא רק מגיעים להתקנה",
  },
  {
    Icon: ScrollText,
    title: "7+ שנות מקצועיות",
    sub: "ניסיון מצטבר בנדל״ן, מלונאות ופרויקטי מגורים יוקרתיים",
  },
];
