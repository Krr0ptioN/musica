import { Module } from '@nestjs/common';

import { CustomPrismaModule } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { PrismaClient } from '@prisma/client/data-access';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CustomPrismaModule.forRoot({
      name: 'PrismaServiceAuth',
      client: new PrismaClient(),
    }),
    MusicModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
