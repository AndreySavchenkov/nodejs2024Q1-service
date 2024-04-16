import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuid, validate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    try {
      const { name, artistId, albumId, duration } = createTrackDto;
      const track = {
        id: uuid(),
        name,
        artistId,
        albumId,
        duration,
      };

      await this.prismaService.createTrack(track);

      return track;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.prismaService.getAllTracks();
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const track = await this.prismaService.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.prismaService.updateTrack(id, updateTrackDto);
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const track = await this.prismaService.getTrackById(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    await this.prismaService.deleteTrack(id);

    //TODO: delete from favorites
    // const trackIndexInFavorites = this.favorites.tracks.findIndex(
    //   (track) => track.id === id,
    // );

    // if (trackIndexInFavorites !== -1) {
    //   this.favorites.tracks.splice(trackIndexInFavorites, 1);
    // }
  }
}
