import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Max,
  Min,
  validate,
  validateOrReject,
} from 'class-validator';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'Admin' | 'User';
}
