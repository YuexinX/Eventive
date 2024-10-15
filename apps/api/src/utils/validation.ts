import currency from 'currency.js';
import { z } from 'zod';

const oneOf = <T extends string | number | boolean | bigint | null | undefined>(
  t: readonly T[],
) => {
  if (t.length < 2) {
    throw new Error('The input array should have at least two elements.');
  }
  return z.union([
    z.literal(t[0]),
    z.literal(t[1]),
    ...t.slice(2).map((v) => z.literal(v)),
  ]);
};

export const currencyInCents = () =>
  z
    .string()
    .nullish()
    .transform((val) => {
      if (!val) return null;
      return currency(val).intValue;
    });

export const query = <
  T extends string | number | boolean | bigint | null | undefined,
>(
  t: readonly T[],
) => ({
  sorting: z.array(
    z.object({
      id: oneOf(t), // This provides correct typing but breaks the FE typing because FE is expecting string
      desc: z.boolean(),
    }),
  ),

  pagination: z.object({
    pageIndex: z.number().int().nonnegative().optional().default(0),
    pageSize: z.number().int().positive().optional().default(25),
  }),
});
