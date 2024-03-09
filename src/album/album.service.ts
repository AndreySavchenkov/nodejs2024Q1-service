import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;
    this.albums.push({
      id: uuid(),
      name,
      year,
      artistId,
    });
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.albums[albumIndex] = {
      id: this.albums[albumIndex].id,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const albumId = this.albums.findIndex((album) => album.id === id);

    if (albumId === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.albums.splice(albumId, 1);
  }
}
