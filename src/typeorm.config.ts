import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Board } from './board/board.entity';
import { BoardHeart } from './boardHeart/boardHeart.entity';
import { User } from './auth/user/user.entity';
import { Comment } from './comment/entity/comment.entity';

dotenv.config(); // .env 파일에서 환경 변수 로드

export const typeORMConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    __dirname + '/**/*.entity.ts',
    __dirname + '/**/*.entity.js',
    Board,
    Comment,
    BoardHeart,
    User,
  ],
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
};
