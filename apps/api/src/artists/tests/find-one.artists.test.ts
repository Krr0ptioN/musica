import {
  app,
  mockDataArtist,
  artistsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/artists/:id | Get artist by id', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 1000000);

  it('should retrieve a artist by ID (findOne)', async () => {
    const result = await artistsService.create({
      name: mockDataArtist.name,
    });
    const artistId = result._id;

    const res = await request(app.getHttpServer()).get(`/artists/${artistId}`);

    expect(res.body.data.name).toBe(mockDataArtist.name);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
