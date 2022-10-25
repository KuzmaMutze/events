import {
  AuthClient,
  LoginUserData,
  CreateUserData,
} from '@integrations/events';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AUTH_CLIENT } from '../constants';

@Controller('/api/auth')
export class AuthController {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: AuthClient) {}

  @Post('login')
  login(@Body() userData: LoginUserData) {
    return this.authClient.login(userData);
  }

  @Post('registration')
  registration(@Body() userData: CreateUserData) {
    return this.authClient.registration(userData);
  }
}
