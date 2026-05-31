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
    <div className="mb-5 flex flex-col items-center gap-3 md:items-start">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal md:text-base">
        {children}
      </p>
      <span className="block h-px w-12 bg-black md:w-14" aria-hidden />
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

      <div className="mx-auto max-w-[1400px] px-6 text-center md:text-right lg:px-10">
        {/* Mobile: vertical stack · Desktop: 4-column grid */}
        <div className="flex flex-col items-center gap-12 py-16 md:grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:items-start md:gap-16 md:py-20">

          {/* Brand logo */}
          <div className="flex flex-col items-center md:items-start md:pt-0.5">
            <div className="isolate inline-flex justify-center md:justify-start">
              <Image
                src="/logo-tzameret-footer-transparent.png"
                alt={BRAND.name}
                width={320}
                height={320}
                unoptimized
                className="h-32 w-auto object-contain object-center sm:h-40 md:h-[7.5rem] md:object-right lg:h-[8.25rem]"
              />
            </div>
          </div>

          {/* Services */}
          <div className="w-full max-w-sm md:max-w-none">
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
          <div className="w-full max-w-sm md:max-w-none">
            <FooterHeading>ניווט</FooterHeading>
            <nav
              className="flex flex-col items-center gap-3 md:items-start"
              aria-label="ניווט תחתון"
            >
              {navSections.map((link) => (
                <Link key={link.id} href={`#${link.id}`} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="w-full max-w-sm md:max-w-none">
            <FooterHeading>יצירת קשר</FooterHeading>
            <div className="flex flex-col items-center gap-3 md:items-start">
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
        <div className="flex w-full flex-col items-center justify-center gap-3 border-t border-black/8 px-6 pt-6 pb-[calc(1.75rem+env(safe-area-inset-bottom))] text-center sm:flex-row sm:gap-12 md:px-16 lg:gap-20 lg:px-24">
          <p className="text-xs font-light uppercase tracking-widest text-brand-teal">
            צמרת הזכוכית · תכנון וביצוע · ישראל
          </p>
          <span
            className="hidden h-4 w-px shrink-0 bg-black/25 sm:block"
            aria-hidden
          />
          <p className="text-xs font-light tracking-wide text-brand-teal">
            כל הזכויות שמורות ל -{" "}
            <a
              href="https://www.jt-solutions.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 transition-opacity duration-300 hover:underline hover:opacity-80"
            >
              jt solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
