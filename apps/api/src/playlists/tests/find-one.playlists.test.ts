import {
  app,
  mockDataPlaylist,
  playlistsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/playlists/:id | Get playlist by id', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should retrieve a playlist by ID (findOne)', async () => {
    const result = await playlistsService.create({ ...mockDataPlaylist });
    const musicId = result._id;

    const res = await request(app.getHttpServer()).get(`/playlists/${musicId}`);

    expect(res.body.data.name).toBe(mockDataPlaylist.name);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
