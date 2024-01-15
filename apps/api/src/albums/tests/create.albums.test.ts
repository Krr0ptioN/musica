import {
  app,
  artistsService,
  mockDataAlbum,
  mockDataArtist,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('POST /api/albums | Album creation', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should create albums', async () => {
    const artist = await artistsService.create({ ...mockDataArtist });
    const res = await request(app.getHttpServer())
      .post('/albums')
      .send({ ...mockDataAlbum, artistIds: [artist.id] });
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual('Album was successfully created');
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
