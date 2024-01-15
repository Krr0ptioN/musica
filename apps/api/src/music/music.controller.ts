import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { MusicService } from './music.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {
  imageFileFilter,
  multerDiskStorageMusicAudioFileDestination,
  multerDiskStorageFilename,
  multerDiskStorageMusicCoverFileImageDestination,
  audioFileFilter,
} from '@musica/core';
import { Album, Playlist } from '@musica/database-models';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { PlaylistsService } from '../playlists/playlists.service';

@ApiTags('Music')
@Controller('musics')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly playlistsService: PlaylistsService
  ) { }

  private readonly logger = new Logger(MusicController.name);

  @Post()
  @ApiOperation({ description: 'Create music' })
  async create(@Body() data: CreateMusicDto) {
    if (data.artists && !data.artistIds) {
      data.artistIds = await this.createArtists(data.artists);
    }

    if (data.album && !data.albumId) {
      data.albumId = await this.createAlbum(data.album, data.artistIds);
    }

    if (data.playlists && !data.playlistIds) {
      data.playlistIds = await this.createPlaylists(data.playlists);
    }

    const result = await this.musicService.create({
      ...data,
    });

    this.logger.debug(`MUSIC CREATE | Received data client:\n${result}`);
    return {
      message: 'Music was successfully created',
      success: true,
      data: {
        date: result.createdAt,
        id: result.id,
      },
    };
  }

  private async createArtists(artistNames: string[]): Promise<string[]> {
    const artistIds: string[] = [];

    for (const artistName of artistNames) {
      const artistObject = await this.artistsService.create({
        name: artistName,
      });

      // Assuming the 'id' is a property in the 'Document' type
      const artistId: string = (artistObject as any).id;

      artistIds.push(artistId);
    }

    return artistIds;
  }

  private async createAlbum(
    albumName: string,
    artistIds: string[]
  ): Promise<string> {
    const musicAlbum: Album = await this.albumsService.create({
      title: albumName,
      artistIds,
    });

    return musicAlbum.id;
  }

  private async createPlaylists(playlistNames: string[]): Promise<string[]> {
    const playlistIds: string[] = [];

    for (const playlistName of playlistNames) {
      const playlistObject: Playlist = await this.playlistsService.create({
        name: playlistName,
      });
      playlistIds.push(playlistObject.id);
    }

    return playlistIds;
  }

  @Patch(':id/file/upload')
  @ApiOperation({ description: 'Upload audio file for a specific music' })
  @UseInterceptors(
    FileInterceptor('musicAudioFileName', {
      storage: diskStorage({
        destination: multerDiskStorageMusicAudioFileDestination,
        filename: multerDiskStorageFilename,
      }),
      fileFilter: audioFileFilter,
      limits: {
        fileSize: 8000000,
      },
    })
  )
  async uploadMusic(
    @Param('id') id: string,
    @UploadedFile()
    musicAudioFileName: Express.Multer.File
  ) {
    if (!musicAudioFileName) {
      this.logger.log(musicAudioFileName);
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.musicService.update(id, {
      musicAudioFileName: musicAudioFileName.filename,
    });

    this.logger.debug(`MUSIC CREATE | Recieved data client:\n${result}`);
    this.logger.verbose(
      `MUSIC CREATE | Music file uploaded: ${musicAudioFileName.filename}`
    );
    return {
      message: 'Music was successfully created',
      success: true,
      data: {
        musicAudioFileName: musicAudioFileName.filename,
        id: result.id,
      },
    };
  }

  @Patch(':id/cover/upload')
  @ApiOperation({
    description: 'Upload music cover image file for a specific music',
  })
  @UseInterceptors(
    FileInterceptor('coverImageFileName', {
      storage: diskStorage({
        destination: multerDiskStorageMusicCoverFileImageDestination,
        filename: multerDiskStorageFilename,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 4000000,
      },
    })
  )
  async uploadMusicCover(
    @Param('id') id: string,
    @UploadedFile()
    coverImageFileName: Express.Multer.File
  ) {
    if (!coverImageFileName) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.musicService.update(id, {
      coverImageFileName: coverImageFileName.filename,
    });

    this.logger.debug(`MUSIC CREATE | Recieved data client:\n${result}`);
    this.logger.verbose(
      `MUSIC CREATE | Music file uploaded: ${coverImageFileName.filename}`
    );
    return {
      message: 'Music was successfully created',
      success: true,
      data: {
        coverImageFileName: coverImageFileName.filename,
        id: result.id,
      },
    };
  }

  @Get(':id/file')
  public async getMusicFile(@Param('id') id: string) {
    return this.musicService.getMusicAudioFile(id);
  }

  @Get(':id/cover')
  public async getMusicCoverFile(@Param('id') id: string) {
    return this.musicService.getMusicCoverImageFile(id);
  }

  @Get()
  public async findAll() {
    const result = await this.musicService.findAll();
    return { message: 'Operation was successful', data: result };
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const result = await this.musicService.findOne(id);
    this.logger.debug(`Request parameters: ${id}`);
    this.logger.verbose(`Data Retrived from user query:\n${result}`);
    return { message: 'Operation was successful', data: result };
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() data: UpdateMusicDto) {
    const result = await this.musicService.update(id, data);
    this.logger.debug(`Request parameters: ${id}`);
    this.logger.verbose(`Music info updated to:\n${result}`);
    return { message: 'Music successfully updated' };
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    const result = await this.musicService.remove(id);
    this.logger.debug(`Request parameters: ${id}`);
    this.logger.verbose(`Music successfully deleted:\n${result}`);
    if (!result) throw new BadRequestException(`Failed to delete object`);
    return { message: 'Music successfully deleted' };
  }
}
