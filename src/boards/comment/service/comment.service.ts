import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from '../comment.repository';
import { Comment } from '../entity/comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentStatus } from '../comment-status.enum';
import { BoardService } from '../../board/service/board.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    private readonly boardService: BoardService,
  ) {}

  // 해당 게시물 댓글 조회
  async getCommentByBoardId(boardId: number): Promise<Comment[]> {
    await this.boardService.getBoardById(boardId);

    return this.commentRepository.find();
  }

  // 댓글 생성
  // async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
  //   return this.commentRepository.createComment(createCommentDto);
  // }

  // 댓글 생성
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    // 유효성 검사: boardId가 존재하는지
    if (!createCommentDto.boardId) {
      throw new BadRequestException('boardId is required');
    }

    // 유효성 검사: boardId가 유효한지 확인
    await this.boardService.getBoardById(createCommentDto.boardId);

    // 댓글 생성
    const comment = this.commentRepository.createComment(createCommentDto);

    return comment;
  }

  // 댓글 삭제
  async deleteComment(commentId: number): Promise<void> {
    const result = await this.commentRepository.delete(commentId);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Comment with id ${commentId}`);
    }
  }

  // 특정 댓글 조회
  getCommentById(commentId: number) {
    const found = this.commentRepository.findOne({ where: { commentId } });

    if (!found) {
      throw new NotFoundException(`Can't find Comment with id ${commentId}`);
    }

    return found;
  }

  // 댓글 상태 수정
  async updateCommentStatus(
    commentId: number,
    status: CommentStatus,
  ): Promise<Comment> {
    const comment = await this.getCommentById(commentId);

    comment.status = status;
    await this.commentRepository.save(comment);

    return comment;
  }
}
