import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { dbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: dbService) {}

  create(user: CreateUserDto) {
    return this.dbService.createUser(user);
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
