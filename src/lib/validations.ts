import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
  locale: z.enum(["pt", "en"]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
