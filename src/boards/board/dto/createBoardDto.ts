import { IsNotEmpty } from 'class-validator';
import { Board } from '../board.entity';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  writer: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: Date;

  // toEntity(): Board {
  //   console.log(445);
  //   const board = new Board();
  //   board.title = this.title;
  //   board.writer = this.writer;
  //   board.description = this.description;
  //   return board;
  // }
}
