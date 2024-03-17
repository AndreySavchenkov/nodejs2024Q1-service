// prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: any) {
    return this.prisma.user.create({
      data,
    });
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

  async updatePassword(id: string, dto: any) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: dto.password,
        version: dto.version,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async onClose() {
    await this.prisma.$disconnect();
  }
}
