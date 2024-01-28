import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PLAYLIST_SCHEMA_MODEL, PlaylistSchema } from '@musica/database-models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PLAYLIST_SCHEMA_MODEL, schema: PlaylistSchema },
    ]),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  exports: [PlaylistsService],
})
export class PlaylistsModule { }
