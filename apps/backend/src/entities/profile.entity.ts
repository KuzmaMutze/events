import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn({})
  profileId: number;

  @Column()
  username: string;

  @Column()
  applicationName: string;

  @Column()
  state: string;
}
