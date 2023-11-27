import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/createBoardDto';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
import { BoardStatus } from '../board-status.enum';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @Post('/:userId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Param('userId') userId: number,
  ): Promise<Board> {
    console.log('11');
    return this.boardService.createBoard(userId, createBoardDto);
  }

  // 게시글 삭제
  @Delete('/:boardId')
  deleteBoard(@Param('boardId', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  // 게시글 수정
  @Patch('/:boardId/update')
  updateBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardService.updateBoard(boardId, updateBoardDto);
  }

  // 게시글 상태 수정
  @Patch('/:boardId/status')
  updateBoardStatus(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(boardId, status);
  }
}
