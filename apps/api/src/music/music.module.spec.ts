import { AppModule } from '../app/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import {
  mongoMemoryServerSetup,
  mongoMemoryServerTeardown,
} from '../utils/mongodb-memory-server';
import { MusicService } from './music.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MUSIC_SCHEMA_MODEL, MusicSchema } from '@musica/database-models';

describe('Music Module', () => {
  let app: INestApplication;
  let musicService: MusicService;

  beforeAll(async () => {
    // NOTE: Disable mongodb-memory-server in case the test were
    // executed in Github Action runner.
    if (!process.env.INSIDE_ACTION_RUNNER) {
      mongoMemoryServerSetup();
    }

    jest.resetModules();

    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([
          { name: MUSIC_SCHEMA_MODEL, schema: MusicSchema },
        ]),
      ],
      providers: [MusicService],
    }).compile();

    musicService = moduleRef.get<MusicService>(MusicService);

    app = moduleRef.createNestApplication();
    await app.init();
  }, 90000);

  const mockDataMusic1 = {
    name: 'Music #1',
    releaseDate: new Date(),
  };

  describe('POST /api/musics | Music creation', () => {
    it('should create music and upload file', async () => {
      musicService.removeAllMusic();
      const res = await request(app.getHttpServer())
        .post('/musics')
        .send({ name: 'Music', releaseDate: new Date(Date.now()) });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Music was successfully created');
    });
  });

  describe('Upload and get Music File', () => {
    it('GET /api/musics/:id/file | should find the music and get the file to play', async () => {
      musicService.removeAllMusic();
      const resForCreation = await request(app.getHttpServer())
        .post('/musics')
        .send({ name: 'Music', releaseDate: new Date(Date.now()) });
      const musicId = resForCreation.body.data.id;
      await request(app.getHttpServer())
        .patch(`/musics/${musicId}/file/upload`)
        .attach(
          'musicAudioFileName',
          'assets/mock-data/musics-mp3/TESTING-MOCK-DATA-1MB-MP3.mp3'
        );
      const res = await request(app.getHttpServer()).get(
        `/musics/${musicId}/file`
      );
      expect(res.body.stream.path).toBeDefined();
    });

    it('POST /api/musics/:id/upload | should find the music and upload the file successfully', async () => {
      musicService.removeAllMusic();

      const resForCreation = await request(app.getHttpServer())
        .post('/musics')
        .send({ name: 'Music', releaseDate: new Date(Date.now()) });
      const musicId = resForCreation.body.data.id;

      const res = await request(app.getHttpServer())
        .patch(`/musics/${musicId}/file/upload`)
        .attach(
          'musicAudioFileName',
          'assets/mock-data/musics-mp3/TESTING-MOCK-DATA-1MB-MP3.mp3'
        );

      expect(res.status).toBe(200);
      expect(res.body.data.musicAudioFileName).toBeDefined();
    });
  });

  describe('Upload and get Music Cover Image File', () => {
    it('GET /api/musics/:id/cover | should find the music and get the image cover file', async () => {
      musicService.removeAllMusic();

      const resForCreation = await request(app.getHttpServer())
        .post('/musics')
        .send({ name: 'Music', releaseDate: new Date(Date.now()) });
      const musicId = resForCreation.body.data.id;
      await request(app.getHttpServer())
        .patch(`/musics/${musicId}/cover/upload`)
        .attach(
          'coverImageFileName',
          'assets/mock-data/musics-cover/android-chrome-512x512.png'
        );

      const res = await request(app.getHttpServer()).get(
        `/musics/${musicId}/cover`
      );
      expect(res.body.stream.path).toBeDefined();
    });

    it('POST /api/musics/:id/upload | should find the music and upload the file successfully', async () => {
      musicService.removeAllMusic();

      const resForCreation = await request(app.getHttpServer())
        .post('/musics')
        .send({ name: 'Music', releaseDate: new Date(Date.now()) });
      const musicId = resForCreation.body.data.id;
      const res = await request(app.getHttpServer())
        .patch(`/musics/${musicId}/cover/upload`)
        .attach(
          'coverImageFileName',
          'assets/mock-data/musics-cover/android-chrome-512x512.png'
        );

      expect(res.status).toBe(201);
      expect(res.body.data.coverImageFileName).toBeDefined();
    });
  });

  describe('GET /api/musics | Find and get all musics', () => {
    it('should return 3 music', async () => {
      await musicService.removeAllMusic();
      await musicService.create({
        name: 'Music #1',
        releaseDate: new Date(Date.now()),
        coverImageFileName: 'music1-cover.png',
        musicAudioFileName: 'music1-audio.mp3',
      });
      await musicService.create({
        name: 'Music #2',
        releaseDate: new Date(Date.now()),
        coverImageFileName: 'music2-cover.png',
        musicAudioFileName: 'music2-audio.mp3',
      });
      const res = await request(app.getHttpServer()).get('/musics');
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
    });
  });

  describe('GET /api/musics/:id | Get music by id', () => {
    it('should retrieve a music by ID (findOne)', async () => {
      await musicService.removeAllMusic();
      const result = await musicService.create({
        name: mockDataMusic1.name,
        releaseDate: mockDataMusic1.releaseDate,
      });
      const musicId = result._id;

      const res = await request(app.getHttpServer()).get(`/musics/${musicId}`);

      expect(res.body.data.name).toBe(mockDataMusic1.name);
    });
  });

  describe('PATCH /api/musics/:id | Update music data', () => {
    it('should update a music by ID (update)', async () => {
      await musicService.removeAllMusic();
      const result = await musicService.create({
        name: mockDataMusic1.name,
        releaseDate: mockDataMusic1.releaseDate,
      });
      const musicId = result._id;

      const res = await request(app.getHttpServer())
        .put(`/musics/${musicId}`)
        .send({
          name: mockDataMusic1.name + ' (update)',
        });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/musics/:id | Remove music file', () => {
    it('should remove a music by ID (remove)', async () => {
      await musicService.removeAllMusic();
      const result = await musicService.create({
        name: mockDataMusic1.name,
        releaseDate: mockDataMusic1.releaseDate,
      });
      const musicId = result._id;
      await request(app.getHttpServer())
        .patch(`/musics/${musicId}/file/upload`)
        .attach(
          'musicAudioFileName',
          'assets/mock-data/musics-mp3/TESTING-MOCK-DATA-1MB-MP3.mp3'
        );

      await request(app.getHttpServer())
        .patch(`/musics/${musicId}/cover/upload`)
        .attach(
          'coverImageFileName',
          'assets/mock-data/musics-cover/android-chrome-512x512.png'
        );

      const res = await request(app.getHttpServer()).delete(
        `/musics/${musicId}`
      );
      expect(res.status).toBe(200);
    });
  });

  afterAll(async () => {
    await app.close();
    if (!process.env.INSIDE_ACTION_RUNNER) await mongoMemoryServerTeardown();
  });
});
