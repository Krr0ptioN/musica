import { Module } from '@nestjs/common';

import { CustomPrismaModule } from 'nestjs-prisma/dist/custom';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from '../music/music.module';
import { PrismaClient } from '@musica/data-access/client';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CustomPrismaModule.forRoot({
      name: 'DataAccessService',
      client: new PrismaClient(),
      isGlobal: true,
    }),
    MusicModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
