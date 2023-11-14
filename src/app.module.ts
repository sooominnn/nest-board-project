import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './boards/board/module/board.module';
import { CommentModule } from './boards/comment/module/comment.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule, CommentModule],
  // controllers: [BoardController],
  // providers: [BoardService],
})
export class AppModule {}
