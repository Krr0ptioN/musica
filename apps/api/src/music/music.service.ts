import {
  Injectable,
  ServiceUnavailableException,
  Logger,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, unlink } from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { MUSIC_SCHEMA_MODEL, Music } from '@musica/database-models';
import { Model } from 'mongoose';
import {
  CreateMusicDto,
  CreateMusicWithFilenameDto,
} from './dto/create-music.dto';
import { UpdateMusicWithFilenameDto } from './dto/update-music.dto';
import { ENV_NAME } from '@musica/core';
import path from 'path';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(MUSIC_SCHEMA_MODEL)
    private readonly musicModel: Model<Music>,
    private readonly configService: ConfigService
  ) { }

  logger = new Logger(MusicService.name);

  async create(data: CreateMusicWithFilenameDto): Promise<Music> {
    const newMusic = new this.musicModel(data);
    const result = await newMusic.save();
    return result;
  }

  async getMusicAudioFile(id: string): Promise<StreamableFile> {
    const music = await this.musicModel.findById(id);
    const filePath = path.join(
      this.configService.get(ENV_NAME.STORAGE_DEST),
      'musics',
      music.musicAudioFileName
    );
    return new StreamableFile(createReadStream(filePath));
  }

  async getMusicCoverImageFile(id: string): Promise<StreamableFile> {
    const music = await this.musicModel.findById(id);
    const filePath = path.join(
      this.configService.get(ENV_NAME.STORAGE_DEST),
      'covers',
      music.coverImageFileName
    );
    return new StreamableFile(createReadStream(filePath));
  }

  async findOne(id: string): Promise<Music> {
    const result = await this.musicModel.findById(id);
    if (!result) {
      throw new NotFoundException('Music not found');
    }
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

  private purgeAssociatedFiles(music: Music) {
    const audioFilePath = path.join(
      this.configService.get(ENV_NAME.STORAGE_DEST),
      'musics',
      music.musicAudioFileName
    );

    const coverFilePath = path.join(
      this.configService.get(ENV_NAME.STORAGE_DEST),
      'covers',
      music.coverImageFileName
    );

    unlink(audioFilePath, (err) => {
      if (err) throw err;
      this.logger.verbose(`${audioFilePath} File is deleted.`);
    });
    unlink(coverFilePath, (err) => {
      if (err) throw err;
      this.logger.verbose(`${coverFilePath} File is deleted.`);
    });
  }

  async remove(id: string): Promise<boolean> {
    try {
      const music = await this.musicModel.findOneAndDelete({ _id: id });
      if (music) {
        this.purgeAssociatedFiles(music);
      }
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
