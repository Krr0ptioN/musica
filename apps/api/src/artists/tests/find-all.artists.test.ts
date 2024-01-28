import {
  app,
  artistsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/musics | Find and get all musics', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should return 3 music', async () => {
    await artistsService.create({
      name: 'artist #1',
    });
    await artistsService.create({
      name: 'artist #2',
      releaseDate: new Date(Date.now()),
    });
    const res = await request(app.getHttpServer()).get('/artists');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
