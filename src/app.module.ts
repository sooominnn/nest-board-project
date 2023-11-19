import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './boards/board/module/board.module';
import { CommentModule } from './boards/comment/module/comment.module';
import { BoardHeartModule } from './boards/boardHeart/module/boardHeart.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardModule,
    CommentModule,
    BoardHeartModule,
    AuthModule,
  ],
})
export class AppModule {}
