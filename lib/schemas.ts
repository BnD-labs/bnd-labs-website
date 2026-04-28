import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email"),
  company: z
    .string()
    .min(2, "Company name is required")
    .max(100, "Company name is too long"),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().max(2000, "Message is too long").optional().or(z.literal("")),
  source: z.string().max(100).optional().or(z.literal("")),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const INDUSTRIES = [
  "Healthcare (Private Clinic)",
  "Hospitality (Lodge / Hotel / Restaurant)",
  "Education (Private School)",
  "Professional Services",
  "Retail / Ecommerce",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under ZMW 5,000",
  "ZMW 5,000 – 10,000",
  "ZMW 10,000 – 20,000",
  "ZMW 20,000+",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "ASAP (within 2 weeks)",
  "Within the next month",
  "Within the next 3 months",
  "Just exploring",
] as const;

export const discoveryCallSchema = contactSchema.extend({
  industry: z.enum(INDUSTRIES, {
    message: "Please select your industry",
  }),
  budget: z.enum(BUDGET_RANGES, {
    message: "Please select a budget range",
  }),
  timeline: z.enum(TIMELINES, {
    message: "Please select a timeline",
  }),
});
export type DiscoveryCallInput = z.infer<typeof discoveryCallSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;
