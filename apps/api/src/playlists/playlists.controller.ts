import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Playlist')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) { }

  private readonly logger = new Logger(PlaylistsController.name);

  @Post()
  @ApiOperation({ description: 'Create playlist' })
  async create(@Body() data: CreatePlaylistDto) {
    const result = await this.playlistsService.create(data);
    this.logger.debug(`PLAYLIST CREATE | Recieved data client:\n${result}`);
    return {
      message: 'Playlist was successfully created',
      success: true,
      data: {
        date: result.createdAt,
        id: result.id,
      },
    };
  }

  @Get()
  async findAll() {
    const result = await this.playlistsService.findAll();
    this.logger.verbose(
      `PLAYLIST FINDALL | Number of playlists retrived from user query: ${result.length}`
    );
    return { success: true, message: 'Operation was successful', data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.playlistsService.findOne(id);
    this.logger.debug(`PLAYLIST FINDONE | Request parameters: ${id}`);
    this.logger.verbose(
      `PLAYLIST FINDONE | Data Retrived from user query:\n${result}`
    );
    return { message: 'Operation was successful', success: true, data: result };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto
  ) {
    const result = this.playlistsService.update(id, updatePlaylistDto);
    this.logger.debug(`ALBUM UPDATE | Request parameters: ${id}`);
    this.logger.verbose(`ALBUM UPDATE | Music info updated to:\n${result}`);
    return {};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isDeleted = await this.playlistsService.remove(id);
    this.logger.debug(`PLAYLIST REMOVE | Request parameters: ${id}`);
    this.logger.verbose(
      `PLAYLIST REMOVE | Music successfully deleted:\n${isDeleted}`
    );
    if (isDeleted === false)
      throw new BadRequestException(`Failed to delete object`);
    return { message: 'Playlist successfully deleted' };
  }
}
