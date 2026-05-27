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
    "התיאום מול האדריכל היה מדויק ושקוף לאורך כל הדרך. כל לוח הגיע לאתר מוכן להתקנה — אפס תיקונים בשטח.",
  author: "ר. אבידן, אדריכלית פנים",
  role: "וילה פרטית · תל אביב",
};
