import {
  app,
  albumsService,
  setupTestEnvironment,
  tearDownTestEnvironment,
  artistsService,
  mockDataArtist,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/albums | Find and get all musics', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should return 3 music', async () => {
    const artist = await artistsService.create({ ...mockDataArtist });

    await albumsService.create({
      title: 'Music #1',
      artistIds: [artist.id],
    });
    await albumsService.create({
      title: 'Music #2',
      artistIds: [artist.id],
    });

    const res = await request(app.getHttpServer()).get('/albums');

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
