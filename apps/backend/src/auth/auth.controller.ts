import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { LoginUserInput } from 'src/users/inputs/login.user.input';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userInput: LoginUserInput) {
    return this.authService.login(userInput);
  }

  @Post('/registration')
  registration(@Body() createUserInput: CreateUserInput) {
    return this.authService.registration(createUserInput);
  }
}
