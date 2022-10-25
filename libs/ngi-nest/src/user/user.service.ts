import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserData } from '@ngi/common';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getUser(): UserData {
    if (!this.request.user) {
      throw new Error('User is empty. Did you forget to apply middleware?');
    }
    return this.request.user;
  }
}
