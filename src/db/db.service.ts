import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
  // private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly tracks: Track[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  // createUser(user: CreateUserDto) {
  //   const newUser = {
  //     login: user.login,
  //     password: user.password,
  //     id: uuid(),
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };

  //   this.users.push(newUser);
  //   const { password, ...userWithoutPassword } = newUser;

  //   return userWithoutPassword;
  // }

  // findAllUsers(): Omit<User, 'password'>[] {
  //   return this.users.map(({ password, ...rest }) => rest);
  // }

  // findUserById(id: string): Omit<User, 'password'> {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Id not UUID type');
  //   }

  //   const user = this.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }

  //   const { password, ...rest } = user;

  //   return rest;
  // }

  // getPassword(id: string) {
  //   const user = this.users.find((user) => user.id === id);
  //   return user.password;
  // }

  // updatePassword(id: string, dto: UpdatePasswordDto) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Id not UUID type');
  //   }

  //   const userIndex = this.users.findIndex((user) => user.id === id);

  //   if (userIndex === -1) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }

  //   this.users[userIndex].password = dto.newPassword;
  //   // this.users[userIndex].updatedAt = Date.now();
  //   this.users[userIndex].version++;

  //   const user = this.users[userIndex];
  //   const { password, ...userWithoutPassword } = user;
  //   return userWithoutPassword;
  // }

  // deleteUser(id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Id not UUID type');
  //   }

  //   const userIndex = this.users.findIndex((user) => user.id === id);

  //   if (userIndex === -1) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }

  //   this.users.splice(userIndex, 1);
  // }

  // createArtist(createArtistDto: CreateArtistDto) {
  //   const { name, grammy } = createArtistDto;

  //   const artist = { id: uuid(), name, grammy };
  //   this.artists.push(artist);

  //   return artist;
  // }

  // findAllArtist() {
  //   return this.artists;
  // }

  // findArtistById(id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Id not UUID type');
  //   }

  //   const artist = this.artists.find((track) => track.id === id);

  //   if (!artist) {
  //     throw new NotFoundException(`Artist with id ${id} not found`);
  //   }

  //   return artist;
  // }

  // updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Id not UUID type');
  //   }

  //   const artistIndex = this.artists.findIndex((artist) => artist.id === id);

  //   if (artistIndex === -1) {
  //     throw new NotFoundException(`Artist with id ${id} not found`);
  //   }

  //   const newArtistInfo = {
  //     id: this.artists[artistIndex].id,
  //     name: updateArtistDto.name,
  //     grammy: updateArtistDto.grammy,
  //   };

  //   this.artists[artistIndex] = newArtistInfo;

  //   return newArtistInfo;
  // }

  // async removeArtist(id: string) {
  //   if (!validate(id)) {
  //     throw new BadRequestException('Id not UUID type');
  //   }

  //   const artist = await this.artists.findIndex((artist) => artist.id === id);

  //   if (artistIndex === -1) {
  //     throw new NotFoundException(`Artist with id ${id} not found`);
  //   }

  //   this.artists.splice(artistIndex, 1);

  //   //delete from favorites
  //   const artistIndexInFavorites = this.favorites.artists.findIndex(
  //     (artist) => artist.id === id,
  //   );

  //   if (artistIndexInFavorites !== -1) {
  //     this.favorites.artists.splice(artistIndexInFavorites, 1);
  //   }

  //   //artistId: null in tracks
  //   for (let i = this.tracks.length - 1; i >= 0; i--) {
  //     if (this.tracks[i].artistId === id) {
  //       this.tracks[i].artistId = null;
  //     }
  //   }

  //   //artistId: null in albums
  //   for (let i = this.albums.length - 1; i >= 0; i--) {
  //     if (this.albums[i].artistId === id) {
  //       this.albums[i].artistId = null;
  //     }
  //   }
  // }

  createTrack(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const track = {
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
    };
    this.tracks.push(track);
    return track;
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

  getTrackForUpdate(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('Id not UUID type');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    const updatedTrack = {
      id: this.tracks[trackIndex].id,
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    };

    this.tracks[trackIndex] = updatedTrack;

    return updatedTrack;
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

    //delete from favorites
    const trackIndexInFavorites = this.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (trackIndexInFavorites !== -1) {
      this.favorites.tracks.splice(trackIndexInFavorites, 1);
    }
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;

    const album = {
      id: uuid(),
      name,
      year,
      artistId: artistId || null,
    };

    this.albums.push(album);

    return album;
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

    const newAlbum = {
      id: this.albums[albumIndex].id,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };

    this.albums[albumIndex] = newAlbum;

    return newAlbum;
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

    //delete from favorites
    const albumIndexInFavorites = this.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (albumIndexInFavorites !== -1) {
      this.favorites.albums.splice(albumIndexInFavorites, 1);
    }

    //albumId: null in tracks
    for (let i = this.tracks.length - 1; i >= 0; i--) {
      if (this.tracks[i].albumId === id) {
        this.tracks[i].albumId = null;
      }
    }
  }

  findAllFavorites() {
    return this.favorites;
  }

  addArtistInFavorite(id: string): Artist | undefined {
    const artist = this.artists.find((artist) => artist.id === id);

    if (artist) {
      this.favorites.artists = [...this.favorites.artists, artist];
    }

    return artist;
  }

  addAlbumInFavorites(id: string): Album | undefined {
    const album = this.albums.find((album) => album.id === id);

    if (album) {
      this.favorites.albums = [...this.favorites.albums, album];
    }

    return album;
  }

  addTrackInFavorites(id: string): Track | undefined {
    const track = this.tracks.find((track) => track.id === id);

    if (track) {
      this.favorites.tracks = [...this.favorites.tracks, track];
    }

    return track;
  }

  deleteArtistFromFavorites(id: string): Artist | undefined {
    const index = this.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      return undefined;
    }

    const artist = this.favorites.artists[index];
    this.favorites.artists.splice(index, 1);

    return artist;
  }

  deleteAlbumFromFavorites(id: string): Album | undefined {
    const index = this.favorites.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      return undefined;
    }

    const album = this.favorites.albums[index];
    this.favorites.albums.splice(index, 1);

    return album;
  }

  deleteTrackFromFavorites(id: string): Track | undefined {
    const index = this.favorites.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      return undefined;
    }

    const track = this.favorites.tracks[index];
    this.favorites.tracks.splice(index, 1);

    return track;
  }
}
