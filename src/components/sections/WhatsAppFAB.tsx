"use client";

import Link from "next/link";
import { WHATSAPP_URL } from "@/data/funnel";

export function WhatsAppFAB() {
  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="צור קשר בוואטסאפ"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#2d6b84",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width={48}
          height={48}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
            stroke="#25D366"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 8.5s.5-1 1.5-1 2 1.5 2.25 2-.75 1.5-.75 1.5 1 2 2.5 3 1.5.75 1.5.75 1-1 1.5-1 1.25.5 1.5.75-.25 2-1.5 2.5S12 16.5 9.5 14s-1.5-4.5-1-5.5z"
            stroke="#25D366"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
