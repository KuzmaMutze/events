import { z } from 'zod';

export const commonProfileSchema = z.object({
  theme: z.enum(['dark', 'light']).default('dark'),
  lastUpdate: z
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
