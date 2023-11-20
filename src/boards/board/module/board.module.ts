import { Module } from '@nestjs/common';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { BoardRepository } from '../board.repository';
import { TypeOrmExModule } from '../../typeorm-ex.module';
import { UserRepository } from '../../../auth/user/user.repository';
import { UserService } from '../../../auth/user/user.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository, UserRepository]),
  ],
  controllers: [BoardController],
  providers: [BoardService, UserService],
})
export class BoardModule {}
