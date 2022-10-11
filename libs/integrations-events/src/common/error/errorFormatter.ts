import { AxiosError } from 'axios';
import { ErrorDto } from './errorDto';
import { FetchError } from './fetchError';

export type ErrorFormatter = (error: AxiosError) => FetchError;

export const defaultErrorFormatter: ErrorFormatter = (error) => {
  return new FetchError({
    message: error.message,
    innerError: error,
  });
};

export const errorFormatter: ErrorFormatter = (error) => {
  if (error.response?.data && isProblem(error.response.data)) {
    return new FetchError({
      message: error.response.data.message,
      innerError: error,
    });
  }
  return defaultErrorFormatter(error);
};

const isProblem = (data: any): data is ErrorDto => {
  return 'statusCode' in data && 'message' in data;
};
