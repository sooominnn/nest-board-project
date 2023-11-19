import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from '../../board/board.repository';
import { BoardHeartRepository } from '../repository/boardHeart.repository';

@Injectable()
export class BoardHeartService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(BoardHeartRepository)
    private boardHeartRepository: BoardHeartRepository,
  ) {}

  async toggleHeart(boardId: number): Promise<boolean> {
    await this.boardRepository.findOneOrFail({
      where: { boardId },
    });
    const existingHeart = await this.boardHeartRepository.findOne({
      where: { boardId },
    });

    if (existingHeart) {
      // 이미 좋아요한 경우, 좋아요 취소
      await this.boardHeartRepository.remove(existingHeart);
      return false; // 좋아요 취소됨
    } else {
      // 좋아요를 누르지 않은 경우, 좋아요 추가
      const newHeart = this.boardHeartRepository.create({
        boardId,
        isHearted: true,
      });
      await this.boardHeartRepository.save(newHeart);
      return true;
    }
  }
}
