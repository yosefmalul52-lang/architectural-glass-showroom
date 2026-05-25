import Link from "next/link";
import { navSections } from "@/data/funnel";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-bg-secondary">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-3 lg:px-10">
        <div>
          <p className="font-display text-xl text-text-main">
            זכוכית<span className="text-brand-teal">.</span>סטודיו
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
            זכוכית אדריכלית יוקרתית — תכנון, הנדסה וביצוע מדויק.
          </p>
        </div>

        <nav className="flex flex-col gap-3" aria-label="ניווט תחתון">
          {navSections.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-text-muted transition-colors hover:text-text-main"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm text-text-muted">
          <p className="text-text-main">תל אביב, ישראל</p>
          <p className="mt-2">info@glass.studio</p>
          <p className="mt-2">050-000-0000</p>
          <p className="mt-8 text-xs tracking-wide text-text-muted/70">
            © {new Date().getFullYear()} זכוכית.סטודיו
          </p>
        </div>
      </div>
    </footer>
  );
}
