import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({ description: 'Name of the playlist', required: true })
  name: string;

  @ApiPropertyOptional()
  musicIds?: string[];
}
