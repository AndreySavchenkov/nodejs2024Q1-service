import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';
import { isNumber, isString, isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createTrackDto).length === 4 &&
        'name' in createTrackDto &&
        'artistId' in createTrackDto &&
        'albumId' in createTrackDto &&
        'duration' in createTrackDto
      ) ||
      !isString(createTrackDto.name) ||
      !(
        isString(createTrackDto.artistId) || createTrackDto.artistId === null
      ) ||
      !(isString(createTrackDto.albumId) || createTrackDto.albumId === null) ||
      !isNumber(createTrackDto.duration)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = await this.trackService.create(createTrackDto);

    res.status(HttpStatus.CREATED).json(track).send();
  }

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const track = await this.trackService.findOne(id);
    if (track) {
      res.status(HttpStatus.OK).json(track).send();
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    if (
      !(
        Object.keys(updateTrackDto).length === 4 &&
        'name' in updateTrackDto &&
        'artistId' in updateTrackDto &&
        'albumId' in updateTrackDto &&
        'duration' in updateTrackDto
      ) ||
      !isString(updateTrackDto.name) ||
      !(
        isString(updateTrackDto.artistId) || updateTrackDto.artistId === null
      ) ||
      !(isString(updateTrackDto.albumId) || updateTrackDto.albumId === null) ||
      !isNumber(updateTrackDto.duration)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = await this.prismaService.getTrackById(id);

    if (!track) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    await this.trackService.update(id, updateTrackDto);

    const updatedTrack = await this.prismaService.getTrackById(id);

    res.status(HttpStatus.OK).json(updatedTrack).send();

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
