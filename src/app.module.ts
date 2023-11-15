import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './boards/board/module/board.module';
import { CommentModule } from './boards/comment/module/comment.module';
import { BoardHeartModule } from './boards/boardHeart/module/boardHeart.module';
import { BoardHeart } from './boards/boardHeart/boardHeart.entity';
import { Board } from './boards/board/board.entity';
import { Comment } from './boards/comment/entity/comment.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    Board,
    BoardHeart,
    Comment,
    BoardModule,
    CommentModule,
    BoardHeartModule,
  ],
})
export class AppModule {}
