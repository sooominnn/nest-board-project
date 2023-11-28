import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  boardId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  writer: string;

  @IsNotEmpty()
  description: string;
}
