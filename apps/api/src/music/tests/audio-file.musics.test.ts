import {
  app,
  mockDataMusic,
  musicService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('PATH /api/musics/:id/file/{upload} | Upload and get Music File', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  beforeEach(async () => {
    await musicService.removeAllMusic();
  });

  it('GET /api/musics/:id/file | should find the music and get the file to play', async () => {
    const result = await musicService.create({
      name: mockDataMusic.name,
      releaseDate: mockDataMusic.releaseDate,
    });
    const musicId = result._id;
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

  it('PATCH /api/musics/:id/upload | should find the music and upload the file successfully', async () => {
    const result = await musicService.create({
      name: mockDataMusic.name,
      releaseDate: mockDataMusic.releaseDate,
    });
    const musicId = result._id;
    const res = await request(app.getHttpServer())
      .patch(`/musics/${musicId}/file/upload`)
      .attach(
        'musicAudioFileName',
        'assets/mock-data/musics-mp3/TESTING-MOCK-DATA-1MB-MP3.mp3'
      );

    expect(res.status).toBe(200);
    expect(res.body.data.musicAudioFileName).toBeDefined();
  });
  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
