import {
  app,
  mockDataMusic,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('POST /api/musics | Music creation', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should create music and upload file', async () => {
    const res = await request(app.getHttpServer())
      .post('/musics')
      .send({ ...mockDataMusic });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Music was successfully created');
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
