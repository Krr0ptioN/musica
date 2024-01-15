import {
  app,
  mockDataPlaylist,
  playlistsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('DELETE /api/playlists/:id | Remove playlist', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should remove a playlists by ID (remove)', async () => {
    const result = await playlistsService.create({ ...mockDataPlaylist });
    const playlistId = result._id;
    const res = await request(app.getHttpServer()).delete(
      `/playlists/${playlistId}`
    );
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
