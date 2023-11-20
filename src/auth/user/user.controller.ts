import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('member')
export class UserController {
  constructor(private userService: UserService) {}

  // 전체 회원 조회
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // 특정 회원 조회
  @Get('/:userId')
  getUserById(@Param('userId') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }
}
