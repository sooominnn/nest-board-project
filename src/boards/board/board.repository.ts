import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from '../typeorm-ex.decorator';
import { CreateBoardDto } from './dto/createBoardDto';
import { BoardStatus } from './board-status.enum';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, writer, description, date, userId } = createBoardDto;
    const board = this.create({
      title,
      writer,
      description,
      date,
      status: BoardStatus.PUBLIC,
      userId,
    });

    await this.save(board);
    return board;
  }
}
