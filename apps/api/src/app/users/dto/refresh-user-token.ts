import { z } from 'zod';

export const refreshUserTokenZod = z.object({
  refreshToken: z.string(),
});

export type RefreshUserTokenDto = z.infer<typeof refreshUserTokenZod>;
