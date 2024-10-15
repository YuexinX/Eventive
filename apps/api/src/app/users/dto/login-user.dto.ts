import { z } from 'zod';

export const loginUsersZod = z.object({
  email: z.string().trim().email(),
  password: z.string(),
});

export type LoginUserDto = z.infer<typeof loginUsersZod>;
