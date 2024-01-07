import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Album extends Document {
  @Prop()
  title: string;

  @Prop()
  releaseDate: Date;

  @Prop([String])
  artistIds: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
