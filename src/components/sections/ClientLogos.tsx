import type { ReactNode } from "react";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import { cn } from "@/lib/utils";

type BrandLogo = {
  id: string;
  name: string;
  className: string;
};

const brands: BrandLogo[] = [
  {
    id: "razili",
    name: "Razili",
    className: "font-display text-2xl font-light tracking-[0.12em]",
  },
  {
    id: "icon-fitness",
    name: "!CON FITNESS",
    className: "font-body text-sm font-black uppercase tracking-[0.28em]",
  },
  {
    id: "worker",
    name: "WORKER",
    className: "font-body text-sm font-bold uppercase tracking-[0.42em]",
  },
  {
    id: "zavulon",
    name: "מועצה אזורית זבולון",
    className: "font-body text-sm font-medium tracking-wide",
  },
  {
    id: "mishmar",
    name: "המשמר העירוני",
    className: "font-display text-lg font-medium tracking-wide",
  },
  {
    id: "tiv-taam",
    name: "טיב טעם",
    className: "font-display text-xl font-semibold tracking-tight",
  },
  {
    id: "punkt",
    name: "PUNKT design",
    className: "font-body text-sm font-light lowercase tracking-[0.22em]",
  },
];

function LogoTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex w-max shrink-0 items-center gap-10 px-6 md:gap-14 md:px-8"
      aria-hidden={ariaHidden}
    >
      {brands.map((brand) => (
        <span
          key={brand.id}
          className={cn(
            "shrink-0 whitespace-nowrap opacity-80 transition-opacity duration-500 hover:opacity-100",
            brand.className
          )}
          style={{ color: "#1a1a1a" }}
        >
          {brand.name}
        </span>
      ))}
    </div>
  );
}

export function ClientLogos({ trustStrip }: { trustStrip?: ReactNode }) {
  return (
    <div className="w-full overflow-hidden border border-accent-teal/30 border-t-2 border-t-accent-teal/60 border-b-2 border-b-accent-teal/60 bg-white/90 px-4 py-10 shadow-[0_2px_20px_rgba(21,21,21,0.09)] sm:px-6 lg:py-12">
      <div className="mb-10 text-center lg:mb-12">
        <h2 className="font-display text-display-3xl tracking-tight text-text-main lg:text-display-4xl">
          <span className="block font-light">חלק מהלקוחות</span>
          <span className="block font-semibold text-[#C8B49B]">שעובדים איתנו</span>
        </h2>
        <HeadingAccent align="center" className="mx-auto" color="#000000" diamondColor="#C8B49B" />
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-elevated to-transparent md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-elevated to-transparent md:w-28"
          aria-hidden
        />

        <div className="flex w-full overflow-hidden py-2">
          <div className="flex w-max animate-marquee-rtl hover:[animation-play-state:paused]">
            <LogoTrack />
          </div>
          <div
            className="flex w-max animate-marquee-rtl hover:[animation-play-state:paused]"
            aria-hidden
          >
            <LogoTrack ariaHidden />
          </div>
        </div>
      </div>

      {trustStrip && (
        <div className="mt-10 border-t border-hairline pt-10 lg:mt-12 lg:pt-12">
          {trustStrip}
        </div>
      )}
    </div>
  );
}
