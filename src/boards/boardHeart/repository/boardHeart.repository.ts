import { CustomRepository } from '../../typeorm-ex.decorator';
import { BoardHeart } from '../boardHeart.entity';
import { Repository } from 'typeorm';

@CustomRepository(BoardHeart)
export class BoardHeartRepository extends Repository<BoardHeart> {}
