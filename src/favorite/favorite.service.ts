import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';
import { validate } from 'uuid';

@Injectable()
export class FavoriteService {
  private readonly favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };

  getAll() {
    return this.favorites;
  }

  addArtist(id: string) {
    this.favorites.artists.push(id);
  }

  addAlbum(id: string) {
    this.favorites.albums.push(id);
  }

  addTrack(id: string) {
    this.favorites.tracks.push(id);
  }

  deleteArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }
    const artistIndex = this.favorites.artists.findIndex(
      (artist) => artist === id,
    );

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.favorites.artists.splice(artistIndex, 1);
  }

  deleteAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }
    const albumIndex = this.favorites.albums.findIndex((album) => album === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.favorites.albums.splice(albumIndex, 1);
  }

  deleteTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }
    const trackIndex = this.favorites.tracks.findIndex((track) => track === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.favorites.tracks.splice(trackIndex, 1);
  }
}
