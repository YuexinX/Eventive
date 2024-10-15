import { TRPCError } from '@trpc/server';
import { middleware } from 'src/trpc';

export const loggerMiddleware = middleware(async (opts) => {
  const start = Date.now();
  const result = await opts.next();

  const durationMs = Date.now() - start;

  const meta = { path: opts.path, type: opts.type, durationMs };
  result.ok
    ? console.info('OK request timing:', meta)
    : console.error('Non-OK request timing', meta);
  return result;
});

export const authMiddleware = middleware(async (opts) => {
  const { meta, next, ctx } = opts;
  // only check authorization if enabled
  if (meta?.authRequired && !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next();
});
