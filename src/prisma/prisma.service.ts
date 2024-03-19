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
    return this.prisma.user.create({ data });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  //FIXME: change type
  async updatePassword(id: string, dto: any) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: dto.password,
        version: dto.version,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  /* ARTIST */

  //FIXME: change type
  async createArtist(data: any) {
    return this.prisma.artist.create({ data });
  }

  async getAllArtists() {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    return this.prisma.artist.findUnique({
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
    return this.prisma.artist.delete({ where: { id } });
  }

  /* TRACK */

  //FIXME: change type
  async createTrack(data: any) {
    return await this.prisma.track.create({ data });
  }

  async getAllTracks() {
    return this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    return this.prisma.track.findUnique({
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
    return this.prisma.track.delete({ where: { id } });
  }

  /* ALBUM */

  //FIXME: change type
  async createAlbum(data: any) {
    return await this.prisma.album.create({ data });
  }

  async getAllAlbums() {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    return this.prisma.album.findUnique({
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
    return this.prisma.album.delete({ where: { id } });
  }

  async onClose() {
    await this.prisma.$disconnect();
  }
}
