import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /* USER */

  //FIXME: change type
  async createUser(data: any) {
    return await this.prisma.user.create({ data });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByLogin(login: string) {
    return await this.prisma.user.findFirst({
      where: {
        login,
      },
    });
  }

  //FIXME: change type
  async updatePassword(id: string, dto: any) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        password: dto.password,
        version: dto.version,
        updatedAt: dto.updatedAt,
      },
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  /* ARTIST */

  //FIXME: change type
  async createArtist(data: any) {
    return await this.prisma.artist.create({ data });
  }

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    return await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
  }

  //FIXME: change type
  async updateArtist(id: string, dto: any) {
    return await this.prisma.artist.update({
      where: { id },
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
  }

  async deleteArtist(id: string) {
    return await this.prisma.artist.delete({ where: { id } });
  }

  /* TRACK */

  //FIXME: change type
  async createTrack(data: any) {
    return await this.prisma.track.create({ data });
  }

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    return await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
  }

  //FIXME: change type
  async updateTrack(id: string, dto: any) {
    return await this.prisma.track.update({
      where: { id },
      data: {
        name: dto.name,
        artistId: dto.artistId,
        duration: dto.duration,
        albumId: dto.albumId,
      },
    });
  }

  async deleteTrack(id: string) {
    return await this.prisma.track.delete({ where: { id } });
  }

  /* ALBUM */

  //FIXME: change type
  async createAlbum(data: any) {
    return await this.prisma.album.create({ data });
  }

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    return await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
  }

  //FIXME: change type
  async updateAlbum(id: string, dto: any) {
    return await this.prisma.album.update({
      where: { id },
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
      },
    });
  }

  async deleteAlbum(id: string) {
    return await this.prisma.album.delete({ where: { id } });
  }

  /* FAVORITES */

  async getFavoriteArtists() {
    return await this.prisma.favoriteArtist.findMany({
      include: {
        artist: true,
      },
    });
  }

  async getFavoriteAlbums() {
    return await this.prisma.favoriteAlbum.findMany({
      include: {
        album: true,
      },
    });
  }

  async getFavoriteTracks() {
    return await this.prisma.favoriteTrack.findMany({
      include: {
        track: true,
      },
    });
  }

  async addArtistToFavorite(id: string) {
    return await this.prisma.favoriteArtist.create({
      data: {
        id,
        artistId: id,
      },
    });
  }

  async deleteArtistFromFavorites(artistId: string) {
    return await this.prisma.favoriteArtist.delete({ where: { id: artistId } });
  }

  async addAlbumToFavorite(id: string) {
    return await this.prisma.favoriteAlbum.create({
      data: {
        id,
        albumId: id,
      },
    });
  }

  async deleteAlbumFromFavorites(albumId: string) {
    return await this.prisma.favoriteAlbum.delete({ where: { id: albumId } });
  }

  async addTrackToFavorite(id: string) {
    return await this.prisma.favoriteTrack.create({
      data: {
        id,
        trackId: id,
      },
    });
  }

  async deleteTrackFromFavorites(trackId: string) {
    return await this.prisma.favoriteTrack.delete({ where: { id: trackId } });
  }

  async onClose() {
    await this.prisma.$disconnect();
  }
}
