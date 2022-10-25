import { Controller, Get } from '@nestjs/common';
import { UserData } from '@ngi/common';
import { User } from './user.decorator';

@Controller('/auth')
export class UserController {
  @Get('/user')
  getUser(@User() user: UserData) {
    return user;
  }
}
