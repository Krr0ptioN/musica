import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from '../music/music.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '@musica/core';
import { ArtistsModule } from '../artists/artists.module';
import { PlaylistsModule } from '../playlists/playlists.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_URI');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    MusicModule,
    ArtistsModule,
    PlaylistsModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
