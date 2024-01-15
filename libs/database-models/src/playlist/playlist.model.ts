import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Playlist extends Document {
  @Prop()
  name: string;

  @Prop([String])
  musicIds: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const PLAYLIST_SCHEMA_MODEL = 'playlist';
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
