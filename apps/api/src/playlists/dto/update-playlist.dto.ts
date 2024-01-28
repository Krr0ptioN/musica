import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePlaylistDto } from './create-playlist.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @ApiProperty({ description: 'New name of the playlist', required: true })
  name: string;

  @ApiPropertyOptional({
    description:
      'The new list of musics to be included in this playlist and nothing else',
  })
  musicIds?: string[];

  // TODO: Remove list and add list for playlist endpoint
  @ApiPropertyOptional({
    description: 'Musics that have to be removed from playlist',
  })
  removeMusicIds?: string[];

  @ApiPropertyOptional({
    description: 'Musics that should be included in playlist',
  })
  addMusicIds?: string[];
}
