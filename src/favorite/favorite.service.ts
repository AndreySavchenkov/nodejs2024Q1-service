import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artist/entities/artist.entity';
import { dbService } from 'src/db/db.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly dbService: dbService) {}

  getAll() {
    return this.dbService.findAllFavorites();
  }

  addArtist(id: string): Artist | undefined {
    return this.dbService.addArtistInFavorite(id);
  }

  addAlbum(id: string) {
    return this.dbService.addAlbumInFavorites(id);
  }

  addTrack(id: string) {
    return this.dbService.addTrackInFavorites(id);
  }

  deleteArtist(id: string) {
    return this.dbService.deleteArtistFromFavorites(id);
  }

  deleteAlbum(id: string) {
    return this.dbService.deleteAlbumFromFavorites(id);
  }

  deleteTrack(id: string) {
    return this.dbService.deleteTrackFromFavorites(id);
  }
}
