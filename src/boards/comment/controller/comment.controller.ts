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
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Controller('/boards/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  // 해당 게시물 댓글 조회
  @Get('/:boardId')
  getCommentByBoardId(@Param('boardId') boardId: number): Promise<Comment[]> {
    console.log(222);
    return this.commentService.getCommentByBoardId(boardId);
  }

  // 댓글 생성
  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    console.log('댓글생성');
    return this.commentService.createComment(createCommentDto);
  }

  // 댓글 삭제
  @Delete('/:commentId')
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    return this.commentService.deleteComment(commentId);
  }

  // 댓글 수정
  @Patch('/:commentId/update')
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.updateComment(commentId, updateCommentDto);
  }

  // 댓글 상태 수정
  @Patch('/:commentId/status')
  updateCommentStatus(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body('status', CommentStatusValidationPipe) status: CommentStatus,
  ) {
    return this.commentService.updateCommentStatus(commentId, status);
  }
}
