import { z } from 'zod';

export const newPasswordZod = z.object({
  token: z.string(),
  password: z.string(),
});

export type newPasswordDto = z.infer<typeof newPasswordZod>;
