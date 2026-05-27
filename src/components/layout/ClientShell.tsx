"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/lib/lenis-context";
export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}
