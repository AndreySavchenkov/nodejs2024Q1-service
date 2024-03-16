import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { dbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private readonly dbService: dbService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.dbService.createTrack(createTrackDto);
  }

  findAll() {
    return this.dbService.findAllTracks();
  }

  findOne(id: string) {
    return this.dbService.findTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.dbService.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    this.dbService.removeTrack(id);
  }
}
