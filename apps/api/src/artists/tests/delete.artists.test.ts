import {
  app,
  artistsService,
  mockDataArtist,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('DELETE /api/artists/:id | Remove music', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 1000000);

  it('should remove an artist by ID (remove)', async () => {
    const result = await artistsService.create({
      name: mockDataArtist.name,
    });
    const artistId = result._id;
    const res = await request(app.getHttpServer()).delete(
      `/artists/${artistId}`
    );
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
