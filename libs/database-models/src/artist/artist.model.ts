import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Artist extends Document {
  @Prop()
  name: string;

  @Prop([String])
  musicIds: string[];

  @Prop([String])
  albumIds: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ARTIST_SCHEMA_MODEL = 'artist';
export const ArtistSchema = SchemaFactory.createForClass(Artist);
