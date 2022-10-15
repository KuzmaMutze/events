import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
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

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() createUserInput: CreateUserInput) {
    return this.authService.registration(createUserInput);
  }
}
