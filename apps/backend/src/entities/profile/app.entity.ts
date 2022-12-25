import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profile_app')
export class App {
  @Column()
  settings: string;

  @Column()
  version: number;

  @Column()
  lastUpdated: string;
}
