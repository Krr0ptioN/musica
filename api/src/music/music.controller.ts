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
} from '@nestjs/common';
import { MusicService } from './music.service';
import { Prisma } from '@prisma/client/data-access';
import valueOrNone from '../utils/value-or-none';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Music')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) { }

  private readonly logger = new Logger(MusicService.name);

  @Post()
  @ApiOperation({ description: 'Create music' })
  async create(@Body() data: Prisma.MusicCreateInput) {
    const result = await this.musicService.create(data);
    this.logger.debug(`Request parameters: `, data);
    this.logger.verbose(`Data Retrived from user query:`, result);
    return { msg: 'Operation was successful', date: result.createdAt };
  }

  @Get()
  public async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: Prisma.MusicWhereUniqueInput,
    @Query('where') where?: Prisma.MusicWhereUniqueInput,
    @Query('orderBy') orderBy?: Prisma.MusicOrderByWithRelationInput
  ) {
    const result = await this.musicService.findAll({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    // NOTE: Provide debug information about paramaters
    const logParams = [
      { name: 'skip', value: skip },
      { name: 'take', value: take },
      { name: 'cursor', value: cursor },
      { name: 'where', value: where },
      { name: 'orderBy', value: orderBy },
    ]
      .filter((param) => param.value !== undefined)
      .map((param) => `${param.name}: ${valueOrNone(param.value)}`)
      .join('\n');
    this.logger.debug(`Request parameters:\n`, logParams);
    this.logger.verbose(
      'Data Retrived from user query: ',
      result[0] ? result[0] : ''
    );

    return { msg: 'Operation was successful', result };
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const result = await this.musicService.findOne({ id });
    this.logger.debug(`Request parameters: ${id}`);
    this.logger.verbose(`Data Retrived from user query:\n${result}`);
    return { msg: 'Operation was successful', result };
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
