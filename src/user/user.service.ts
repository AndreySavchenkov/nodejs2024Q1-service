import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { dbService } from 'src/db/db.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: dbService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(user: CreateUserDto) {
    const newId = uuid();

    const now = Date.now();

    const newUserInfo = {
      login: user.login,
      password: user.password,
      id: newId,
      version: 1,
      //TODO:  fix on date
      createdAt: 1,
      updatedAt: 1,
    };

    try {
      await this.prismaService.createUser(newUserInfo);

      const createdUser = await this.prismaService.getUserById(newId);

      delete createdUser.password;

      return createdUser;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return this.prismaService.getAllUsers();
    } catch (err) {
      console.log(err);
    }
  }

  async findById(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const user = await this.prismaService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const user = await this.prismaService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const newUserDto = {
      password: dto.newPassword,
      version: ++user.version,
      //TODO: fix on date
      updatedAt: ++user.updatedAt,
    };

    await this.prismaService.updatePassword(id, newUserDto);

    const newUser = await this.prismaService.getUserById(id);

    delete newUser.password;

    return newUser;
  }

  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const user = await this.prismaService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.prismaService.delete(id);
  }
}
