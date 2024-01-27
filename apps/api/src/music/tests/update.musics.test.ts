import {
  app,
  mockDataMusic,
  musicService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('PUT /api/musics/:id | Update music data', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  });

  beforeEach(async () => {
    await musicService.removeAllMusic();
  });

  it('should update a music by ID (update)', async () => {
    const result = await musicService.create({ ...mockDataMusic });
    const musicId = result._id;

    const res = await request(app.getHttpServer())
      .put(`/musics/${musicId}`)
      .send({
        name: mockDataMusic.name + ' (update)',
      });

    expect(res.status).toBe(200);
  });
  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
