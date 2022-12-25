import { z } from 'zod';
import { settingsSchema } from './settings';

export const userProfileSchema = z.object({
  version: z.literal(0).default(0),
  lastUpdated: z
    .preprocess(
      (arg) =>
        typeof arg === 'string' || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date()
    )
    .default(() => new Date()),
  settings: settingsSchema.default(settingsSchema.parse({})),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
