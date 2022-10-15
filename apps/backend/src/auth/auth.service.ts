import {
  Post,
  Body,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserData } from '@ngi/common';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserInput } from 'src/users/inputs/login.user.input';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(@Body() userInput: LoginUserInput) {
    const user = await this.userService.getUserByEmail(userInput.email);
    const validUser = await this.validateUser({
      ...userInput,
      name: user.name,
      role: user.role,
    });
    return this.generateToken(validUser);
  }

  async registration(userInput: CreateUserInput) {
    const candidate = await this.userService.getUserByEmail(userInput.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userInput.password, 5);
    const user = await this.userService.createUser({
      ...userInput,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async validateUser(userInput: CreateUserInput) {
    const user = await this.userService.getUserByEmail(userInput.email);
    const passwordEquals = await bcrypt.compare(
      userInput.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }

  private async generateToken(userInput: UserEntity) {
    const payload = {
      email: userInput.email,
      role: userInput.role,
      name: userInput.name,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
