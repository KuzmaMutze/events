import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    if (!request.user) {
      throw new Error('User is empty. Did you forget to apply middleware?');
    }
    return request.user;
  }
);
