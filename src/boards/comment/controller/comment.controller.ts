import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentService } from '../service/comment.service';
import { CommentStatusValidationPipe } from '../pipes/comment-status-validation.pipe';
import { CommentStatus } from '../comment-status.enum';
import { Comment } from '../entity/comment.entity';

@Controller('boards/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  // 해당 게시물 댓글 조회
  @Get('/:boardId')
  getCommentByBoardId(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<Comment[]> {
    return this.commentService.getCommentByBoardId(boardId);
  }

  // 댓글 생성
  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(createCommentDto);
  }

  // 댓글 삭제
  @Delete('/commentId')
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    return this.commentService.deleteComment(commentId);
  }

  // 댓글 내용 수정

  // 댓글 상태 수정
  @Patch('/commentId/status')
  updateCommentStatus(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body('status', CommentStatusValidationPipe) status: CommentStatus,
  ) {
    return this.commentService.updateCommentStatus(commentId, status);
  }
}
