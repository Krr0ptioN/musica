import { Injectable, Inject } from '@nestjs/common';
import { CustomPrismaService } from 'nestjs-prisma';
import { Prisma, Music, PrismaClient } from '@musica/data-access/client';

@Injectable()
export class MusicService {
  constructor(
    @Inject('DataAccessService')
    private prisma: CustomPrismaService<PrismaClient>
  ) {}

  create(data: Prisma.MusicCreateInput) {
    return this.prisma.client.music.create({ data });
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
