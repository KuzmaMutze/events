import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserEntity } from 'src/entities/user.entity';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { UserService } from 'src/users/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Post('/create')
  async registration(
    @Body() createUserInput: CreateUserInput
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserInput);
  }
}
