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
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Response } from 'express';
import { dbService } from 'src/db/db.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly dbService: dbService,
    private prismaService: PrismaService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json(user).send();
    return user;
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    if (!validate(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const user = await this.prismaService.getUserById(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    if (user.password !== dto.oldPassword) {
      res.status(HttpStatus.FORBIDDEN).send();
      return;
    }

    const updatedUser = await this.userService.updatePassword(id, dto);

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
