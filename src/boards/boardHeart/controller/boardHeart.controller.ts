// import { Controller, Post } from "@nestjs/common";
//
// @Controller('/boards')
// export class BoardHeartController {
//   constructor(private boardHeartService: BoardHeartService) {}
//
//   // 게시물 좋아요
//   @Post('/:boardId/heart')
//
// }

import { Controller, Param, Post } from '@nestjs/common';
import { BoardHeartService } from '../service/boardHeart.service';
@Controller('hearts')
export class BoardHeartController {
  constructor(private readonly boardHeartService: BoardHeartService) {}

  @Post('/:boardId/toggle')
  async toggleHeart(
    @Param('boardId') boardId: number,
  ): Promise<{ hearted: boolean }> {
    const hearted = await this.boardHeartService.toggleHeart(boardId);
    return { hearted };
  }
}
