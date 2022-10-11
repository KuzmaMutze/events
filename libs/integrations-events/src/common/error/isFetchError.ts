import { FetchError } from './fetchError';

export const isFetchError = (error: unknown): error is FetchError => {
  return error instanceof FetchError;
};
