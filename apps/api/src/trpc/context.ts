import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { and, eq, isNull } from 'drizzle-orm';
import { usersTable } from 'src/schemas/users.schema';
import { database } from 'src/services/database';
import jwt from 'src/services/jwt';

async function auth({ req }: CreateNextContextOptions) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- safe to assume
  const authHeader = req.headers.authorization as string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split('Bearer ')[1];

    const payload = jwt.verifyAccessToken(token);

    if (payload) {
      const foundUser = await database.query.users.findFirst({
        where: and(
          isNull(usersTable.deletedAt),
          eq(usersTable.uuid, payload.uuid),
        ),
      });

      return foundUser;
    }
  }
}

export async function createContext(opts: CreateNextContextOptions) {
  const user = await auth(opts);

  return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
