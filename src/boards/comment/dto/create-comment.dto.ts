import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  writer: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: Date;
}
