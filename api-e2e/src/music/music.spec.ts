import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

describe('POST /api/v1/music', () => {
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
    const filePath = 'api-e2e/assets/non-audio-file.png';
    const cwd = process.cwd();
    const absolutePathToFile = path.resolve(cwd, filePath);
    const fileStream = fs.createReadStream(absolutePathToFile);
    formData.append('file', fileStream);
    formData.append('name', 'A music with invalid file format');
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
    const filePath = 'api-e2e/assets/audio-file.mp3';
    const cwd = process.cwd();
    const absolutePathToFile = path.resolve(cwd, filePath);
    const fileStream = fs.createReadStream(absolutePathToFile);
    formData.append('file', fileStream);
    formData.append('name', 'A music with valid file format');
    const res = await axios.post(`api/v1/music`, formData);
    expect(res.data.success).toBe(true);
      expect(res.data.data.date).toBeDefined();
      expect(res.data.data.fileName).toBeDefined();
      expect(res.data.data.id).toBeDefined();
  });
});
