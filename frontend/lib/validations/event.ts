import { z } from "zod";

export const analyticsEventNames = [
  "hero_explore_click",
  "hero_consultation_click",
  "story_completed",
  "specs_viewed",
  "quote_cart_add",
  "quote_cart_opened",
  "form_submit_success",
  "chat_opened",
  "chat_message_sent",
  "chat_cleared",
  "scroll_25",
  "scroll_50",
  "scroll_75",
  "scroll_100",
] as const;

export const analyticsEventSchema = z.object({
  eventName: z.enum(analyticsEventNames),
  section: z.string().trim().max(80).optional(),
  sessionId: z.string().trim().min(8).max(80),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type AnalyticsEventName = (typeof analyticsEventNames)[number];
export type AnalyticsEventPayload = z.infer<typeof analyticsEventSchema>;
