import { decode, verify } from 'jsonwebtoken';

export class JwtService<P = any> {
  constructor(private readonly secret: string) {}

  verify(token: string): boolean {
    try {
      verify(token, 'secret');
      return true;
    } catch {
      return false;
    }
  }

  parseToken<T = P>(token: string): T {
    return decode(token, { json: true }) as T;
  }
}
