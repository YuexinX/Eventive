import { type AppRouter } from '@server';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const helperApi = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
    }),
  ],
});

export const reactQueryClient = createTRPCReact<AppRouter>({
  abortOnUnmount: true,
});

export type ApiRequest = inferRouterInputs<AppRouter>;
export type ApiResponse = inferRouterOutputs<AppRouter>;
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
