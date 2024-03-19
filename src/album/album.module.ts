import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from 'src/db/db.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [DbModule, PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
