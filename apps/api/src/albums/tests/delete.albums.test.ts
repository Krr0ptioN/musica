import {
  app,
  mockDataMusic,
  mockDataArtist,
  albumsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
  artistsService,
} from '../../utils/setup-test';
import request from 'supertest';

describe('DELETE /api/albums/:id | Remove music', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should remove a album by ID (remove)', async () => {
    const artist = await artistsService.create({ ...mockDataArtist });
    const result = await albumsService.create({
      title: mockDataMusic.name,
      artistIds: [artist.id],
    });

    const albumId = result._id;
    const res = await request(app.getHttpServer()).delete(`/albums/${albumId}`);

    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
