import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/createBoardDto';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
import { BoardStatus } from '../board-status.enum';
@Controller('/boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  // 게시글 상세 조회
  @Get('/:boardId')
  getBoardById(@Param('boardId') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  // 게시글 전체 조회
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  // 게시글 생성
  // @Post()
  // createBoard(
  //   @Body() createBoardPostDto: CreateBoardDto,
  // ): Promise<InsertResult> {
  //   return this.boardService.createBoard(createBoardPostDto);
  // }

  // 게시글 생성
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  // 게시글 삭제
  @Delete('/:boardId')
  deleteBoard(@Param('boardId', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  // 게시글 내용 수정

  // 게시물 상태 수정
  @Patch('/:boardId/status')
  updateBoardStatus(
    @Param('boardId', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, status);
  }
}
