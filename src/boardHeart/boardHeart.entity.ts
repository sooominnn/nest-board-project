import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
@Entity()
export class BoardHeart {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  boardId: number;

  // 좋아요 상태 필드
  @Column({ default: false })
  isHearted: boolean;
}
