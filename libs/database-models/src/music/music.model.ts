import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Music extends Document {
  @Prop()
  name: string;

  @Prop()
  albumId: string;

  @Prop([String])
  artistIds: string[];

  @Prop([String])
  playlistIds: string[];

  @Prop()
  releaseDate: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ unique: true })
  fileName: string;
}

export const MUSIC_SCHEMA_MODEL = 'music';
export const MusicSchema = SchemaFactory.createForClass(Music);
