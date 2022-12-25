import { z } from 'zod';

export const commonProfileSchema = z.object({
  version: z.literal(0).default(0),
  theme: z.enum(['dark', 'light']).default('dark'),
  lastUpdated: z
    .preprocess(
      (arg) =>
        typeof arg === 'string' || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date()
    )
    .default(() => new Date()),
});

export type CommonProfile = z.infer<typeof commonProfileSchema>;
