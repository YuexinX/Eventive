import { z } from 'zod';

export const emailConfirmZod = z.object({
  token: z.string(),
});

export type EmailConfirmDto = z.infer<typeof emailConfirmZod>;
