import Link from "next/link";
import { navSections } from "@/data/funnel";
import { BRAND, CONTACT } from "@/data/site";

const services = [
  "מקלחונים Triplex מחוסמת",
  "מראות LED מותאמות-אישית",
  "מחיצות זכוכית אדריכליות",
  "חזיתות ופנלים",
  "בריכות ואזורי חוץ",
];

export function Footer() {
  return (
    <footer
      className="bg-[#18344A]"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Main grid */}
        <div className="grid gap-10 py-14 md:grid-cols-4 md:gap-12 md:py-20">

          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-xl text-white/90">{BRAND.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/38">
              {BRAND.tagline} — מ-{BRAND.founded}.
            </p>
            <div className="mt-6 h-px w-8 bg-brand-gold" />
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 font-[family-name:var(--font-cormorant)] text-[13px] italic tracking-[0.16em] uppercase sm:mb-5 sm:text-[14px] sm:tracking-[0.18em]" style={{ color: "#C7B299" }}>שירותים</p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s} className="text-[15px] text-white/45 sm:text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 font-[family-name:var(--font-cormorant)] text-[13px] italic tracking-[0.16em] uppercase sm:mb-5 sm:text-[14px] sm:tracking-[0.18em]" style={{ color: "#C7B299" }}>ניווט</p>
            <nav className="flex flex-col gap-3" aria-label="ניווט תחתון">
              {navSections.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-[15px] text-white/45 transition-colors duration-300 hover:text-white/80 sm:text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 font-[family-name:var(--font-cormorant)] text-[13px] italic tracking-[0.16em] uppercase sm:mb-5 sm:text-[14px] sm:tracking-[0.18em]" style={{ color: "#C7B299" }}>יצירת קשר</p>
            <div className="flex flex-col gap-3 text-[15px] sm:text-sm">
              <a href={`tel:${CONTACT.phoneTel}`} className="text-white/55 transition-colors duration-300 hover:text-white/85">
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="text-white/55 transition-colors duration-300 hover:text-white/85">
                {CONTACT.email}
              </a>
              <p className="mt-2 text-white/75">{CONTACT.address}</p>
              <p className="text-xs text-white/30">{CONTACT.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-start gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {BRAND.name} — כל הזכויות שמורות
          </p>
          <p className="text-xs text-white/25">
            זכוכית אדריכלית · תכנון וביצוע · ישראל
          </p>
        </div>
      </div>
    </footer>
  );
}
