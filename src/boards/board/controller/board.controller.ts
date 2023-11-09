import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { Board, BoardStatus } from '../entity/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
@Controller('/boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 게시글 전체 조회
  @Get('/')
  getAllBoards(): Board[] {
    return this.boardService.getAllBoards();
  }

  // 게시글 상세 조회
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  // 게시글 생성
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  // 게시글 공개/비공개 상태 수정
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }

  // 게시글 삭제
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardService.deleteBoard(id);
  }
}
