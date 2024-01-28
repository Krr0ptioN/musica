import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PLAYLIST_SCHEMA_MODEL, Playlist } from '@musica/database-models';
import { Error, Model } from 'mongoose';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(PLAYLIST_SCHEMA_MODEL)
    private readonly playlistModel: Model<Playlist>
  ) { }

  async create(data: CreatePlaylistDto) {
    const newPlaylist = new this.playlistModel(data);
    const result = await newPlaylist.save();
    return result;
  }

  async findAll(): Promise<CreatePlaylistDto[]> {
    return await this.playlistModel.find().exec();
  }

  async findOne(id: string): Promise<CreatePlaylistDto> {
    return await this.playlistModel.findById(id);
  }

  async update(id: string, data: UpdatePlaylistDto) {
    try {
      const music = await this.playlistModel.findOneAndUpdate(
        { _id: id },
        data
      );
      return music;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const music = await this.playlistModel.findOneAndDelete({ _id: id });
      return music.name ? true : false;
    } catch (error) {
      return error;
    }
  }

  async removeAllPlaylist() {
    try {
      return await this.playlistModel.deleteMany({});
    } catch (error) {
      throw new Error(`Error deleting all playlists: ${error}`);
    }
  }
}
