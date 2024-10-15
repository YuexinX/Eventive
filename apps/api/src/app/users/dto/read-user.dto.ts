import { z } from 'zod';

export const readUserZod = z.object({
  uuid: z.string().uuid(),
});

export type ReadUserDto = z.infer<typeof readUserZod>;
