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
import { UpdateCommentDto } from '../dto/update-comment.dto';

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
    console.log('댓글 생성-boardId 존재여부-service');
    // 유효성 검사: boardId가 존재하는지
    if (!createCommentDto.boardId) {
      throw new BadRequestException('boardId is required');
    }
    console.log('댓글 생성-boardId 존재여부 확인 완료-service');

    // 유효성 검사: boardId가 유효한지 확인
    await this.boardService.getBoardById(createCommentDto.boardId);
    console.log('유효성 검사-service');

    // 댓글 생성
    const comment = this.commentRepository.createComment(createCommentDto);
    console.log('댓글 생성-댓글 저장완료-service');

    return comment;
  }

  // 댓글 삭제
  async deleteComment(commentId: number): Promise<void> {
    const result = await this.commentRepository.delete(commentId);

    console.log('댓글 삭제-service');
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Comment with id ${commentId}`);
    }
  }

  // 특정 댓글 조회
  async getCommentById(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { commentId },
    });

    if (!comment) {
      // 댓글을 찾지 못한 경우 예외
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    return comment;
  }

  // 댓글 수정
  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    console.log('댓글 수정 확인 콘솔~-service');

    const comment = await this.getCommentById(id);
    console.log('댓글 수정-getCommentById-service');

    comment.description = updateCommentDto.description;

    await this.commentRepository.save(comment);
    console.log('댓글 수정 완료-service');
    return comment;
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
