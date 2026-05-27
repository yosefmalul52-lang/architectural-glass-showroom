export type MaterialTag = "gold" | "black" | "fluted" | "backlit" | "smoked" | "clear";
export type ProjectCategory = "mirrors" | "showers" | "offices";
export type AspectRatio = "landscape" | "portrait" | "square";

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  alt: string;
  image: string;
  category: ProjectCategory;
  materials: MaterialTag[];
  featured?: boolean;
  aspect: AspectRatio;
};

const img = (name: string) => `/portfolio/${name}.png`;

export const showerProjects: PortfolioProject[] = [
  {
    id: "spa-smoked-gold",
    slug: "spa-smoked-gold-shower",
    title: "מקלחון מעושן במסגרת זהב",
    description:
      "זכוכית bronze מעושנת 8mm, פרופיל זהב מברש, תאורת LED פרימטרית וסגירה שקטה עם ציר מוסתר.",
    alt: "מקלחון זכוכית מעושנת עם פרופיל זהב ותאורת LED",
    image: img("spa-smoked-gold-shower"),
    category: "showers",
    materials: ["smoked", "gold"],
    featured: true,
    aspect: "landscape",
  },
  {
    id: "spa-marble-gold",
    slug: "spa-marble-gold-shower",
    title: "מקלחון מרבל עם זהב",
    description: "זכוכית Extra Clear על מרבל, צירים וידיות זהב מברש וספסל אבן משולב.",
    alt: "מקלחון זכוכית במרחץ מרבל עם פרופיל זהב",
    image: img("spa-marble-gold-shower"),
    category: "showers",
    materials: ["gold", "clear"],
    aspect: "landscape",
  },
  {
    id: "spa-black-mirror",
    slug: "spa-black-frame-mirror",
    title: "מקלחון frameless בפרופיל שחור",
    description: "מקלחון שקוף עם פרופיל מאט שחור, צירים מינימליים וסגירה שקטה.",
    alt: "מקלחון זכוכית שחור",
    image: img("spa-black-frame-mirror"),
    category: "showers",
    materials: ["black", "clear"],
    aspect: "portrait",
  },
  {
    id: "spa-warm-stone",
    slug: "spa-warm-stone-frameless",
    title: "אבן חמה וזכוכית שקופה",
    description: "מחיצת זכוכית frameless על אבן טבעית, צירים מינימליים ותאורה רכה.",
    alt: "מקלחון זכוכית על קיר אבן חם",
    image: img("spa-warm-stone-frameless"),
    category: "showers",
    materials: ["clear"],
    aspect: "landscape",
  },
  {
    id: "spa-greige-bench",
    slug: "spa-greige-gold-bench",
    title: "Triplex עם ספסל אבן",
    description: "זכוכית בטיחותית 8–10 מ״מ, ספסל אבן מובנה, פרופיל זהב וניקוז ליניארי שקוף.",
    alt: "מקלחון עם ספסל אבן ופרופיל זהב",
    image: img("spa-greige-gold-bench"),
    category: "showers",
    materials: ["gold", "clear"],
    aspect: "landscape",
  },
];

export const mirrorProjects: PortfolioProject[] = [
  {
    id: "spa-backlit-fluted",
    slug: "spa-backlit-mirror-fluted",
    title: "מראה מוארת ומחיצה מחוספת",
    description: "מראת LED אחורית אופקית, מחיצת fluted 6mm עם ליטוש קצוות מלא ועץ אלון.",
    alt: "מראה מוארת עם מחיצת זכוכית מחוספת",
    image: img("spa-backlit-mirror-fluted"),
    category: "mirrors",
    materials: ["backlit", "fluted"],
    featured: true,
    aspect: "landscape",
  },
  {
    id: "spa-circular-halo",
    slug: "spa-circular-halo-mirror",
    title: "מראה עגולה עם halo",
    description: "מראה עגולה מרחפת עם תאורת halo חמה על אבן greige וזכוכית שקופה.",
    alt: "מראת אמבטיה עגולה מוארת",
    image: img("spa-circular-halo-mirror"),
    category: "mirrors",
    materials: ["backlit", "clear"],
    aspect: "portrait",
  },
  {
    id: "spa-onyx-pill",
    slug: "spa-onyx-pill-mirror",
    title: "אוניקס ומראת pill",
    description: "קיר אוניקס כחול-ירקרק, מראת pill מוארת וארונות מחורצים עם גימור זהב.",
    alt: "מראת pill מוארת על קיר אוניקס",
    image: img("spa-onyx-pill-mirror"),
    category: "mirrors",
    materials: ["backlit", "gold"],
    aspect: "landscape",
  },
  {
    id: "spa-organic-mirror",
    slug: "spa-organic-mirror-stone",
    title: "מראה אורגנית מותאמת",
    description: "מראה בחיתוך אורגני מותאם אישית, אבן אפורה וברז מברש זהב.",
    alt: "מראה בעיצוב אורגני על קיר אבן",
    image: img("spa-organic-mirror-stone"),
    category: "mirrors",
    materials: ["backlit", "gold"],
    aspect: "portrait",
  },
  {
    id: "spa-pill-fluted",
    slug: "spa-pill-fluted-wood",
    title: "מראת pill מוארת",
    description: "מראת stadium מוארת, מחיצת fluted וארונות עץ עם משטח אבן חם.",
    alt: "מראת pill עם מחיצת זכוכית מחוספת",
    image: img("spa-pill-fluted-wood"),
    category: "mirrors",
    materials: ["backlit", "fluted"],
    aspect: "landscape",
  },
];

export const officeProjects: PortfolioProject[] = [
  {
    id: "office-frosted",
    slug: "office-frosted-partition",
    title: "מחיצה עם דלת חלבית",
    description: "מחיצות floor-to-ceiling, דלת חלבית לפרטיות ופרופיל שחור דק.",
    alt: "מחיצת זכוכית משרדית עם דלת חלבית",
    image: img("office-frosted-partition"),
    category: "offices",
    materials: ["clear", "black"],
    featured: true,
    aspect: "landscape",
  },
  {
    id: "office-charcoal",
    slug: "office-black-profile-charcoal",
    title: "פרופיל שחור ורצפה מברשת",
    description: "מחיצות Wide-Span עם פרופיל שחור מאט, זכוכית שקופה ותאורה ליניארית.",
    alt: "מחיצות זכוכית במשרד עם פרופיל שחור",
    image: img("office-black-profile-charcoal"),
    category: "offices",
    materials: ["black", "clear"],
    aspect: "landscape",
  },
  {
    id: "office-fluted-herringbone",
    slug: "office-fluted-herringbone",
    title: "Fluted והרינגבון",
    description: "זכוכית מחוספת לפרטיות, רצפת עץ herringbone ומסדרון אדריכלי פתוח.",
    alt: "מחיצת זכוכית מחוספת במסדרון משרד",
    image: img("office-fluted-herringbone"),
    category: "offices",
    materials: ["fluted", "clear"],
    aspect: "landscape",
  },
  {
    id: "office-slat-corridor",
    slug: "office-slat-ceiling-corridor",
    title: "מסדרון עם תקרת slats",
    description: "מחיצות זכוכית, תקרת עץ slats ותאורת LED אינטגרטיבית לאורך המסדרון.",
    alt: "מסדרון משרד עם מחיצות זכוכית ותקרת עץ",
    image: img("office-slat-ceiling-corridor"),
    category: "offices",
    materials: ["fluted", "clear"],
    aspect: "landscape",
  },
  {
    id: "office-boardroom",
    slug: "office-boardroom-partition",
    title: "חדר ישיבות במחיצת זכוכית",
    description: "מחיצה אקוסטית לחדר ישיבות, שולחן עץ ותאורה ליניארית לאורך הקיר.",
    alt: "חדר ישיבות עם מחיצת זכוכית",
    image: img("office-boardroom-partition"),
    category: "offices",
    materials: ["clear"],
    aspect: "landscape",
  },
];

export const showroomCategories = [
  { value: "mirrors" as const, label: "מראות" },
  { value: "showers" as const, label: "מקלחונים" },
  { value: "offices" as const, label: "משרדים" },
];

export const projectsByCategory: Record<ProjectCategory, PortfolioProject[]> = {
  mirrors: mirrorProjects,
  showers: showerProjects,
  offices: officeProjects,
};

export const allProjects = [...mirrorProjects, ...showerProjects, ...officeProjects];

/** @deprecated Use showerProjects / mirrorProjects / officeProjects */
export const spaProjects = [...showerProjects, ...mirrorProjects];
/** @deprecated Use officeProjects */
export const commercialProjects = officeProjects;

export const materialFilters: { value: MaterialTag | "all"; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "gold", label: "זהב" },
  { value: "black", label: "שחור" },
  { value: "fluted", label: "מחוסף" },
  { value: "backlit", label: "מואר" },
  { value: "clear", label: "שקוף" },
];

export const materialLabels: Record<MaterialTag, string> = {
  gold: "זהב מברש",
  black: "שחור מאט",
  fluted: "Fluted",
  backlit: "מואר LED",
  smoked: "מעושן",
  clear: "שקוף",
};

export const atelierShots = [
  { image: img("spa-smoked-gold-shower"), alt: "פרופיל זהב מברש על זכוכית מעושנת" },
  { image: img("spa-backlit-mirror-fluted"), alt: "מראה LED עם חיתוך CNC" },
  { image: img("spa-fluted-gold"), alt: "טקסטורת Fluted וזהב" },
  { image: img("spa-circular-halo-mirror"), alt: "תאורת Halo במראה עגולה" },
  { image: img("spa-onyx-pill-mirror"), alt: "מראת Pill על קיר אוניקס" },
  { image: img("office-fluted-herringbone"), alt: "מחיצת Fluted במסדרון" },
  { image: img("spa-greige-gold-bench"), alt: "Triplex 10מ״מ עם ספסל אבן" },
  { image: img("office-black-profile-charcoal"), alt: "פרופיל אלומיניום שחור מאט" },
];
