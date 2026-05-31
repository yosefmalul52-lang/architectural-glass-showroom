export function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[100] h-full w-full max-w-full opacity-[0.06] mix-blend-multiply"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "96px 96px",
      }}
    />
  );
}
