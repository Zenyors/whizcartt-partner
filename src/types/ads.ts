
import { z } from 'zod';

export const adFormSchema = z.object({
  // Campaign Details
  campaignName: z.string().min(3, { message: "Campaign name must be at least 3 characters" }),
  objective: z.enum(["awareness", "traffic", "conversions", "sales"]),
  
  // Ad Creative
  headline: z.string().min(3, { message: "Headline must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  callToAction: z.enum(["shop_now", "learn_more", "sign_up", "contact_us", "book_now"]),
  
  // Audience Targeting
  targetingType: z.enum(["broad", "custom", "lookalike"]),
  ageRange: z.object({
    min: z.number().min(13).max(65),
    max: z.number().min(13).max(65),
  }),
  gender: z.enum(["all", "male", "female"]),
  locations: z.string(),
  interests: z.string().optional(),
  
  // Budget & Schedule
  budgetType: z.enum(["daily", "lifetime"]),
  budget: z.number().min(100, { message: "Minimum budget is ₹100" }),
  startDate: z.string(),
  endDate: z.string().optional(),
  scheduleType: z.enum(["continuous", "scheduled"]),
  
  // Advanced Options
  bidStrategy: z.enum(["lowest_cost", "cost_cap", "bid_cap"]),
  bidAmount: z.number().optional(),
  optimizationGoal: z.enum(["impressions", "clicks", "conversions", "reach"]),
});

export type AdFormValues = z.infer<typeof adFormSchema>;
