// sort-imports-ignore
import env from 'src/services/env';

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import moment from 'moment-timezone';
import { usersRouter } from 'src/app/users/users.router';
import jwt from 'src/services/jwt';
import temporal from 'src/services/temporal';
import { router } from 'src/trpc';
import { createContext } from 'src/trpc/context';
import { eventsRouter } from './app/events/events.router';

const { PORT } = env;

moment.tz.setDefault('Asia/Shanghai');

const appRouter = router({
  users: usersRouter,
  events: eventsRouter,
});
export type AppRouter = typeof appRouter;

async function startServer(): Promise<void> {
  await jwt.init();
  await temporal.init();
  const server = createHTTPServer({
    middleware: cors({ origin: '*' }),
    router: appRouter,
    createContext,
  });
  server.listen(PORT);
}

startServer().catch((err) => {
  console.error('Failed to start server', err);
});
