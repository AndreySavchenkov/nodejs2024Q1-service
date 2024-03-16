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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';
import { isBoolean, isString } from 'class-validator';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createArtistDto).length === 2 &&
        'name' in createArtistDto &&
        'grammy' in createArtistDto
      ) ||
      !isString(createArtistDto.name) ||
      !isBoolean(createArtistDto.grammy)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.artistService.create(createArtistDto);
    console.log(`artist name --->>> ${artist.name}`);
    res.status(HttpStatus.CREATED).json(artist).send();
    return artist;
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    const updatedArtist = this.artistService.update(id, updateArtistDto);
    res.status(HttpStatus.OK).json(updatedArtist).send();
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
