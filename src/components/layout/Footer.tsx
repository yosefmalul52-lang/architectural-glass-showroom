import Link from "next/link";
import Image from "next/image";
import { navSections } from "@/data/funnel";
import { BRAND, CONTACT } from "@/data/site";

const services = [
  "מקלחונים Triplex מחוסמת",
  "מראות LED מותאמות-אישית",
  "מחיצות זכוכית אדריכליות",
  "חזיתות ופנלים",
  "בריכות ואזורי חוץ",
];

function FooterHeading({ children }: { children: string }) {
  return (
    <div className="mb-5 flex flex-col items-start gap-3">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-main/50">
        {children}
      </p>
      <span className="block h-px w-6 bg-brand-gold" aria-hidden />
    </div>
  );
}

const linkClass =
  "text-sm font-light tracking-wide text-text-main/65 transition-colors duration-300 hover:text-text-main";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-bg-primary">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 text-right lg:px-10">
        {/* Main grid */}
        <div className="grid items-start gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-16 md:py-20">

          {/* Brand */}
          <div>
            <div className="mb-5 flex justify-end">
              <Image
                src="/logo-tzameret-latest-transparent.png"
                alt={BRAND.name}
                width={320}
                height={320}
                unoptimized
                className="h-24 w-auto object-contain object-center lg:h-28"
              />
            </div>
            <p className="text-sm font-light leading-relaxed tracking-wide text-text-main/60">
              {BRAND.tagline}
            </p>
            <p className="mt-1 text-sm font-light text-text-main/40">
              מ-{BRAND.founded}
            </p>
          </div>

          {/* Services */}
          <div className="text-right">
            <FooterHeading>שירותים</FooterHeading>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className={linkClass}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="text-right">
            <FooterHeading>ניווט</FooterHeading>
            <nav className="flex flex-col gap-3" aria-label="ניווט תחתון">
              {navSections.map((link) => (
                <Link key={link.id} href={`#${link.id}`} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="text-right">
            <FooterHeading>יצירת קשר</FooterHeading>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="text-sm font-light tracking-wide text-text-main transition-colors duration-300 hover:text-brand-gold"
              >
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm font-light tracking-wide text-text-main transition-colors duration-300 hover:text-brand-gold"
              >
                {CONTACT.email}
              </a>
              <p className="mt-2 text-sm font-light tracking-wide text-text-main/60">
                {CONTACT.address}
              </p>
              <p className="text-xs font-light text-text-main/45">{CONTACT.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-end gap-2 border-t border-black/8 pt-5 pb-7 sm:flex-row-reverse sm:items-center sm:justify-between">
          <p className="text-xs font-light tracking-wide text-text-main/40">
            © {new Date().getFullYear()} {BRAND.name} — כל הזכויות שמורות
          </p>
          <p className="text-xs font-light tracking-widest text-text-main/35 uppercase">
            זכוכית אדריכלית · תכנון וביצוע · ישראל
          </p>
        </div>
      </div>
    </footer>
  );
}
