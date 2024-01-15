import {
  app,
  playlistsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/playlists | Find and get all playlists', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should return 3 music', async () => {
    await playlistsService.create({
      name: 'Playlist #1',
    });
    await playlistsService.create({
      name: 'Playlist #2',
    });
    const res = await request(app.getHttpServer()).get('/playlists');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
