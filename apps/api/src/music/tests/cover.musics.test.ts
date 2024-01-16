import {
  app,
  mockDataMusic,
  musicService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('PATH /api/musics/:id/cover/{upload} | Upload and get Music Cover File', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  beforeEach(async () => {
    await musicService.removeAllMusic();
  });

  it('GET /api/musics/:id/cover | should find the music and get the image cover file', async () => {
    const result = await musicService.create({
      name: mockDataMusic.name,
      releaseDate: mockDataMusic.releaseDate,
    });
    const musicId = result._id;
    const uploadRes = await request(app.getHttpServer())
      .patch(`/musics/${musicId}/cover/upload`)
      .attach(
        'coverImageFileName',
        'assets/mock-data/musics-cover/android-chrome-512x512.png'
      );

    expect(uploadRes.status).toBe(200);
    expect(uploadRes.body.data.coverImageFileName).toBeDefined();

    const res = await request(app.getHttpServer()).get(
      `/musics/${musicId}/cover`
    );
    expect(res.body.stream.path).toBeDefined();
  });

  it('PATCH /api/musics/:id/cover/upload | should find the music and upload the file successfully', async () => {
    const result = await musicService.create({
      name: mockDataMusic.name,
      releaseDate: mockDataMusic.releaseDate,
    });
    const musicId = result._id;
    const res = await request(app.getHttpServer())
      .patch(`/musics/${musicId}/cover/upload`)
      .attach(
        'coverImageFileName',
        'assets/mock-data/musics-cover/android-chrome-512x512.png'
      );

    expect(res.status).toBe(200);
    expect(res.body.data.coverImageFileName).toBeDefined();
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
