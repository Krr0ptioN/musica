import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import {
  INestApplication,
  Logger,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { ENV_NAME } from '@musica/core';
import { setupSwagger } from '@musica/core';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>(ENV_NAME.PORT_API);

  if (configService.get<boolean>(ENV_NAME.CORS_ENABLED)) {
    app.enableCors();
  }

  if (configService.get<boolean>(ENV_NAME.HELMET_ENABLED)) {
    app.use(helmet());
  }

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  setupSwagger(app, configService);

  await app.listen(port);
  Logger.log(`(  ) Application is running on: ${await app.getUrl()}`);
}

bootstrap();
