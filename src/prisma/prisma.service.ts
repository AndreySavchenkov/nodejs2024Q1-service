// prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: User) {
    return this.prisma.user.create({
      data,
    });
  }

  async onClose() {
    await this.prisma.$disconnect();
  }
}
