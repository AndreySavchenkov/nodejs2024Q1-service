import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    this.artists.push({
      id: uuid(),
      name,
      grammy,
    });
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artist = this.artists.find((track) => track.id === id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists[artistIndex] = {
      id: this.artists[artistIndex].id,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists.splice(artistIndex, 1);
  }
}
