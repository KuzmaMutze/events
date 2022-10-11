import { AxiosError } from 'axios';

export class FetchError extends Error {
  name = 'FetchError';
  message: string;
  innerError: AxiosError;
  errorId: string | undefined;
  constructor(options: {
    message: string;
    errorId?: string;
    innerError: AxiosError;
  }) {
    super(options.message);
    this.message = options.message;
    this.errorId = options.errorId;
    this.innerError = options.innerError;
  }
}
