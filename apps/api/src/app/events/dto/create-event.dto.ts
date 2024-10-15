import { z } from 'zod';

export const createEventZod = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().trim().date(),
  time: z.string().trim(),
  timeZone: z.string().trim(),

  duration: z.number().gte(0).optional(),
  location: z.string().optional(),
  dressCode: z.string().optional(),
  giftList: z.string().array().optional(),
});

export type createEventDto = z.infer<typeof createEventZod>;
