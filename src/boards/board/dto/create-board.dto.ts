import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  writer: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: string;
}
