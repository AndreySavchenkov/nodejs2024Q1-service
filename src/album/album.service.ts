import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { dbService } from 'src/db/db.service';
import { v4 as uuid, validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly dbService: dbService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;

    const album = {
      id: uuid(),
      name,
      year,
      artistId: artistId || null,
    };

    await this.prismaService.createAlbum(album);

    return album;
  }

  findAll() {
    return this.prismaService.getAllAlbums();
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const album = await this.prismaService.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const album = await this.prismaService.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    const newAlbum = {
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };

    await this.prismaService.updateAlbum(id, newAlbum);

    return newAlbum;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const album = await this.prismaService.getAlbumById(id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    await this.prismaService.deleteAlbum(id);

    //TODO:delete from favorites
    // const albumIndexInFavorites = this.favorites.albums.findIndex(
    //   (album) => album.id === id,
    // );

    // if (albumIndexInFavorites !== -1) {
    //   this.favorites.albums.splice(albumIndexInFavorites, 1);
    // }

    //TODO:albumId: null in tracks
    // for (let i = this.tracks.length - 1; i >= 0; i--) {
    //   if (this.tracks[i].albumId === id) {
    //     this.tracks[i].albumId = null;
    //   }
    // }
  }
}
