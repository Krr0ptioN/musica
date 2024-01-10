import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_NAME } from '../config/env/names.enum';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication, configService: ConfigService) => {
  const path = configService.get<string>(ENV_NAME.SWAGGER_PATH);
  const title = configService.get<string>(ENV_NAME.SWAGGER_TITLE);
  const desc = configService.get<string>(ENV_NAME.SWAGGER_DESC);
  if (
    configService.get<boolean>(ENV_NAME.SWAGGER_ENABLED) &&
    path &&
    title &&
    desc
  ) {
    app.use([path, path + '-json']);

    const options = new DocumentBuilder()
      .setTitle(title)
      .setDescription(desc)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(path, app, document);
  }
};

export { setupSwagger };
