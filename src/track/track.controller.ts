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
import { dbService } from 'src/db/db.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly dbService: dbService,
  ) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
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

    const track = this.trackService.create(createTrackDto);

    res.status(HttpStatus.CREATED).json(track).send();
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const track = this.trackService.findOne(id);
    if (track) {
      res.status(HttpStatus.OK).json(track).send();
    }
  }

  @Put(':id')
  update(
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

    const track = this.dbService.getTrackForUpdate(id);

    if (!track) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    const updatedTrack = this.trackService.update(id, updateTrackDto);
    res.status(HttpStatus.OK).json(updatedTrack).send();

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
