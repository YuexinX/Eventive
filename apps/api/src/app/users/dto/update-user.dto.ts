import { z } from 'zod';

export const updateUserZod = z.object({
  name: z.string().trim().min(3).optional(),
  password: z.string().min(8).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserZod>;
