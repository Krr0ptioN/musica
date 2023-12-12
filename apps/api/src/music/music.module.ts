import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';

@Module({
  imports: [],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
