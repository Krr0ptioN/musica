import axios from 'axios';
import { AppModule } from '@musica/api';
import { MockData } from '../mock-data';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as request from 'supertest';

describe('Music Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST /api/v1/music | Music creation', () => {
    it('should throw error if file is not provided', async () => { });
    it('should throw error if file is not an audio', async () => { });
    it('should create music and upload file', async () => { });
  });

  describe('GET /api/v1/music/file/:id | Get music file', () => {
    it('should find the music and get the file to play', async () => { });
  });

  describe('GET /api/v1/music | Get music file', () => {
    it('should return all music records with default parameters', async () => { });
    it('should return music records based on specific query parameters', async () => { });
    it('should handle invalid JSON in query parameters gracefully', async () => { });
  });

  describe('GET /api/v1/music/:id | Get music file', () => {
    it('should retrieve a music by ID (findOne)', async () => { });
  });

  describe('PATCH /api/v1/music/:id | Get music file', () => {
    it('should update a music by ID (update)', async () => { });
  });

  describe('DELETE /api/v1/music/:id | Get music file', () => {
    it('should remove a music by ID (remove)', async () => { });
  });

  afterAll(async () => {
    await app.close();
  });
});
