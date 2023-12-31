import {
  BaseEntity,
  Column,
  CreateDateColumn,
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
  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @Column()
  status: string;

  @Index()
  @Column()
  boardId: number;

  @Index()
  @Column()
  userId: number;
}
