import { Injectable } from '@nestjs/common';
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

  create(user: CreateUserDto) {
    const newUser = {
      login: user.login,
      password: user.password,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.prismaService.createUser(newUser);

    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  findAll() {
    return this.dbService.findAllUsers();
  }

  findById(id: string) {
    return this.dbService.findUserById(id);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    return this.dbService.updatePassword(id, dto);
  }

  delete(id: string) {
    return this.dbService.deleteUser(id);
  }
}
