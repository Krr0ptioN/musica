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

describe('PUT /api/musics/:id | Update music data', () => {
  beforeAll(async () => {
    await setupTestEnvironment();
  }, 100000);

  it('should update a music by ID (update)', async () => {
    const artist = await artistsService.create({ ...mockDataArtist });
    const result = await albumsService.create({
      ...mockDataAlbum,
      artistIds: [artist.id],
    });
    const musicId = result._id;

    const res = await request(app.getHttpServer())
      .put(`/musics/${musicId}`)
      .send({
        name: mockDataAlbum.title + ' (update)',
      });

    expect(res.status).toBe(200);
  });
  afterAll(async () => {
    await tearDownTestEnvironment();
  });
});
