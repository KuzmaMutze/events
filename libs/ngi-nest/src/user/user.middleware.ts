import { UserData } from '@ngi/common';
import { RequestHandler } from 'express';
import { JwtService } from '../jwt/jwtService';
import { UserJwtPayload } from './jwtPayload';

declare global {
  module Express {
    export interface Request {
      user?: UserData;
    }
  }
}

export interface UserMiddlewareOptions {
  jwtSecret: string;
}

export const user: (options: UserMiddlewareOptions) => RequestHandler = (
  options
) => {
  const { jwtSecret } = options;

  let jwtService: JwtService<UserJwtPayload> = new JwtService(jwtSecret);

  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token && jwtService.verify(token)) {
      const user = jwtService.parseToken(token);

      req.user = user;
      next();
      return;
    }
    next();
  };
};
