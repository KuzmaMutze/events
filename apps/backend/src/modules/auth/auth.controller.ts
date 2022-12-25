import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/utils/pipes/validation.pipe';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { AuthUserDto } from 'src/modules/users/dtos/authUser.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() authData: AuthUserDto) {
    return this.authService.login(authData);
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() user: UserDto) {
    return this.authService.registration(user);
  }
}
