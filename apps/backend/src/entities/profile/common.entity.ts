import { Column, Entity } from 'typeorm';

@Entity('profile_common')
export class Common {
  @Column()
  theme: string;

  @Column()
  version: number;

  @Column()
  lastUpdated: string;
}
