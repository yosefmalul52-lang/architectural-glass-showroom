import type { ReactNode } from "react";
import Image from "next/image";
import { HeadingAccent } from "@/components/editorial/HeadingAccent";
import { cn } from "@/lib/utils";

type BrandLogo = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
};

const brands: BrandLogo[] = [
  {
    id: "eilon-nadlan",
    name: 'אילון נדל"ן',
    src: "/clients/eilon-nadlan.png",
    width: 152,
    height: 146,
  },
  {
    id: "zeevik-investments",
    name: 'זאביק השקעות בע"מ',
    src: "/clients/zeevik-investments.png",
    width: 952,
    height: 129,
    className: "max-w-[11rem] md:max-w-[13rem]",
  },
  {
    id: "mantina",
    name: "mantina by Lital Ezra",
    src: "/clients/mantina.png",
    width: 337,
    height: 96,
    className: "max-w-[9rem] md:max-w-[10.5rem]",
  },
  {
    id: "a-weiss",
    name: "A.weiss",
    src: "/clients/a-weiss.png",
    width: 276,
    height: 127,
    className: "max-w-[8.5rem] md:max-w-[10rem]",
  },
  {
    id: "erez-sapir",
    name: "ארז ספיר",
    src: "/clients/erez-sapir.png",
    width: 321,
    height: 226,
    className: "max-w-[7.5rem] md:max-w-[9rem]",
  },
];

const CLIENT_LOGO_NAVY = "var(--text-heading-light)";

function LogoMark({ brand }: { brand: BrandLogo }) {
  const maskStyle = {
    WebkitMaskImage: `url(${brand.src})`,
    maskImage: `url(${brand.src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;

  return (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center justify-center md:h-16",
        brand.className
      )}
    >
      <span className="group relative inline-flex h-full max-h-12 items-center md:max-h-14">
        <Image
          src={brand.src}
          alt={brand.name}
          width={brand.width}
          height={brand.height}
          className="h-full w-auto max-h-12 object-contain opacity-0 md:max-h-14"
          draggable={false}
        />
        <span
          aria-hidden
          className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          style={{ ...maskStyle, backgroundColor: CLIENT_LOGO_NAVY }}
        />
      </span>
    </div>
  );
}

function LogoTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex w-max shrink-0 items-center gap-12 px-8 md:gap-16 md:px-10"
      aria-hidden={ariaHidden}
    >
      {brands.map((brand) => (
        <LogoMark key={brand.id} brand={brand} />
      ))}
    </div>
  );
}

export function ClientLogos({ trustStrip }: { trustStrip?: ReactNode }) {
  return (
    <div className="w-full overflow-hidden px-4 py-10 sm:px-6 lg:py-12">
      <div className="mb-10 text-center lg:mb-12">
        <h2 className="font-display text-display-3xl tracking-tight lg:text-display-4xl">
          <span className="block font-light text-heading-light">חלק מהלקוחות</span>
          <span className="block font-semibold text-accent-teal">שעובדים איתנו</span>
        </h2>
        <HeadingAccent align="center" className="mx-auto" color="#000000" diamondColor="var(--accent-teal)" />
      </div>

      <div className="relative">
        <div
          className="client-marquee-viewport overflow-hidden py-2"
          dir="ltr"
        >
          <div className="client-marquee-track hover:[animation-play-state:paused]">
            <LogoTrack />
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
