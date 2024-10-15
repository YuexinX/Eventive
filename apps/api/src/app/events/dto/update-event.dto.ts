import { z } from 'zod';

export const updateEventZod = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  date: z.string().trim(),
  time: z.string().trim(),
  timeZone: z.string().trim(),

  dressCode: z.string().nullable(),
  giftList: z.string().array().nullable(),
  duration: z.number().gte(0).nullable(),
  location: z.string().nullable(),
});

export type updateEventDto = z.infer<typeof updateEventZod>;
