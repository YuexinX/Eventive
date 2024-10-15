import { usersTable } from 'src/schemas/users.schema';

import { eventsTable } from './events.schema';

export const schemas = {
  users: usersTable,
  events: eventsTable,
};

export type Schemas = typeof schemas;
