import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column()
  title: string;

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
  userId: number;

  @Column({ default: false })
  isNotice: boolean; // 공지글 여부
}
