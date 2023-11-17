import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import config from './configs/config';
import helmet from 'helmet';
import { BackendConfig } from './configs/backend.interface';
import { HelmetConfig } from './configs/helmet.interface';
import { CorsConfig } from './configs/cors.interface';
import { SwaggerConfig } from './configs/swagger.interface';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Retrieve configuration values using configService
  const configService = app.get(ConfigService);

  const backendConfig: BackendConfig = {
    port: configService.get<number>('PORT_API') || config.backend.port,
  };

  const helmetConfig: HelmetConfig = {
    enabled:
      configService.get<boolean>('HELMET_ENABLED') ?? config.helmet.enabled,
  };

  const swaggerConfig: SwaggerConfig = {
    enabled:
      configService.get<boolean>('SWAGGER_ENABLED') ?? config.swagger.enabled,
    title: configService.get<string>('SWAGGER_TITLE') ?? config.swagger.title,
    description:
      configService.get<string>('SWAGGER_DESC') ?? config.swagger.description,
    version: configService.get<string>('API_VERSION') ?? config.swagger.version,
    path: configService.get<string>('SWAGGER_PATH') ?? config.swagger.path,
    user: configService.get<string>('SWAGGER_USER') ?? config.swagger.user,
    password:
      configService.get<string>('SWAGGER_PASSWORD') ?? config.swagger.password,
    env: configService.get<string[]>('SWAGGER_ENV') ?? config.swagger.env,
  };
  const corsConfig: CorsConfig = {
    enabled: configService.get<boolean>('CORS_ENABLED') ?? config.cors.enabled,
  };

  if (corsConfig.enabled) {
    app.enableCors();
  }

  if (helmetConfig.enabled) {
    app.use(helmet());
  }

  // set api version
  app.setGlobalPrefix('api/' + 'v' + swaggerConfig.version, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  // Swagger Api
  if (
    swaggerConfig.enabled &&
    swaggerConfig.env.includes(process.env.NODE_ENV)
  ) {
    app.use(
      [swaggerConfig.path, swaggerConfig.path + '-json'],
      basicAuth.default({
        challenge: true,
        users: {
          admin: swaggerConfig.user,
          password: swaggerConfig.password,
        },
      })
    );
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  // Start the server4
  await app.listen(backendConfig.port);
  Logger.log(
    `(  ) Application is running on: http://localhost:${backendConfig.port}/${'v' + swaggerConfig.version
    }`
  );
}

bootstrap();
