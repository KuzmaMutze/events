import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt.auth.guard';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { UserService } from 'src/modules/users/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Post('/create')
  async registration(@Body() user: UserDto): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }
}
