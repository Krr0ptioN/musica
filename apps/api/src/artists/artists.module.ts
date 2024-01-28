import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ARTIST_SCHEMA_MODEL, ArtistSchema } from '@musica/database-models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ARTIST_SCHEMA_MODEL,
        schema: ArtistSchema,
      },
    ]),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule { }
