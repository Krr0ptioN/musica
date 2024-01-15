import {
  app,
  mockDataPlaylist,
  playlistsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('PUT /api/playlists/:id | Update playlists data', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should update a playlists by ID (update)', async () => {
    const result = await playlistsService.create({ ...mockDataPlaylist });
    const musicId = result._id;

    const res = await request(app.getHttpServer())
      .put(`/musics/${musicId}`)
      .send({
        name: mockDataPlaylist.name + ' (update)',
      });

    expect(res.status).toBe(200);
  });
  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
