import {
  app,
  mockDataArtist,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('POST /api/artists | Music creation', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should create artist', async () => {
    const res = await request(app.getHttpServer())
      .post('/artists')
      .send({ ...mockDataArtist });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Artist was successfully created');
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
