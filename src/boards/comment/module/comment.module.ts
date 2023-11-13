import { TypeOrmExModule } from '../../typeorm-ex.module';
import { Module } from '@nestjs/common';
import { CommentController } from '../controller/comment.controller';
import { CommentRepository } from '../comment.repository';
import { CommentService } from '../service/comment.service';
import { BoardService } from '../../board/service/board.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([CommentRepository])],
  controllers: [CommentController],
  providers: [BoardService, CommentService],
})
export class CommentModule {}
