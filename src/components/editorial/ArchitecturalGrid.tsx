import { cn } from "@/lib/utils";

interface ArchitecturalGridProps {
  className?: string;
  opacity?: number;
}

export function ArchitecturalGrid({ className, opacity = 0.5 }: ArchitecturalGridProps) {
  return (
    <div
      className={cn("arch-grid pointer-events-none absolute inset-0", className)}
      aria-hidden
      style={{ opacity }}
    />
  );
}
