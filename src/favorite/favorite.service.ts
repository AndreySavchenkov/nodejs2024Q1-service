import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const favoriteArtists = await this.prismaService.getFavoriteArtists();
    const favoriteTracks = await this.prismaService.getFavoriteTracks();
    const favoriteAlbums = await this.prismaService.getFavoriteAlbums();

    const favorite = {
      tracks: favoriteTracks.map((track) => track.track),
      albums: favoriteAlbums.map((album) => album.album),
      artists: favoriteArtists.map((artist) => artist.artist),
    };

    return favorite;
  }

  async addArtist(id: string) {
    await this.prismaService.addArtistToFavorite(id);
    return await this.prismaService.getArtistById(id);
  }

  async addAlbum(id: string) {
    await this.prismaService.addAlbumToFavorite(id);
    return await this.prismaService.getAlbumById(id);
  }

  async addTrack(id: string) {
    await this.prismaService.addTrackToFavorite(id);
    return await this.prismaService.getTrackById(id);
  }

  async deleteArtist(id: string) {
    return await this.prismaService.deleteArtistFromFavorites(id);
  }

  async deleteAlbum(id: string) {
    return await this.prismaService.deleteAlbumFromFavorites(id);
  }

  async deleteTrack(id: string) {
    return await this.prismaService.deleteTrackFromFavorites(id);
  }
}
