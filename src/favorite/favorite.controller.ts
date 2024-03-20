import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.getAll();
  }

  @Post('/albums/:id')
  addAlbum(@Param('id') id: string) {
    this.favoriteService.addAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    this.favoriteService.addArtist(id);
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    this.favoriteService.addTrack(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.favoriteService.deleteArtist(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.favoriteService.deleteAlbum(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.favoriteService.deleteTrack(id);
  }
}
