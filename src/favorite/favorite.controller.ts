import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Response } from 'express';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async findAll(@Res() res: Response) {
    const favorites = await this.favoriteService.getAll();
    res.status(HttpStatus.OK).json(favorites).send();
  }

  @Post('/album/:id')
  async addAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = await this.prismaService.getAlbumById(id);

    if (!album) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoriteService.addAlbum(id);

    res.status(HttpStatus.CREATED).json(album).send();
  }

  @Post('/artist/:id')
  async addArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = await this.prismaService.getArtistById(id);

    if (!artist) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoriteService.addArtist(id);

    res.status(HttpStatus.CREATED).json(artist).send();
  }

  @Post('/track/:id')
  async addTrack(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = await this.prismaService.getTrackById(id);

    if (!track) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoriteService.addTrack(id);

    res.status(HttpStatus.CREATED).json(track).send();
  }

  @Delete('/artist/:id')
  async deleteArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = await this.prismaService.getArtistById(id);

    if (!artist) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoriteService.deleteArtist(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/album/:id')
  async deleteAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = await this.prismaService.getAlbumById(id);

    if (!album) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    await this.favoriteService.deleteAlbum(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/track/:id')
  deleteTrack(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.favoriteService.deleteTrack(id);

    if (!track) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
