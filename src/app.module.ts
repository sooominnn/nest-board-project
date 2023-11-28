import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './typeorm.config';
import { BoardModule } from './board/module/board.module';
import { CommentModule } from './comment/module/comment.module';
import { BoardHeartModule } from './boardHeart/module/boardHeart.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardModule,
    CommentModule,
    BoardHeartModule,
    AuthModule,
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
