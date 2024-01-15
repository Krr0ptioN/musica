import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }
  private readonly logger = new Logger(ArtistsController.name);

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const result = await this.artistsService.create(createArtistDto);
    this.logger.debug(`ARTIST CREATE | Received data client:\n${result}`);
    return {
      message: 'Artist was successfully created',
      success: true,
      data: {
        date: result.createdAt,
        id: result.id,
      },
    };
  }

  @Get()
  async findAll() {
    const result = await this.artistsService.findAll();
    this.logger.verbose(
      `ARTIST FINDALL | Number of musics retrived from user query: ${result.length}`
    );
    return { message: 'Operation was successful', data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.artistsService.findOne(id);
    this.logger.debug(`ARTIST FINDONE | Request parameters: ${id}`);
    this.logger.verbose(
      `ARTIST FINDONE | Data Retrived from user query:\n${result}`
    );
    return {
      message: 'Operation completed successfully',
      succeess: true,
      data: result,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto
  ) {
    const result = await this.artistsService.update(id, updateArtistDto);
    this.logger.debug(`ARTIST UPDATE | Request parameters: ${id}`);
    this.logger.verbose(`ARTIST UPDATE | Music info updated to:\n${result}`);
    return { message: 'Artist successfully updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.artistsService.remove(id);
    this.logger.debug(`ARTIST REMOVE | Request parameters: ${id}`);
    this.logger.verbose(
      `ARTIST REMOVE | Artist successfully deleted:\n${result}`
    );
    if (!result) throw new BadRequestException(`Failed to delete object`);
    return { message: 'Artist successfully deleted' };
  }
}
