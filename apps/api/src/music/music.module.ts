import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MUSIC_SCHEMA_MODEL, MusicSchema } from '@musica/database-models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MUSIC_SCHEMA_MODEL, schema: MusicSchema },
    ]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule { }
