import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { UpdateUserInput } from 'src/users/inputs/update.user.input';
import { UserService } from 'src/users/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(
    @Body() createUserInput: CreateUserInput
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserInput);
  }

  @Post('/update')
  async updateUser(
    @Body() updateUserInput: UpdateUserInput
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserInput);
  }

  @Get('/getUser')
  async getOneUser(id: number): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }

  @Get('/getUsers')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }
}
