import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from './interfaces/user.interface';
import { v4 as uuid, validate } from 'uuid';

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

  findById(id: string): User {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Update the user's password
    this.users[userIndex].password = dto.newPassword;
    this.users[userIndex].updatedAt = Date.now();
    this.users[userIndex].version++;
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(userIndex, 1); // Remove the user from the array
  }
}
