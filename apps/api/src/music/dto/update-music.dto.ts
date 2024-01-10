import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMusicDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  albumId?: string;

  @ApiPropertyOptional()
  artistIds?: string[];

  @ApiPropertyOptional()
  playlistIds?: string[];

  @ApiPropertyOptional()
  releaseDate?: Date;
}

export class UpdateMusicWithFilenameDto extends UpdateMusicDto {
  musicAudioFileName?: string;
  coverImageFileName?: string;
}
