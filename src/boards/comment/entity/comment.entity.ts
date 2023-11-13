import { BaseEntity, Column, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from '../../board/board.entity';

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
