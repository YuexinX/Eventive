import { publicProcedure } from 'src/trpc';
import { authMiddleware, loggerMiddleware } from 'src/trpc/middleware';

export const baseProcedure = publicProcedure.use(
  loggerMiddleware.unstable_pipe(authMiddleware),
);
