"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/data/funnel";

export function WhatsAppFAB() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-6 z-50 hidden md:block"
    >
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-brand-teal px-5 py-3.5 text-sm font-medium text-white shadow-lg transition-all duration-500 ease-luxury hover:brightness-110"
        aria-label="צור קשר בוואטסאפ"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.25} />
        <span>וואטסאפ ישיר</span>
      </Link>
    </motion.div>
  );
}
