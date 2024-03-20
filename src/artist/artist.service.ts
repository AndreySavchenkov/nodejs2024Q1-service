import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { dbService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: dbService) {}

  create(createArtistDto: CreateArtistDto) {
    this.dbService.createArtist(createArtistDto);
  }

  findAll() {
    return this.dbService.findAllArtist();
  }

  findOne(id: string) {
    return this.dbService.findArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    this.dbService.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    this.dbService.removeArtist(id);
  }
}
