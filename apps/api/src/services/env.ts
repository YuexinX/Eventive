import { z } from 'zod';

const NumberRegex = /^(?:[1-9][0-9]*|0)$/;
const NodeEnvType = ['development', 'production', 'test', 'staging'] as const;
// const BooleanType = ['true', 'false'] as const;

const schema = z.object({
  // Express
  NODE_ENV: z.enum(NodeEnvType),
  PORT: z.string().regex(NumberRegex).transform(Number),

  WEB_URL: z.string().url(),

  // DB
  DATABASE_URL: z.string().url(),

  // Auth
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string().regex(NumberRegex).transform(Number),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string().regex(NumberRegex).transform(Number),

  // // Rate Limit
  // RATE_LIMIT_WINDOW_MS: z
  //   .string()
  //   .regex(NumberRegex)
  //   .default("60000")
  //   .transform(Number),
  // RATE_LIMIT_MAX_PER_WINDOW: z
  //   .string()
  //   .regex(NumberRegex)
  //   .default("60")
  //   .transform(Number),

  // Redis
  REDIS_URL: z.string().url(),

  // AWS
  // AWS_ACCESS_KEY_ID: z.string(),
  // AWS_SECRET_ACCESS_KEY: z.string(),
  // AWS_S3_BUCKET: z.string(),
  // AWS_S3_REGION: z.string(),

  // Temporal IO
  TEMPORAL_URL: z.string().url(),
  TEMPORAL_NAMESPACE: z.string(),

  // Mailer
  MAILER_DOMAIN: z.string(),
});

// REDISCLOUD_URL also considered as REDIS_URL
if (!process.env.REDIS_URL) process.env.REDIS_URL = process.env.REDISCLOUD_URL;

const result = schema.safeParse(process.env);

if (!result.success) {
  console.error('Invalid environment variables:');
  for (const [field, fieldErrors] of Object.entries(
    result.error.formErrors.fieldErrors,
  )) {
    console.error(`${field}  is ${fieldErrors.join(', ')}`);
  }
  process.exit(0);
}

const env = result.data;
export default env;
