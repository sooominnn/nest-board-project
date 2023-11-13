import { Module } from '@nestjs/common';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { BoardRepository } from '../board.repository';
import { TypeOrmExModule } from '../../typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
