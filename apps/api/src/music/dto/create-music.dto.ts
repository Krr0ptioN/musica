import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMusicDto {
  @ApiProperty({ description: 'Music name', required: true })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description:
      'Id of album that you want to associate the music with while creating it',
  })
  albumId?: string;

  @ApiPropertyOptional({
    description:
      'Name of album that you want to associate the music with which leads to creating both music and album',
  })
  album?: string;

  @ApiPropertyOptional()
  artistIds?: string[];

  @ApiPropertyOptional({
    description:
      'Names of artists instead of Id which leads to creating both music and the provided artists',
  })
  artists?: string[];

  @ApiPropertyOptional()
  playlistIds?: string[];

  @ApiPropertyOptional({
    description:
      'Names instead of Id which leads to creating both music and the provided artists',
  })
  playlists?: string[];

  @ApiPropertyOptional()
  releaseDate: Date;
}

export class CreateMusicWithFilenameDto extends CreateMusicDto {
  musicAudioFileName?: string;
  coverImageFileName?: string;
}
