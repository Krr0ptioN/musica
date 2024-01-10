import {
  Injectable,
  ServiceUnavailableException,
  StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { MUSIC_SCHEMA_MODEL, Music } from '@musica/database-models';
import { Model } from 'mongoose';
import {
  CreateMusicDto,
  CreateMusicWithFilenameDto,
} from './dto/create-music.dto';
import { UpdateMusicWithFilenameDto } from './dto/update-music.dto';
import { ENV_NAME } from '@musica/core';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(MUSIC_SCHEMA_MODEL)
    private readonly musicModel: Model<Music>,
    private readonly configService: ConfigService
  ) { }

  async create(data: CreateMusicWithFilenameDto): Promise<Music> {
    const newMusic = new this.musicModel(data);
    const result = await newMusic.save();
    return result;
  }

  async getMusicAudioFile(id: string): Promise<StreamableFile> {
    const music = await this.musicModel.findById(id);
    const filePath =
      this.configService.get(ENV_NAME.STORAGE_DEST) +
      '/musics/' +
      music.musicAudioFileName;
    return new StreamableFile(createReadStream(filePath));
  }

  async getMusicCoverImageFile(id: string): Promise<StreamableFile> {
    const music = await this.musicModel.findById(id);
    const filePath =
      this.configService.get(ENV_NAME.STORAGE_DEST) +
      '/covers/' +
      music.coverImageFileName;
    return new StreamableFile(createReadStream(filePath));
  }

  async findOne(id: string): Promise<Music | null> {
    const result = await this.musicModel.findById(id);
    return result;
  }

  async findAll(): Promise<CreateMusicDto[]> {
    const musics = await this.musicModel.find().exec();
    return musics.map((music) => ({
      id: music.id,
      name: music.name,
      playlistIds: music.playlistIds,
      artistIds: music.artistIds,
      albumId: music.albumId,
      releaseDate: music.releaseDate,
    }));
  }

  async update(id: string, data: UpdateMusicWithFilenameDto): Promise<Music> {
    try {
      const music = await this.musicModel.findOneAndUpdate({ _id: id }, data);
      return music;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const music = await this.musicModel.findOneAndDelete({ _id: id });
      // // TODO: Delete the associated file also
      // if (music) {
      // }

      return music.name ? true : false;
    } catch (error) {
      throw new ServiceUnavailableException('Endpoint is not available');
    }
  }

  async removeAllMusic() {
    try {
      return await this.musicModel.deleteMany({});
    } catch (error) {
      throw new Error(`Error deleting all music: ${error}`);
    }
  }
}
