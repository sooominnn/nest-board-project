import { Module } from '@nestjs/common';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from '../board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
