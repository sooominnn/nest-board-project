import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from '../board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/createBoardDto';
import { BoardStatus } from '../board-status.enum';
import { CreateCommentDto } from "../../comment/dto/create-comment.dto";
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // 특정 게시물 조회
  async getBoardById(boardId: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { boardId } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${boardId}`);
    }

    return found;
  }

  // 게시글 전체 조회
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  // 게시물 생성
  // async createBoard(createBoardPostDto: CreateBoardDto): Promise<InsertResult> {
  //   console.log(createBoardPostDto instanceof CreateBoardDto);
  //   console.log(22222);
  //   console.log(createBoardPostDto);
  //   const boardEntity: Board = createBoardPostDto.toEntity();
  //   console.log(1212);
  //   return await this.boardRepository.insert(boardEntity);
  // }

  // 게시물 생성
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // 게시물 삭제 - remove, delete / remove: 무조건 존재하는 아이템을 지워야함. 아니면 에러 발생(404), delete: 아이템 존재하면 지우고 아니면 아무런 영향 없음.
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // 게시물 상태 수정
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
