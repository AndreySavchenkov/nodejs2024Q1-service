import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

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

  async onClose() {
    await this.prisma.$disconnect();
  }
}
