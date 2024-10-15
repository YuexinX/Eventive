import { relations } from 'drizzle-orm';

import { eventsTable } from './events.schema';
import { usersTable } from './users.schema';

export const eventsOwnership = relations(eventsTable, ({ one }) => ({
  creater: one(usersTable, {
    fields: [eventsTable.ownerUserId],
    references: [usersTable.id],
  }),
}));

export const postedEvents = relations(usersTable, ({ many }) => ({
  events: many(eventsTable),
}));
