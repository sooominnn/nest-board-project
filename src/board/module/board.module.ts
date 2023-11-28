import { Module } from '@nestjs/common';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { BoardRepository } from '../board.repository';
import { TypeOrmExModule } from '../../typeorm-ex.module';
import { UserRepository } from '../../auth/user/user.repository';
import { UserService } from '../../auth/user/user.service';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository, UserRepository]),
    AuthModule,
  ],

  controllers: [BoardController],
  providers: [BoardService, UserService, AuthService, JwtService],
})
export class BoardModule {}
