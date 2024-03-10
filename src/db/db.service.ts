import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorite/entities/favorite.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class dbService {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly tracks: Track[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  createUser(user: CreateUserDto): void {
    this.users.push({
      login: user.login,
      password: user.password,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }

  findAllUsers(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  findUserById(id: string): Omit<User, 'password'> {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...rest } = user;

    const userWithoutPassword: Omit<User, 'password'> = { ...rest };

    return userWithoutPassword;
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users[userIndex].password = dto.newPassword;
    this.users[userIndex].updatedAt = Date.now();
    this.users[userIndex].version++;
  }

  deleteUser(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    this.artists.push({
      id: uuid(),
      name,
      grammy,
    });
  }

  findAllArtist() {
    return this.artists;
  }

  findArtistById(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artist = this.artists.find((track) => track.id === id);

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
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

  removeArtist(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.artists.splice(artistIndex, 1);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    this.tracks.push({
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
    });
  }

  findAllTracks() {
    return this.tracks;
  }

  findTrackById(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
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

  removeTrack(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.tracks.splice(trackIndex, 1);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;
    this.albums.push({
      id: uuid(),
      name,
      year,
      artistId: artistId || null,
    });
  }

  findAllAlbums() {
    return this.albums;
  }

  findAlbumById(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
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

  removeAlbum(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const albumId = this.albums.findIndex((album) => album.id === id);

    if (albumId === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.albums.splice(albumId, 1);
  }

  findAllFavorites() {
    // return this.favorites;
    // const favorites = this.favoriteService.getAll();
    const { artists, tracks, albums } = this.favorites;

    const allArtists = this.findAllArtist();
    const favoriteArtists = allArtists.filter((artist) =>
      artists.includes(artist.id),
    );

    const allAlbums = this.findAllAlbums();
    const favoriteAlbums = allAlbums.filter((album) =>
      albums.includes(album.id),
    );

    const allTracks = this.findAllTracks();
    const favoriteTracks = allTracks.filter((track) =>
      tracks.includes(track.id),
    );

    return {
      artists: favoriteArtists,
      tracks: favoriteTracks,
      albums: favoriteAlbums,
    };
  }

  addArtistInFavorite(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const allArtists = this.findAllArtist();

    const artistIndex = allArtists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      throw new UnprocessableEntityException(
        `The artist with an id ${id} does not exist.`,
      );
    }

    this.favorites.artists.push(id);
  }

  addAlbumInFavorites(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const allAlbums = this.findAllAlbums();

    const albumIndex = allAlbums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new UnprocessableEntityException(
        `The album with an id ${id} does not exist.`,
      );
    }

    this.favorites.albums.push(id);
  }

  addTrackInFavorites(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const allTracks = this.findAllTracks();

    const trackIndex = allTracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new UnprocessableEntityException(
        `The track with an id ${id} does not exist.`,
      );
    }

    this.favorites.tracks.push(id);
  }

  deleteArtistFromFavorites(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }
    const artistIndex = this.favorites.artists.findIndex(
      (artist) => artist === id,
    );

    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    this.favorites.artists.splice(artistIndex, 1);
  }

  deleteAlbumFromFavorites(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }
    const albumIndex = this.favorites.albums.findIndex((album) => album === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    this.favorites.albums.splice(albumIndex, 1);
  }

  deleteTrackFromFavorites(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }
    const trackIndex = this.favorites.tracks.findIndex((track) => track === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    this.favorites.tracks.splice(trackIndex, 1);
  }
}
