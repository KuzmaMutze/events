import type { z } from 'zod';

export type SchemaVersion = z.AnyZodObject;

export type SchemaVersions = Record<number, SchemaVersion>;
