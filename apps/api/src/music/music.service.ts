import {
  Injectable,
  ServiceUnavailableException,
  Logger,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, unlinkSync } from 'fs';
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

  private purgeFile(filePath: string, fileType: string) {
    if (!filePath) {
      this.logger.verbose(`${fileType} File path is undefined.`);
      return;
    }

    try {
      unlinkSync(filePath);
      this.logger.verbose(`MUSIC REMOVE | ${filePath} File is deleted.`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        this.logger.verbose(`${filePath} File not found.`);
      } else {
        this.logger.error(
          `MUSIC REMOVE | Error deleting ${filePath}: ${error.message}`
        );
      }
    }
  }

  private purgeAssociatedFiles(music: Music) {
    const audioFilePath = music.musicAudioFileName
      ? path.join(
        this.configService.get(ENV_NAME.STORAGE_DEST),
        'musics',
        music.musicAudioFileName
      )
      : undefined;

    const coverFilePath = music.coverImageFileName
      ? path.join(
        this.configService.get(ENV_NAME.STORAGE_DEST),
        'covers',
        music.coverImageFileName
      )
      : undefined;

    this.purgeFile(audioFilePath, 'Audio');
    this.purgeFile(coverFilePath, 'Cover');
  }

  async remove(id: string): Promise<boolean> {
    try {
      const music = await this.musicModel.findOneAndDelete({ _id: id });

      if (!music) {
        throw new NotFoundException(`Music with ID ${id} not found`);
      }

      this.purgeAssociatedFiles(music);

      return true;
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  private handleDatabaseError(error): void {
    this.logger.error(error);

    if (error.name === 'ServiceUnavailableException') {
      throw new ServiceUnavailableException('Endpoint is not available');
    } else {
      throw new ServiceUnavailableException(
        'Something went wrong with the database'
      );
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
