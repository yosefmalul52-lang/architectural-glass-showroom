import type { AspectRatio, PortfolioProject } from "@/data/portfolio";

export type ShowroomCardVariant = "hero" | "compact" | "tile";

export function partitionShowroom(projects: PortfolioProject[]) {
  if (projects.length === 0) {
    return {
      featured: null as PortfolioProject | null,
      secondary: [] as PortfolioProject[],
      gallery: [] as PortfolioProject[],
    };
  }

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);

  if (projects.length <= 3) {
    return { featured, secondary: rest, gallery: [] as PortfolioProject[] };
  }

  return {
    featured,
    secondary: rest.slice(0, 2),
    gallery: rest.slice(2),
  };
}

export function aspectClass(aspect: AspectRatio, variant: ShowroomCardVariant): string {
  if (variant === "hero") {
    return aspect === "portrait" ? "aspect-[4/5]" : "aspect-[16/10]";
  }
  if (variant === "compact") {
    return "h-full min-h-0";
  }
  switch (aspect) {
    case "portrait":
      return "aspect-[4/5]";
    case "square":
      return "aspect-square";
    default:
      return "aspect-[3/2]";
  }
}

export function gallerySpanClass(aspect: AspectRatio): string {
  if (aspect === "portrait") return "showroom-gallery__item--portrait";
  if (aspect === "square") return "showroom-gallery__item--square";
  return "showroom-gallery__item--landscape";
}
