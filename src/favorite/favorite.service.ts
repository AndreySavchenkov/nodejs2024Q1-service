import { Injectable } from '@nestjs/common';
import { dbService } from 'src/db/db.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly dbService: dbService) {}

  getAll() {
    return this.dbService.findAllFavorites();
  }

  addArtist(id: string) {
    this.dbService.addArtistInFavorite(id);
  }

  addAlbum(id: string) {
    this.dbService.addAlbumInFavorites(id);
  }

  addTrack(id: string) {
    this.dbService.addTrackInFavorites(id);
  }

  deleteArtist(id: string) {
    this.dbService.deleteArtistFromFavorites(id);
  }

  deleteAlbum(id: string) {
    this.dbService.deleteAlbumFromFavorites(id);
  }

  deleteTrack(id: string) {
    this.dbService.deleteTrackFromFavorites(id);
  }
}
