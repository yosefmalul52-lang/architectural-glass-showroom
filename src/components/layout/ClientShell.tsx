"use client";

import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/lib/lenis-context";
import { CursorLight } from "@/components/experience/CursorLight";

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CursorLight />
      {children}
    </SmoothScrollProvider>
  );
}
