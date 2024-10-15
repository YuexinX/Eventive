import { initTRPC } from '@trpc/server';
import type { Context } from 'src/trpc/context';

export interface Meta {
  authRequired: boolean;
}

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    defaultMeta: { authRequired: false },
  });

export const router = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;
