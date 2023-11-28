import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user/user.entity';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { UserRepository } from './user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ message: string }> {
    try {
      const { username, password } = signUpCredentialsDto;

      const user = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);

      await this.userRepository.save(user);

      return { message: 'User successfully created !' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    const resp = await this.validateUserPassword(signInCredentialsDto);
    if (!resp) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = resp;
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: resp,
    };
  }

  public async validateUserPassword(
    signInCredentialDto: SignInCredentialsDto,
  ): Promise<JwtPayload> {
    const { username, password } = signInCredentialDto;
    const auth = await User.findOne({ where: { username } });

    if (auth && (await auth.validatePassword(password))) {
      return {
        username: auth.username,
      };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
