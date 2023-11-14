import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  writer: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  status: string;

  @Index()
  @Column()
  boardId: number;
}
