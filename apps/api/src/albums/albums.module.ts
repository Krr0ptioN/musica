import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema, ALBUM_SCHEMA_MODEL } from '@musica/database-models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ALBUM_SCHEMA_MODEL,
        schema: AlbumSchema,
      },
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule { }
