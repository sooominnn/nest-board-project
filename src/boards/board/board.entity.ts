import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
