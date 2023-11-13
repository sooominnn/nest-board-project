import { CustomRepository } from '../typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { CommentStatus } from './comment-status.enum';
import { CreateCommentDto } from './dto/create-comment.dto';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { writer, description, date } = createCommentDto;
    const comment = this.create({
      writer,
      description,
      date,
      status: CommentStatus.PUBLIC,
    });

    await this.save(comment);
    return comment;
  }
}
