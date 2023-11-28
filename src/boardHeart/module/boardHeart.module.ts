import { Module } from '@nestjs/common';
import { BoardHeartRepository } from '../repository/boardHeart.repository';
import { BoardHeartController } from '../controller/boardHeart.controller';
import { BoardHeartService } from '../service/boardHeart.service';
import { BoardRepository } from '../../board/board.repository';
import { BoardModule } from '../../board/module/board.module';
import { TypeOrmExModule } from '../../typeorm-ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      BoardRepository,
      BoardHeartRepository,
    ]),
    BoardModule,
  ],
  controllers: [BoardHeartController],
  providers: [BoardHeartService],
})
export class BoardHeartModule {}
