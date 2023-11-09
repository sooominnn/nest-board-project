import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './boards/board/module/board.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule],
  // controllers: [BoardController],
  // providers: [BoardService],
})
export class AppModule {}
