import { Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { FetchError } from '@integrations/events';
import { NgiError } from '@ngi/common';

@Catch(FetchError)
export class FetchErrorsFilter implements ExceptionFilter {
  catch(error: FetchError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const status = error.innerError.response?.status ?? 500;

    const ngiError: NgiError = {
      message: error.message,
      errorId: error.errorId,
    };
    //TODO: add logging

    response.status(status).json(ngiError);
  }
}
