import { z } from 'zod';

export const readEventZod = z.object({
  id: z.number().int(),
});

export type readEventDto = z.infer<typeof readEventZod>;
