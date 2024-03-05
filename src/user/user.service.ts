import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './interfaces/user.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(user: CreateUserDto) {
    this.users.push({
      login: user.login,
      password: user.password,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  findAll(): User[] {
    return this.users;
  }
}
