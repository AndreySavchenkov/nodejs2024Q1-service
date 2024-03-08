import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    this.tracks.push({
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
    });
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.tracks[trackIndex] = {
      id: this.tracks[trackIndex].id,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    };
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.tracks.splice(trackIndex, 1);
  }
}
