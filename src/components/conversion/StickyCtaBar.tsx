"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { WHATSAPP_URL } from "@/data/funnel";
import { onWhatsAppClick } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";

export function StickyCtaBar() {
  const scrolled = useScrolled(400);
  const [contactVisible, setContactVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    if (!contact && !footer) return;

    const contactObserver = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );

    if (contact) contactObserver.observe(contact);
    if (footer) footerObserver.observe(footer);

    return () => {
      contactObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  const show = scrolled && !contactVisible && !footerVisible;

  return (
    <div
      className={cn(
        "glass-premium fixed inset-x-0 bottom-0 z-50 border-t border-white/20 transition-transform duration-500 ease-luxury md:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
      role="region"
      aria-label="פעולות המרה"
    >
      <div className="flex gap-2 bg-transparent p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href="#contact"
          className="flex flex-1 items-center justify-center gap-2 bg-brand-gold py-3.5 text-sm font-medium text-text-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          aria-label="תיאום פגישת ייעוץ"
        >
          תיאום ייעוץ
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onWhatsAppClick("sticky_bar")}
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center bg-brand-teal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          aria-label="וואטסאפ ישיר"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
        </a>
      </div>
    </div>
  );
}
