import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid, validate } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

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

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  findById(id: string): Omit<User, 'password'> {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...rest } = user;

    const userWithoutPassword: Omit<User, 'password'> = { ...rest };

    return userWithoutPassword;
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
