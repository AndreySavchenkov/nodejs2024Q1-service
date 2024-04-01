import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const newId = uuid();

    const newUserInfo = {
      login: signupDto.login,
      password: signupDto.password,
      id: newId,
      version: 1,
      //FIXME:  fix on date
      createdAt: 1,
      updatedAt: 1,
    };
    return this.prismaService.createUser(newUserInfo);
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;
    const user = await this.prismaService.getUserByLogin(login);

    if (!user) {
      throw new UnauthorizedException('Can not find a user');
    }

    // const isPasswordValid = await compare(password, user.password);
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Passwords not compare');
    }

    const accessToken = await this.generateAccessToken(user.id, user.login);
    const refreshToken = ''; // generate refresh token if needed

    return { accessToken, refreshToken };
  }

  async generateAccessToken(userId: string, login: string): Promise<string> {
    const payload = { userId, login };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async validateUser(userId: string): Promise<any> {
    return this.prismaService.getUserById(userId);
  }
}
