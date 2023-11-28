import { TypeOrmExModule } from '../../typeorm-ex.module';
import { Module } from '@nestjs/common';
import { CommentController } from '../controller/comment.controller';
import { CommentRepository } from '../comment.repository';
import { CommentService } from '../service/comment.service';
import { UserRepository } from '../../auth/user/user.repository';
import { UserService } from '../../auth/user/user.service';
import { BoardService } from '../../board/service/board.service';
import { BoardRepository } from '../../board/board.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      CommentRepository,
      BoardRepository,
      UserRepository,
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, BoardService, UserService],
})
export class CommentModule {}
