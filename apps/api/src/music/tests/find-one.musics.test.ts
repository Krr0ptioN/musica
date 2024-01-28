import {
  app,
  mockDataMusic,
  musicService,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/musics/:id | Get music by id', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  });

  beforeEach(async () => {
    await musicService.removeAllMusic();
  });


  it('should retrieve a music by ID (findOne)', async () => {
    const result = await musicService.create({
      name: mockDataMusic.name,
      releaseDate: mockDataMusic.releaseDate,
    });
    const musicId = result._id;

    const res = await request(app.getHttpServer()).get(`/musics/${musicId}`);

    expect(res.body?.data?.name).toBe(mockDataMusic.name);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
