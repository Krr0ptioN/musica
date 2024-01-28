import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ALBUM_SCHEMA_MODEL, Album } from '@musica/database-models';
import { Model } from 'mongoose';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(ALBUM_SCHEMA_MODEL)
    private readonly albumModel: Model<Album>
  ) { }

  async create(data: CreateAlbumDto) {
    const newAlbum = new this.albumModel(data);
    return await newAlbum.save();
  }

  async findAll() {
    return await this.albumModel.find().exec();
  }

  async findOne(id: string) {
    return await this.albumModel.findById(id);
  }

  async update(id: string, data: UpdateAlbumDto) {
    try {
      return await this.albumModel.findOneAndUpdate({ _id: id }, data);
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const album = await this.albumModel.findOneAndDelete({ _id: id });
      return album.title ? true : false;
    } catch (error) {
      return error;
    }
  }
  async removeAllAlbum() {
    try {
      return await this.albumModel.deleteMany({});
    } catch (error) {
      throw new Error(`Error deleting all playlists: ${error}`);
    }
  }
}
