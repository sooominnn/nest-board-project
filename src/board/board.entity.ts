import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn
} from "typeorm";

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
  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @Column()
  status: string;

  @Index()
  @Column()
  userId: number;

  @Column({ default: false })
  isNotice: boolean; // 공지글 여부
}
