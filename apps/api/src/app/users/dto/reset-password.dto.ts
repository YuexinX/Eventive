import { z } from 'zod';

export const resetPasswordZod = z.object({
  email: z.string().trim().email(),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordZod>;
