import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  BadRequestException,
  UnprocessableEntityException,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { validate } from 'uuid';
import { TrackService } from 'src/track/track.service';

@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @Get()
  findAll() {
    const favorites = this.favoriteService.getAll();
    const { artists, tracks, albums } = favorites;

    const allArtists = this.artistService.findAll();
    const favoriteArtists = allArtists.filter((artist) =>
      artists.includes(artist.id),
    );

    const allAlbums = this.albumService.findAll();
    const favoriteAlbums = allAlbums.filter((album) =>
      albums.includes(album.id),
    );

    const allTracks = this.trackService.findAll();
    const favoriteTracks = allTracks.filter((track) =>
      tracks.includes(track.id),
    );

    return {
      artists: favoriteArtists,
      tracks: favoriteTracks,
      albums: favoriteAlbums,
    };
  }

  @Post('/albums/:id')
  addAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const allAlbums = this.albumService.findAll();

    const albumIndex = allAlbums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new UnprocessableEntityException(
        `The album with an id ${id} does not exist.`,
      );
    }
    return this.favoriteService.addAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const allArtists = this.artistService.findAll();

    const artistIndex = allArtists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new UnprocessableEntityException(
        `The artist with an id ${id} does not exist.`,
      );
    }

    return this.favoriteService.addArtist(id);
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const allTracks = this.trackService.findAll();

    const trackIndex = allTracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new UnprocessableEntityException(
        `The track with an id ${id} does not exist.`,
      );
    }

    return this.favoriteService.addTrack(id);
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
