import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "נא להזין שם")
    .max(100, "השם ארוך מדי"),
  phone: z
    .string()
    .trim()
    .min(9, "נא להזין מספר טלפון")
    .max(24, "מספר הטלפון ארוך מדי")
    .regex(/^[\d\s\-+()]+$/, "מספר טלפון לא תקין"),
  notes: z.string().trim().max(2000, "הערות ארוכות מדי").optional(),
  consent: z
    .boolean()
    .refine((value) => value, { message: "נא לאשר הסכמה ליצירת קשר" }),
  showroomInterest: z.string().trim().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
