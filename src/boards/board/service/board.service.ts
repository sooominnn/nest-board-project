import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from '../board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/createBoardDto';
import { BoardStatus } from '../board-status.enum';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { UserService } from '../../../auth/user/user.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    private readonly userService: UserService,
  ) {}

  // 특정 게시글 조회
  async getBoardById(boardId: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { boardId } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${boardId}`);
    }

    return found;
  }

  // 게시글 전체 조회
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find({
      order: {
        isNotice: 'DESC', // 공지글 첫번째
        date: 'ASC', // 일반글 순서대채
      },
    });
  }

  // 게시글 생성
  // async createBoard(createBoardPostDto: CreateBoardDto): Promise<InsertResult> {
  //   console.log(createBoardPostDto instanceof CreateBoardDto);
  //   console.log(22222);
  //   console.log(createBoardPostDto);
  //   const boardEntity: Board = createBoardPostDto.toEntity();
  //   console.log(1212);
  //   return await this.boardRepository.insert(boardEntity);
  // }

  // 게시글 생성
  async createBoard(
    userId: number,
    createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    const user = await this.userService.getUserById(userId);
    console.log('User:', user);
    const isNotice = user.status === 'admin';
    console.log('가나다라');
    const { title, writer, description, date } = createBoardDto;
    console.log(title, writer, description, date, userId);

    const board = new Board();
    board.title = title;
    board.writer = writer;
    board.description = description;
    board.date = date;
    board.status = BoardStatus.PUBLIC;
    board.userId = userId;
    board.isNotice = isNotice;
    // const board = this.boardRepository.create({
    //   title,
    //   writer,
    //   description,
    //   date,
    //   status: BoardStatus.PUBLIC,
    //   userId,
    //   isNotice,
    // });
    console.log(12);

    await this.boardRepository.save(board);
    return board;
  }

  // 게시글 삭제 - remove, delete / remove: 무조건 존재하는 아이템을 지워야함. 아니면 에러 발생(404), delete: 아이템 존재하면 지우고 아니면 아무런 영향 없음.
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  // 게시글 수정
  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.getBoardById(id);

    // board 엔터티의 내용을 업데이트
    board.title = updateBoardDto.title;
    board.description = updateBoardDto.description;

    // 업데이트된 board를 저장
    await this.boardRepository.save(board);

    return board;
  }

  // 게시글 상태 수정
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
