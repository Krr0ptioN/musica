import {
  albumsService,
  app,
  artistsService,
  mockDataAlbum,
  mockDataArtist,
  setupTestEnvironment,
  tearDownTestEnvironment,
} from '../../utils/setup-test';
import request from 'supertest';

describe('GET /api/albums/:id | Get music by id', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should retrieve a music by ID (findOne)', async () => {
    const artist = await artistsService.create({
      name: mockDataArtist.name,
    });
    const result = await albumsService.create({
      title: mockDataAlbum.title,
      artistIds: [artist.id],
    });

    const albumId = result._id;
    const res = await request(app.getHttpServer()).get(`/albums/${albumId}`);

    expect(res.body.data.title).toBe(mockDataAlbum.title);
  });

  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
