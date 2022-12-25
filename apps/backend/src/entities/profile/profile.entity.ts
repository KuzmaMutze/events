import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { App } from './app.entity';
import { Common } from './common.entity';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn({})
  profileId: number;

  @Column()
  email: string;

  @Column()
  applicationName: string;

  @Column('simple-json')
  profile: Common | App;
}
