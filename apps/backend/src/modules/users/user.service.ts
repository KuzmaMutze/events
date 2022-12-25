import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(user: UserDto): Promise<UserEntity> {
    return await this.userRepository.save({ ...user });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
