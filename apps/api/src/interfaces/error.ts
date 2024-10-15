import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';

class ServiceError extends Error {
  constructor(
    public message: string,
    public code: TRPC_ERROR_CODE_KEY,
  ) {
    super(message);
    this.code = code;
  }
}

export { ServiceError };
