import type { PortfolioProject } from "./portfolio";

export type ShowroomCard = PortfolioProject;

export {
  mirrorProjects,
  showerProjects,
  officeProjects,
  projectsByCategory,
  showroomCategories,
} from "./portfolio";

export const testimonial = {
  quote:
    "הדיוק בפרטים, בשקיפות ובתיאום מול האדריכלים הפך את הפרויקט לחוויה נדירה. התוצאה נראית כמו מוצר יוקרה, לא כמו התקנה.",
  author: "עו״ד רונית אבידן",
  role: "אדריכלית פנים · תל אביב",
};
