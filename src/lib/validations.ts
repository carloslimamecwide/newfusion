import { z } from "zod";

export const projectTypeSchema = z.enum(["website", "ecommerce", "web-app", "other"]);
export const budgetSchema = z.enum(["1500-2999", "3000-5999", "6000-14999", "15000-plus", "unsure"]);
export const timelineSchema = z.enum(["asap", "1-3-months", "3-6-months", "flexible"]);

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: projectTypeSchema,
  budget: budgetSchema,
  timeline: timelineSchema,
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(200).optional().or(z.literal("")),
  locale: z.enum(["pt", "en"]).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
