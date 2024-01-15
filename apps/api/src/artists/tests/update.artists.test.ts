import {
  app,
  artistsService,
  mockDataArtist,
  mockDataMusic,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('PUT /api/artists/:id | Update artist data', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should update a artist by ID (update)', async () => {
    const result = await artistsService.create({ ...mockDataMusic });
    const artistId = result._id;

    const res = await request(app.getHttpServer())
      .put(`/artists/${artistId}`)
      .send({
        name: mockDataArtist.name + ' (update)',
      });

    expect(res.status).toBe(200);
  });
  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
