import { TRPCError } from '@trpc/server';
import { ServiceError } from 'src/interfaces/error';

export async function handleServiceCall<T>(
  servicePromise: Promise<T>,
): Promise<T> {
  try {
    const response = await servicePromise;
    return response;
  } catch (err: unknown) {
    if (err instanceof ServiceError) {
      throw new TRPCError({ code: err.code, message: err.message });
    } else {
      console.error(err);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }
  }
}
