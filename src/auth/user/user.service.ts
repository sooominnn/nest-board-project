import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  // 전체 회원 조회
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 특정 회원 조회
  async getUserById(userId: number): Promise<User> {
    const found = await this.userRepository.findOne({ where: { userId } });

    if (!found) {
      throw new NotFoundException(`Can't find User with id ${userId}`);
    }
    return found;
  }
}
