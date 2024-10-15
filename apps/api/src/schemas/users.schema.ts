import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { isNull, sql } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const Gender = ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'] as const;
export const genderEnum = pgEnum('gender_enum', Gender);

export const usersTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid')
      .notNull()
      .default(sql`(uuid_generate_v4())`),

    isAdmin: boolean('is_admin').default(false).notNull(),
    name: text('name').notNull(),
    gender: genderEnum('gender'),

    password: text('password').notNull(),
    passwordResetToken: text('password_reset_token'),
    passwordResetTokenSentAt: timestamp('password_reset_token_sent_at', {
      precision: 3,
    }),
    passwordResetTokenExpiredAt: timestamp('password_reset_token_expired_at', {
      precision: 3,
    }),

    email: text('email').notNull(),

    isEmailConfirmed: boolean('is_email_confirmed').default(false).notNull(),
    emailConfirmedAt: timestamp('email_confirmed_at', { precision: 3 }),

    emailConfirmToken: text('email_confirm_token'),
    emailConfirmTokenSentAt: timestamp('email_confirm_token_sent_at', {
      precision: 3,
    }),

    updatedEmail: text('updated_email'),
    emailUpdateToken: text('email_update_token'),
    emailUpdateTokenSentAt: timestamp('email_update_token_sent_at', {
      precision: 3,
    }),
    emailUpdateTokenExpiredAt: timestamp('email_update_token_expired_at', {
      precision: 3,
    }),

    createdAt: timestamp('created_at', { precision: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { precision: 3 }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { precision: 3 }),
  },
  (user) => {
    return {
      userUuidUniqueIndex: uniqueIndex('user_uuid_unique_index')
        .on(user.uuid)
        .where(isNull(user.deletedAt)),
      userEmailUniqueIndex: uniqueIndex('user_email_unique_index')
        .on(user.email)
        .where(isNull(user.deletedAt)),
    };
  },
);

export type DbUser = InferSelectModel<typeof usersTable>;
export type NewDbUser = InferInsertModel<typeof usersTable>;
export type OptionalDbUser = Partial<DbUser>;
export type UpdateDbUser = Partial<Omit<DbUser, 'uuid' | 'id' | 'createdAt'>>;
