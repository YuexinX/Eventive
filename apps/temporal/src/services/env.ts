import { z } from 'zod';

const NodeEnvType = ['development', 'production', 'test', 'staging'] as const;
const NumberRegex = /^(?:[1-9][0-9]*|0)$/;

const schema = z.object({
  // Express
  NODE_ENV: z.enum(NodeEnvType),

  // Temporal IO
  TEMPORAL_URL: z.string().url(),
  TEMPORAL_NAMESPACE: z.string(),

  // Mailer
  MAILER_HOST: z.string(),
  MAILER_PORT: z.string().regex(NumberRegex).transform(Number),
  MAILER_AUTH_USER: z.string(),
  MAILER_AUTH_PASS: z.string(),
});

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
