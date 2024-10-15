import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { usersTable } from './users.schema';

export const eventsTable = pgTable('events', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid')
    .notNull()
    .default(sql`(uuid_generate_v4())`),

  ownerUserId: integer('UserId')
    .notNull()
    .references(() => usersTable.id),

  eventTitle: text('title').notNull(),
  eventDate: date('date').notNull(),
  eventTime: time('time', { precision: 0 }).notNull(),
  eventTimeZone: text('time_zone').notNull(),
  eventDuration: integer('duration'),
  eventLocation: text('location'),
  eventDesc: text('description'),

  dressCode: text('dress_code'),
  giftList: text('gift_list').array(),
  //amazonLink: text('amazon_wishlist_link),

  //inviteToken: text('invite_token'),
  visitors: text('visitor_emails').array(), 

  createdAt: timestamp('created_at', { precision: 3 }).defaultNow().notNull(),
});

export type DbEvent = InferSelectModel<typeof eventsTable>;
export type NewDbEvent = InferInsertModel<typeof eventsTable>;
export type OptionalDbEvent = Partial<DbEvent>;
export type UpdateDbEvent = Partial<
  Omit<DbEvent, 'uuid' | 'id' | 'createdAt' | 'owner'>
>;
