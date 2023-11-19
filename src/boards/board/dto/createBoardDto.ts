import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  userId: number;

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
