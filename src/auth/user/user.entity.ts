import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  password: string;

  @Column({ default: 'member' }) // admin or member
  status: string;
}
