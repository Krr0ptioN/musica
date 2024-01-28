import {
  app,
  mockDataPlaylist,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('POST /api/playlists | Music creation', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should create music and upload file', async () => {
    const res = await request(app.getHttpServer())
      .post('/playlists')
      .send({ ...mockDataPlaylist });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Playlist was successfully created');
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
