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

@ApiTags('Music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }

  private readonly logger = new Logger(MusicController.name);

  @Post()
  @ApiOperation({ description: 'Create music' })
  async create(@Body() data: CreateMusicDto) {
    const result = await this.musicService.create({
      ...data,
    });

    this.logger.debug(`MUSIC CREATE | Recieved data client:\n${result}`);
    return {
      message: 'Music was successfully created',
      success: true,
      data: {
        date: result.createdAt,
        id: result.id,
      },
    };
  }

  @Post(':id/upload')
  @ApiOperation({ description: 'Upload audio file for a specific music' })
  @UseInterceptors(
    FileInterceptor('musicAudioFileName', {
      storage: diskStorage({
        destination: multerDiskStorageMusicAudioFileDestination,
        filename: multerDiskStorageFilename,
      }),
      fileFilter: audioFileFilter,
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

  @Post(':id/cover/upload')
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

  @Patch(':id')
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
