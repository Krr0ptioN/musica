import { Injectable, Inject, StreamableFile } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma/dist/custom';
import { Prisma, Music, PrismaClient } from '@musica/data-access/client';
import { ConfigService } from '@nestjs/config';
import config from '../configs/config';
import { createReadStream } from 'fs';

@Injectable()
export class MusicService {
  constructor(
    @Inject('DataAccessService')
    private prisma: CustomPrismaService<PrismaClient>,
    private readonly configService: ConfigService
  ) { }

  create(data: Prisma.MusicCreateInput) {
    return this.prisma.client.music.create({ data });
  }

  async getMusicFile(id: string): Promise<StreamableFile> {
    const uploadStorage: string =
      this.configService.get<string>('MUSIC_STORAGE') ||
      config.storage.musicStorageDest;
    const music = await this.prisma.client.music.findUnique({ where: { id } });
    const filePath = uploadStorage + '/' + music.fileName;
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }

  async findOne(where: Prisma.MusicWhereUniqueInput): Promise<Music | null> {
    return this.prisma.client.music.findUnique({
      where,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MusicWhereUniqueInput;
    where?: Prisma.MusicWhereInput;
    orderBy?: Prisma.MusicOrderByWithRelationInput;
  }): Promise<Music[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.music.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  update(params: {
    where: Prisma.MusicWhereUniqueInput;
    data: Prisma.MusicUpdateInput;
  }): Promise<Music> {
    const { where, data } = params;
    return this.prisma.client.music.update({
      data,
      where,
    });
  }

  remove(where: Prisma.MusicWhereUniqueInput): Promise<Music> {
    return this.prisma.client.music.delete({
      where,
    });
  }
}
