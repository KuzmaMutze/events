import { z } from 'zod';

const intSchema = z.preprocess(
  (x) => (x !== undefined ? Number(x as string) : undefined),
  z.number().int().optional()
);

export const envSchema = z.object({
  PORT: intSchema,
  EVENTS_API_URL: z.any(),
});

export type Env = z.infer<typeof intSchema>;
