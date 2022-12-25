import {
  Post,
  Body,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { UserService } from 'src/modules/users/user.service';
import * as bcrypt from 'bcryptjs';
import { AuthUserDto } from 'src/modules/users/dtos/authUser.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(@Body() authData: AuthUserDto) {
    const user = await this.userService.getUserByEmail(authData.email);
    const validUser = await this.validateUser({
      ...authData,
      name: user.name,
      role: user.role,
    });
    return this.generateToken(validUser);
  }

  async registration(user: UserDto) {
    const candidate = await this.userService.getUserByEmail(user.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(user.password, 5);
    const createdUser = await this.userService.createUser({
      ...user,
      password: hashPassword,
    });
    return this.generateToken(createdUser);
  }

  private async validateUser(user: UserDto) {
    const fetchedUser = await this.userService.getUserByEmail(user.email);
    const passwordEquals = await bcrypt.compare(
      user.password,
      fetchedUser.password
    );
    if (fetchedUser && passwordEquals) {
      return fetchedUser;
    }
    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }

  private async generateToken(user: UserEntity) {
    const payload = {
      email: user.email,
      role: user.role,
      name: user.name,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
