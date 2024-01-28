import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ARTIST_SCHEMA_MODEL, Artist } from '@musica/database-models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel(ARTIST_SCHEMA_MODEL)
    private readonly artistModel: Model<Artist>
  ) { }

  async create(data: CreateArtistDto) {
    const newArtist = new this.artistModel(data);
    return await newArtist.save();
  }

  async findAll() {
    return await this.artistModel.find().exec();
  }

  async findOne(id: string) {
    return await this.artistModel.findById(id);
  }

  async update(id: string, data: UpdateArtistDto) {
    try {
      return await this.artistModel.findOneAndUpdate({ _id: id }, data);
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const artist = await this.artistModel.findOneAndDelete({ _id: id });
      return artist.name ? true : false;
    } catch (error) {
      return error;
    }
  }

  async removeAllArtist() {
    try {
      return await this.artistModel.deleteMany({});
    } catch (error) {
      throw new Error(`Error deleting all playlists: ${error}`);
    }
  }
}
