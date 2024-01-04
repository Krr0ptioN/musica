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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { MusicService } from './music.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  multerDiskStorageDestination,
  audioFileFilter,
  multerDiskStorageFilename,
} from '../utils/mutler';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@ApiTags('Music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }

  private readonly logger = new Logger(MusicController.name);

  @Post()
  @ApiOperation({ description: 'Create music' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: multerDiskStorageDestination,
        filename: multerDiskStorageFilename,
      }),
      fileFilter: audioFileFilter,
    })
  )
  async create(
    @Body() data: CreateMusicDto,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.musicService.create({
      ...data,
      fileName: file.filename,
    });
    this.logger.debug(`MUSIC CREATE | Recieved data client:\n${result}`);
    this.logger.verbose(`MUSIC CREATE | Music file uploaded: ${file.filename}`);
    return {
      message: 'Music was successfully created',
      success: true,
      data: {
        date: result.createdAt,
        fileName: file.filename,
        id: result.id,
      },
    };
  }

  @Get('file/:id')
  public async getFile(@Param('id') id: string) {
    return this.musicService.getMusicFile(id);
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
