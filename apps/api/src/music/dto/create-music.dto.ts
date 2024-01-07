import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMusicDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  albumId?: string;

  @ApiPropertyOptional()
  artistIds?: string[];

  @ApiPropertyOptional()
  playlistIds?: string[];

  @ApiPropertyOptional()
  releaseDate: Date;
}

export class CreateMusicWithFilenameDto extends CreateMusicDto {
  fileName: string;
}
