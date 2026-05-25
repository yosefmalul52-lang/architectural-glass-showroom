"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { WHATSAPP_URL } from "@/data/funnel";
import { cn } from "@/lib/utils";

export function StickyCtaBar() {
  const scrolled = useScrolled(400);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const show = scrolled && !contactVisible;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-bg-elevated/95 backdrop-blur-md transition-transform duration-500 ease-luxury md:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
      role="region"
      aria-label="פעולות המרה"
    >
      <div className="flex gap-2 p-3">
        <Link
          href="#contact"
          className="flex flex-1 items-center justify-center gap-2 bg-brand-gold py-3.5 text-sm font-medium text-text-main"
          aria-label="תיאום פגישת ייעוץ"
        >
          תיאום ייעוץ
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center bg-brand-teal text-white"
          aria-label="וואטסאפ ישיר"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
        </a>
      </div>
    </div>
  );
}
