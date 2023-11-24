import axios from 'axios';
import FormData from 'form-data';
import { fileStreamByPath } from '../utils';
import { MockData } from '../mock-data';

describe('POST /api/v1/music | Music creation', () => {
  it('should throw error if file is not provided', async () => {
    try {
      await axios.post(`/api/v1/music`, {
        name: 'A music without file',
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.message).toEqual('No file uploaded');
    }
  });

  it('should throw error if file is not an audio', async () => {
    const formData = new FormData();
    const fileStream = fileStreamByPath(
      MockData.musicCreation.invalidMusicFile.filepath
    );
    formData.append('file', fileStream);
    formData.append('name', MockData.musicCreation.validMusicFile.name);
    try {
      await axios.post(`api/v1/music`, formData);
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toEqual(
        'Only audio files (mp3, ogg, m4a) are allowed!'
      );
    }
  });

  it('should create music and upload file', async () => {
    const formData = new FormData();
    const fileStream = fileStreamByPath(
      MockData.musicCreation.validMusicFile.filepath
    );
    formData.append('file', fileStream);
    formData.append('name', MockData.musicCreation.validMusicFile.name);
    const res = await axios.post(`api/v1/music`, formData);
    expect(res.data.success).toBe(true);
    expect(res.data.data.date).toBeDefined();
    expect(res.data.data.fileName).toBeDefined();
    expect(res.data.data.id).toBeDefined();
  });
});
