DO $$ BEGIN
 CREATE TYPE "gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT (uuid_generate_v4()) NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"gender" "gender_enum",
	"password" text NOT NULL,
	"password_reset_token" text,
	"password_reset_token_sent_at" timestamp (3),
	"password_reset_token_expired_at" timestamp (3),
	"email" text NOT NULL,
	"is_email_confirmed" boolean DEFAULT false NOT NULL,
	"email_confirmed_at" timestamp (3),
	"email_confirm_token" text,
	"email_confirm_token_sent_at" timestamp (3),
	"updated_email" text,
	"email_update_token" text,
	"email_update_token_sent_at" timestamp (3),
	"email_update_token_expired_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"deleted_at" timestamp (3)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_uuid_unique_index" ON "users" ("uuid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_unique_index" ON "users" ("email");