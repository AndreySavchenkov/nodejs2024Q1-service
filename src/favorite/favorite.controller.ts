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

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll(@Res() res: Response) {
    const favorites = this.favoriteService.getAll();
    res.status(HttpStatus.OK).json(favorites).send();
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.favoriteService.addAlbum(id);

    if (!album) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    res.status(HttpStatus.CREATED).send();
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.favoriteService.addArtist(id);

    if (!artist) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    res.status(HttpStatus.CREATED).send();
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const track = this.favoriteService.addTrack(id);

    if (!track) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
      return;
    }

    res.status(HttpStatus.CREATED).send();
  }

  @Delete('/artist/:id')
  deleteArtist(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const artist = this.favoriteService.deleteArtist(id);

    if (!artist) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/album/:id')
  deleteAlbum(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const album = this.favoriteService.deleteAlbum(id);

    if (!album) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

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
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
