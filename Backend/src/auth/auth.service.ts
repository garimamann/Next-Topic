import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { authSignupDto } from './dto/authSignup.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { authSigninDto } from './dto/authSignin.dto';
import { Token } from './token.type';
import { UserToken } from './userToken.type';
import { UserType } from './user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  async signup(
    name: string,
    email: string,
    password: string,
    isTeacher: string,
  ): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    if (isTeacher === 'true') {
      user.isTeacher = true;
    } else {
      user.isTeacher = false;
    }

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async signin(email: string, password: string): Promise<UserToken> {
    let userToken: UserToken = { isTeacher: false, token: '' };
    const user = await User.findOne({ email });
    const isPass = await user.validatePassword(password);
    if (!user || !isPass) {
      throw new UnauthorizedException('invalid credentails');
    }
    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);
    userToken.isTeacher = user.isTeacher;
    userToken.token = accessToken;
    return userToken;
  }
}
