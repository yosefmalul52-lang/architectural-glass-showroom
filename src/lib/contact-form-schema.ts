import { z } from "zod";
import { projectScopes } from "@/data/funnel";

const projectScopeValues = projectScopes.map((scope) => scope.value) as [
  (typeof projectScopes)[number]["value"],
  ...(typeof projectScopes)[number]["value"][],
];

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "נא להזין שם מלא")
    .max(100, "השם ארוך מדי"),
  phone: z
    .string()
    .trim()
    .min(9, "נא להזין מספר טלפון")
    .max(24, "מספר הטלפון ארוך מדי")
    .regex(/^[\d\s\-+()]+$/, "מספר טלפון לא תקין"),
  email: z
    .string()
    .trim()
    .email("נא להזין כתובת אימייל תקינה")
    .max(254, "כתובת האימייל ארוכה מדי"),
  projectType: z
    .string()
    .trim()
    .min(2, "נא להזין סוג פרויקט")
    .max(120, "סוג הפרויקט ארוך מדי"),
  projectScope: z.enum(projectScopeValues, {
    message: "נא לבחור את היקף הפרויקט",
  }),
  notes: z
    .string()
    .trim()
    .max(2000, "הערות ארוכות מדי")
    .optional(),
  consent: z
    .boolean()
    .refine((value) => value, { message: "נא לאשר הסכמה ליצירת קשר" }),
  showroomInterest: z.string().trim().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function getProjectScopeLabel(projectScope: ContactFormData["projectScope"]): string {
  return projectScopes.find((scope) => scope.value === projectScope)?.label ?? projectScope;
}
