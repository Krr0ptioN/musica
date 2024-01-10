import { ENV_NAME } from './env/names.enum';

export const configuration = () => {
  return {
    portApi: process.env[ENV_NAME.PORT_API],
    helmetEnabled: process.env[ENV_NAME.HELMET_ENABLED],
    corsEnabled: process.env[ENV_NAME.CORS_ENABLED],
    swaggerEnabled: process.env[ENV_NAME.CORS_ENABLED],
    swaggerTitle: process.env[ENV_NAME.SWAGGER_TITLE],
    swaggerDescription: process.env[ENV_NAME.SWAGGER_DESC],
    swaggerPath: process.env[ENV_NAME.SWAGGER_PATH],
    swaggerUser: process.env[ENV_NAME.SWAGGER_USER],
    swaggerPassword: process.env[ENV_NAME.SWAGGER_PASSWORD],
    jwtExpiresIn: process.env[ENV_NAME.JWT_EXPIRES_IN],
    jwtRefreshIn: process.env[ENV_NAME.JWT_REFRESH_IN],
    bcryptSaltRound: process.env[ENV_NAME.BCRYPT_SALT_ROUND],
    passwordResetTokenExpiresIn:
      process.env[ENV_NAME.PASSWORD_RESET_TOKEN_EXPIRES_IN],
    storageDest: process.env[ENV_NAME.STORAGE_DEST],
    musicAudioStorageDest: process.env[ENV_NAME.STORAGE_DEST] + '/musics',
    coverImageStorageDest: process.env[ENV_NAME.STORAGE_DEST] + '/covers',
  };
};
