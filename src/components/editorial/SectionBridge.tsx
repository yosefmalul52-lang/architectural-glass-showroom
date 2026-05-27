/**
 * A gradient bridge that visually blends two adjacent sections.
 * Place between two <section> elements in page.tsx.
 * `from` / `to` should be CSS variable values (without var()).
 */
export function SectionBridge({
  from = "var(--bg-secondary)",
  to = "var(--bg-primary)",
  height = 80,
}: {
  from?: string;
  to?: string;
  height?: number;
}) {
  if (height <= 0) return null;

  return (
    <div
      aria-hidden
      style={{
        height,
        background: `linear-gradient(
          to bottom,
          ${from} 0%,
          color-mix(in srgb, ${from} 72%, ${to}) 42%,
          color-mix(in srgb, ${from} 28%, ${to}) 72%,
          ${to} 100%
        )`,
        marginTop: -(height / 2),
        marginBottom: -(height / 2),
        position: "relative",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
