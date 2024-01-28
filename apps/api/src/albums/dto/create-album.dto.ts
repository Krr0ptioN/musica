import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  releaseDate?: Date;

  @ApiProperty()
  artistIds: string[];
}
