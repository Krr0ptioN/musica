import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MUSIC_SCHEMA_MODEL, MusicSchema } from '@musica/database-models';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { PlaylistsModule } from '../playlists/playlists.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MUSIC_SCHEMA_MODEL, schema: MusicSchema },
    ]),
    ArtistsModule,
    AlbumsModule,
    PlaylistsModule,
  ],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule { }
