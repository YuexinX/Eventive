import { z } from 'zod';

export const registerUserZod = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export type RegisterUserDto = z.infer<typeof registerUserZod>;
