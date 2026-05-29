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

const headingTitleClass =
  "text-lg font-medium uppercase tracking-widest text-text-main";

function FooterHeading({ children }: { children: string }) {
  return (
    <div className="mb-6 flex flex-col items-start">
      <p className={headingTitleClass}>{children}</p>
      <span className="mt-3 block h-px w-8 bg-[#C8B49B]/80" aria-hidden />
    </div>
  );
}

const linkClass =
  "text-sm font-light tracking-wide text-text-main/75 transition-colors duration-300 hover:text-text-main md:text-base";

export function Footer() {
  return (
    <footer className="border-t border-black bg-[#F2E9DF]">
      <div className="mx-auto max-w-[1400px] px-6 text-right lg:px-10">
        {/* Main grid */}
        <div className="grid items-start gap-12 py-14 md:grid-cols-4 md:py-20 lg:gap-24">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-6 flex justify-center">
              <Image
                src="/logo-tzameret-latest-transparent.png"
                alt={BRAND.name}
                width={320}
                height={320}
                unoptimized
                className="h-28 w-auto object-contain object-center lg:h-32"
              />
            </div>
            <p className="mt-2 text-sm font-light leading-relaxed tracking-wide text-text-main/75 md:text-base">
              {BRAND.tagline} — מ-{BRAND.founded}.
            </p>
          </div>

          {/* Services */}
          <div className="text-right">
            <FooterHeading>שירותים</FooterHeading>
            <ul className="space-y-4">
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
            <nav className="flex flex-col gap-4" aria-label="ניווט תחתון">
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
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="text-base font-light tracking-wide text-text-main transition-colors duration-300 hover:text-text-main/70 md:text-lg"
              >
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-base font-light tracking-wide text-text-main transition-colors duration-300 hover:text-text-main/70 md:text-lg"
              >
                {CONTACT.email}
              </a>
              <p className="mt-2 text-sm font-light tracking-wide text-text-main/75 md:text-base">
                {CONTACT.address}
              </p>
              <p className="text-sm font-light text-text-main/60">{CONTACT.hours}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-end gap-3 border-t border-text-main/15 pt-6 pb-8 text-right sm:flex-row-reverse sm:items-center sm:justify-between">
          <p className="text-xs font-light tracking-wide text-text-main/60">
            © {new Date().getFullYear()} {BRAND.name} — כל הזכויות שמורות
          </p>
          <p className="text-xs font-light tracking-wide text-text-main/60">
            זכוכית אדריכלית · תכנון וביצוע · ישראל
          </p>
        </div>
      </div>
    </footer>
  );
}
