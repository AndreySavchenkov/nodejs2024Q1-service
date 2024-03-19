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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Response } from 'express';
import { isNumber, isString, isUUID } from 'class-validator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createAlbumDto).length === 3 &&
        'name' in createAlbumDto &&
        'year' in createAlbumDto &&
        'artistId' in createAlbumDto
      ) ||
      !isString(createAlbumDto.name) ||
      !isNumber(createAlbumDto.year) ||
      !(isString(createAlbumDto.artistId) || createAlbumDto.artistId === null)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = await this.albumService.create(createAlbumDto);
    res.status(HttpStatus.CREATED).json(album).send();
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    if (
      !(
        Object.keys(updateAlbumDto).length === 3 &&
        'name' in updateAlbumDto &&
        'year' in updateAlbumDto &&
        'artistId' in updateAlbumDto
      ) ||
      !isString(updateAlbumDto.name) ||
      !isNumber(updateAlbumDto.year) ||
      !(isString(updateAlbumDto.artistId) || updateAlbumDto.artistId === null)
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const updatedAlbum = await this.albumService.update(id, updateAlbumDto);

    res.status(HttpStatus.OK).json(updatedAlbum).send();

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(id);
  }
}
