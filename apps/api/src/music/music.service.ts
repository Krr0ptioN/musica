import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import config from '../configs/config';
import { createReadStream } from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { MUSIC_SCHEMA_MODEL, Music } from '@musica/database-models';
import { Model } from 'mongoose';
import {
  CreateMusicDto,
  CreateMusicWithFilenameDto,
} from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(MUSIC_SCHEMA_MODEL)
    private readonly musicModel: Model<Music>,
    private readonly configService: ConfigService
  ) { }

  private readonly logger = new Logger(MusicService.name);

  async create(data: CreateMusicWithFilenameDto): Promise<Music> {
    const newMusic = new this.musicModel(data);
    const result = await newMusic.save();
    return result;
  }

  async getMusicFile(id: string): Promise<StreamableFile> {
    const uploadStorage: string =
      this.configService.get<string>('MUSIC_STORAGE') ||
      config.storage.musicStorageDest;

    const music = await this.musicModel.findById(id);
    const filePath = uploadStorage + '/' + music.fileName;
    const file = createReadStream(filePath);
    return new StreamableFile(file);
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

  async update(id: string, data: UpdateMusicDto): Promise<Music> {
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

  async removeAllMusic(): Promise<any> {
    try {
      return await this.musicModel.deleteMany({});
    } catch (error) {
      throw new Error(`Error deleting all music: ${error}`);
    }
  }
}
