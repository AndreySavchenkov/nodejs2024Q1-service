import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid, validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    const artist = { id: uuid(), name, grammy };

    try {
      await this.prismaService.createArtist(artist);
      return artist;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.prismaService.getAllArtists();
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artist = await this.prismaService.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artist = await this.prismaService.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    const newArtistInfo = {
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };

    await this.prismaService.updateArtist(id, newArtistInfo);

    const updatedArtist = await this.prismaService.getArtistById(id);

    return updatedArtist;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artist = await this.prismaService.getArtistById(id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    await this.prismaService.deleteArtist(id);

    //TODO: delete from favorites
    // const artistIndexInFavorites = this.favorites.artists.findIndex(
    //   (artist) => artist.id === id,
    // );

    // if (artistIndexInFavorites !== -1) {
    //   this.favorites.artists.splice(artistIndexInFavorites, 1);
    // }

    //TODO: artistId: null in tracks
    // for (let i = this.tracks.length - 1; i >= 0; i--) {
    //   if (this.tracks[i].artistId === id) {
    //     this.tracks[i].artistId = null;
    //   }
    // }

    //TODO: artistId: null in albums
    // for (let i = this.albums.length - 1; i >= 0; i--) {
    //   if (this.albums[i].artistId === id) {
    //     this.albums[i].artistId = null;
    //   }
    // }
  }
}
