import { z } from 'zod';

export const settingsSchema = z.object({}).default({});

export type Setting = z.infer<typeof settingsSchema>;
