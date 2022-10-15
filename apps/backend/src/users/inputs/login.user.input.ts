import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserInput {
  @IsString({ message: 'Need to be string' })
  @IsEmail({}, { message: 'Need to be email' })
  email: string;
  @IsString({ message: 'Need to be string' })
  @Length(4, 16, { message: 'Need to be 4 to 16 symbols' })
  password: string;
}
