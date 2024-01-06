import { AppModule } from '../app/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CreateMusicDto } from './dto/create-music.dto';
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
    if (!process.env.INSIDE_ACTION_RUNNER)
      mongoMemoryServerSetup();
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
  }, 50000);

  const createdMusic = {
    name: 'Music #1',
    fileName: 'Music #1 file path',
    releaseDate: new Date(),
  };

  describe('POST /api/v1/music | Music creation', () => {
    it('should throw error if file is not provided', async () => {
      const res = await request(app.getHttpServer())
        .post('/music')
        .send({ name: 'Music without file' } as CreateMusicDto);
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('No file uploaded');
    });
    it('should throw error if file is not an audio', async () => {
      const res = await request(app.getHttpServer())
        .post('/music')
        .attach('file', 'assets/mock-data/non-audio-file.png')
        .field('name', 'Non music file');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        'Only audio files (mp3, ogg, m4a) are allowed!'
      );
    });
    it('should create music and upload file', async () => {
      const res = await request(app.getHttpServer())
        .post('/music')
        .attach('file', 'assets/mock-data/audio-file.mp3')
        .field('name', 'Music');
      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Music was successfully created');
    });
  });

  describe('GET /api/v1/music/file/:id | Get music file', () => {
    it('should find the music and get the file to play', async () => {
      musicService.removeAllMusic();

      const resForSetup = await request(app.getHttpServer())
        .post('/music')
        .attach('file', 'assets/mock-data/audio-file.mp3')
        .field('name', 'Music');

      const musicId = resForSetup.body.data.id;

      const res = await request(app.getHttpServer()).get(
        `/music/file/${musicId}`
      );
      expect(res.body.stream.path).toBeDefined();
    });
  });

  describe('GET /api/v1/music | Find and get all musics', () => {
    it('should return 3 music', async () => {
      await musicService.removeAllMusic();
      await musicService.create({
        name: 'Music #1',
        fileName: 'Music #1 file path',
        releaseDate: new Date(Date.now()),
      });
      await musicService.create({
        name: 'Music #2',
        fileName: 'Music #2 file path',
        releaseDate: new Date(Date.now()),
      });
      await musicService.create({
        name: 'Music #3',
        fileName: 'Music #3 file path',
        releaseDate: new Date(Date.now()),
      });
      const res = await request(app.getHttpServer()).get('/music');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(3);
    });
  });

  describe('GET /api/v1/music/:id | Get music file', () => {
    it('should retrieve a music by ID (findOne)', async () => {
      await musicService.removeAllMusic();
      const result = await musicService.create({
        name: createdMusic.name,
        fileName: createdMusic.fileName,
        releaseDate: createdMusic.releaseDate,
      });
      const musicId = result._id;

      const res = await request(app.getHttpServer()).get(`/music/${musicId}`);

      expect(res.body.data.name).toBe(createdMusic.name);
      expect(res.body.data.fileName).toBe(createdMusic.fileName);
    });
  });

  describe('PATCH /api/v1/music/:id | Update music data', () => {
    it('should update a music by ID (update)', async () => {
      await musicService.removeAllMusic();
      const result = await musicService.create({
        name: createdMusic.name,
        fileName: createdMusic.fileName,
        releaseDate: createdMusic.releaseDate,
      });
      const musicId = result._id;

      const res = await request(app.getHttpServer())
        .patch(`/music/${musicId}`)
        .send({
          name: createdMusic.name + ' (update)',
          fileName: createdMusic.fileName + ' (update)',
        });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/v1/music/:id | Remove music file', () => {
    it('should remove a music by ID (remove)', async () => {
      await musicService.removeAllMusic();
      const result = await musicService.create({
        name: createdMusic.name,
        fileName: createdMusic.fileName,
        releaseDate: createdMusic.releaseDate,
      });
      const musicId = result._id;

      const res = await request(app.getHttpServer()).delete(
        `/music/${musicId}`
      );
      expect(res.status).toBe(200);
    });
  });

  afterAll(async () => {
    await app.close();
    if (!process.env.INSIDE_ACTION_RUNNER)
      await mongoMemoryServerTeardown();
  });
});
