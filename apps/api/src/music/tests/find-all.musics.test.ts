import {
  app,
  musicService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/musics | Find and get all musics', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  beforeEach(async () => {
    await musicService.removeAllMusic();
  });

  it('should return 3 music', async () => {
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

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
