import {
  app,
  mockDataMusic,
  musicService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('DELETE /api/musics/:id | Remove music', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  });

  beforeEach(async () => {
    await musicService.removeAllMusic();
  });

  it('should remove a music by ID (remove)', async () => {
    const result = await request(app.getHttpServer())
      .post(`/musics`)
      .send({ ...mockDataMusic });

    const musicId = result.body.data.id;
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

    const res = await request(app.getHttpServer()).delete(`/musics/${musicId}`);
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
