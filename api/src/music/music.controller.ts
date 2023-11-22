import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  Logger,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { MusicService } from './music.service';
import { Prisma } from '@musica/data-access/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  musicFileName,
  multerDiskStorageDestination,
  audioFileFilter,
  multerDiskStorageFilename,
} from '../utils/mutler';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }

  private readonly logger = new Logger(MusicService.name);

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
    @Body() data: Prisma.MusicCreateInput,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileName = musicFileName(file);
    const result = await this.musicService.create({ ...data, fileName });
    this.logger.debug(`Request parameters: `, data);
    this.logger.verbose(`MUSIC CREATE | Recieved data client:\n${result}`);
    this.logger.verbose(`MUSIC CREATE | Music file uploaded: ${fileName}`);
    return {
      msg: 'Music was successful created',
      success: true,
      data: {
        date: result.createdAt,
        fileName,
      },
    };
  }

  @Get()
  public async findAll(
    @Query('skip') skipQu?: string,
    @Query('take') takeQu?: string,
    @Query('cursor') cursorQu?: string,
    @Query('where') whereQu?: string,
    @Query('orderBy') orderByQu?: string
  ) {
    const parsedSkip = this.parseQueryParamNumber(skipQu);
    const parsedTake = this.parseQueryParamNumber(takeQu, 40);
    const where = this.parseWhereQueryParam(whereQu);
    const cursor = this.parseWhereQueryParam(cursorQu);
    const orderBy = this.parseQueryParamWithRelationInput(orderByQu);

    const result = await this.musicService.findAll({
      skip: parsedSkip,
      take: parsedTake,
      cursor,
      where,
      orderBy,
    });

    this.logRequestParameters({
      skip: parsedSkip,
      take: parsedTake,
      cursor,
      where,
      orderBy,
    });

    return { msg: 'Operation was successful', data: result };
  }

  private parseQueryParamNumber(
    value: string | undefined,
    defaultValue: number = 0
  ): number {
    return value ? Number(value) : defaultValue;
  }
  private parseWhereQueryParam(
    value: string | undefined
  ): Prisma.MusicWhereUniqueInput | undefined {
    try {
      return value ? JSON.parse(value) : undefined;
    } catch (error) {
      throw new BadRequestException('Invalid JSON provided in query parameter');
    }
  }

  private parseQueryParamWithRelationInput(
    value: string | undefined
  ): Prisma.MusicOrderByWithRelationInput | undefined {
    try {
      return value ? JSON.parse(value) : undefined;
    } catch (error) {
      throw new BadRequestException(
        'Invalid JSON provided in orderBy query parameter'
      );
    }
  }
  private logRequestParameters(params: Record<string, any>): void {
    const logParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([name, value]) => `${name}: ${value}`)
      .join('\n');

    this.logger.debug(`Request parameters:\n${logParams}`);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const result = await this.musicService.findOne({ id });
    this.logger.debug(`Request parameters: ${id}`);
    this.logger.verbose(`Data Retrived from user query:\n${result}`);
    return { msg: 'Operation was successful', data: result };
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateMusicDto: Prisma.MusicUpdateInput
  ) {
    const result = await this.musicService.update({
      where: { id },
      data: updateMusicDto,
    });
    this.logger.debug(`Request parameters: ${id}`);
    this.logger.verbose(`Music info updated to:\n${result}`);
    return { msg: 'Music successfully updated', date: result.updatedAt };
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    const result = await this.musicService.remove({ id });
    this.logger.debug(`Request parameters: ${id}`);
    this.logger.verbose(`Music successfully deleted:\n${result}`);
    return { msg: 'Music successfully deleted', date: result.updatedAt };
  }
}
