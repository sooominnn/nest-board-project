import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from '../entity/board.entity';
import { v4 as uuid } from 'uuid';
import { CreateBoardDto } from '../dto/create-board.dto';

@Injectable()
export class BoardService {
  private board: Board[] = [];

  getAllBoards(): Board[] {
    return this.board;
  }

  // 게시글 생성
  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description, writer, date } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      writer,
      date,
      status: BoardStatus.PUBLIC,
    };
    this.board.push(board);
    return board;
  }

  // 게시글 상세 조회
  getBoardById(id: string): Board {
    const found = this.board.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  // 게시글 공개/비공개 상태 수정
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  // 게시글 삭제
  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.board = this.board.filter((board) => board.id !== found.id);
  }
}
