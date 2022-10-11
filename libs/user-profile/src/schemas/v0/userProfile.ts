import { z } from 'zod';
import { settingsSchema } from './settings';

export const userProfileSchema = z.object({
  lastUpdate: z
    .preprocess(
      (arg) =>
        typeof arg === 'string' || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date()
    )
    .default(() => new Date()),
  settings: settingsSchema,
});

export type UserProfile = z.infer<typeof userProfileSchema>;
