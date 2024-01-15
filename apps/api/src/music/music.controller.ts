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
import { Album, Artist, Playlist } from '@musica/database-models';
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

      const artistId: string = (artistObject as Artist).id;

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
  @ApiOperation({ description: 'Create music' })
  public async getMusicFile(@Param('id') id: string) {
    return this.musicService.getMusicAudioFile(id);
  }

  @Get(':id/cover')
  @ApiOperation({ description: 'Get the music cover image' })
  public async getMusicCoverFile(@Param('id') id: string) {
    return this.musicService.getMusicCoverImageFile(id);
  }

  @Get()
  @ApiOperation({ description: 'Get all musics' })
  public async findAll() {
    const result = await this.musicService.findAll();
    this.logger.verbose(
      `MUSIC FINDALL | Number of musics retrived from user query: ${result.length}`
    );
    return { success: true, message: 'Operation was successful', data: result };
  }

  @Get(':id')
  @ApiOperation({ description: 'Get a specific music' })
  public async findOne(@Param('id') id: string) {
    const result = await this.musicService.findOne(id);
    this.logger.debug(`MUSIC FINDONE | Request parameters: ${id}`);
    this.logger.verbose(
      `MUSIC FINDONE | Data Retrived from user query:\n${result}`
    );
    return { success: true, message: 'Operation was successful', data: result };
  }

  @Put(':id')
  @ApiOperation({ description: 'Update music detail specific music' })
  public async update(@Param('id') id: string, @Body() data: UpdateMusicDto) {
    const result = await this.musicService.update(id, data);
    this.logger.debug(`MUSIC UPDATE | Request parameters: ${id}`);
    this.logger.verbose(`MUSIC UPDATE | Music info updated to:\n${result}`);
    return { success: true, message: 'Music successfully updated' };
  }

  @Delete(':id')
  @ApiOperation({ description: "Remove a music with it's file" })
  public async remove(@Param('id') id: string) {
    const result = await this.musicService.remove(id);
    this.logger.debug(`MUSIC REMOVE | Request parameters: ${id}`);
    this.logger.verbose(
      `MUSIC REMOVE | Music successfully deleted:\n${result}`
    );
    if (!result) throw new BadRequestException(`Failed to delete object`);
    return { success: true, message: 'Music successfully deleted' };
  }
}
