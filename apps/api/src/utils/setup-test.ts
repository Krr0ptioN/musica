import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MUSIC_SCHEMA_MODEL, MusicSchema } from '@musica/database-models';
import { MusicService } from '../music/music.service';
import {
  mongoMemoryServerSetup,
  mongoMemoryServerTeardown,
} from '../utils/mongodb-memory-server';
import { INestApplication } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { PlaylistsService } from '../playlists/playlists.service';

let app: INestApplication;
let musicService: MusicService;
let artistsService: ArtistsService;
let albumsService: AlbumsService;
let playlistsService: PlaylistsService;

export const setupTestEnvironment = async () => {
  if (process.env.INSIDE_ACTION_RUNNER === 'false') {
    mongoMemoryServerSetup();
  }

  jest.resetModules();

  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      MongooseModule.forFeature([
        { name: MUSIC_SCHEMA_MODEL, schema: MusicSchema },
      ]),
    ],
    providers: [MusicService],
  }).compile();

  musicService = moduleRef.get<MusicService>(MusicService);
  artistsService = moduleRef.get<ArtistsService>(ArtistsService);
  albumsService = moduleRef.get<AlbumsService>(AlbumsService);
  playlistsService = moduleRef.get<PlaylistsService>(PlaylistsService);
  app = moduleRef.createNestApplication();
  await app.init();

  await musicService.removeAllMusic();
  await artistsService.removeAllArtist();
  await albumsService.removeAllAlbum();
  await playlistsService.removeAllPlaylist();
};

export const tearDownTestEnvironment = async () => {
  await app.close();
  if (!process.env.INSIDE_ACTION_RUNNER) await mongoMemoryServerTeardown();
};

const mockDataMusic = {
  name: 'Music #1',
  releaseDate: new Date(),
};

const mockDataAlbum = {
  title: 'Album #1',
};

const mockDataPlaylist = {
  name: 'Playlist #1',
};

const mockDataArtist = {
  name: 'Playlist #1',
};

export {
  app,
  musicService,
  albumsService,
  playlistsService,
  artistsService,
  mockDataMusic,
  mockDataAlbum,
  mockDataArtist,
  mockDataPlaylist,
};
