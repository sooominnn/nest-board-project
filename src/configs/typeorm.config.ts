import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../boards/board/board.entity';
import { Comment } from '../boards/comment/entity/comment.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js}', Board, Comment],
  synchronize: true,
};