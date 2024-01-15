import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }
  private readonly logger = new Logger(AlbumsController.name);

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const result = await this.albumsService.create(createAlbumDto);
    this.logger.debug(`ALBUM CREATE | Received data client:\n${result}`);
    return {
      message: 'Album was successfully created',
      success: true,
      data: {
        date: result.createdAt,
        id: result.id,
      },
    };
  }

  @Get()
  async findAll() {
    const result = await this.albumsService.findAll();
    this.logger.verbose(
      `ALBUM FINDALL | Number of musics retrived from user query: ${result.length}`
    );
    return { message: 'Operation was successful', data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.albumsService.findOne(id);
    this.logger.debug(`ALBUM FINDONE | Request parameters: ${id}`);
    this.logger.verbose(
      `ALBUM FINDONE | Data Retrived from user query:\n${result}`
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
    @Body() updateAlbumDto: UpdateAlbumDto
  ) {
    const result = await this.albumsService.update(id, updateAlbumDto);
    this.logger.debug(`ALBUM UPDATE | Request parameters: ${id}`);
    this.logger.verbose(`ALBUM UPDATE | Music info updated to:\n${result}`);
    return { message: 'Music successfully updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.albumsService.remove(id);
    this.logger.debug(`ALBUM REMOVE | Request parameters: ${id}`);
    this.logger.verbose(
      `ALBUM REMOVE | Music successfully deleted:\n${result}`
    );
    if (!result) throw new BadRequestException(`Failed to delete object`);
    return { message: 'Music successfully deleted' };
  }
}
