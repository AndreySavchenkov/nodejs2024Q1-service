import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Response } from 'express';
import { dbService } from 'src/db/db.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly dbService: dbService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json(user).send();
    return;
  }

  @Get()
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Omit<User, 'password'>> {
    return this.userService.findById(id);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    const user = this.dbService.findUserById(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    const passwordFromDB = this.dbService.getPassword(id);

    if (passwordFromDB !== dto.oldPassword) {
      res.status(HttpStatus.FORBIDDEN).send();
      return;
    }

    const updatedUser = this.userService.updatePassword(id, dto);

    if (updatedUser) {
      res.status(HttpStatus.OK).json(updatedUser).send();
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
