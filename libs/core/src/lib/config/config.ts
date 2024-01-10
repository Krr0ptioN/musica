import { ENV_NAME } from './env/names.enum';

export const configuration = () => {
  return {
    portApi: process.env['PORT_API'],
    helmetEnabled: process.env['HELMET_ENABLED'],
    corsEnabled: process.env['CORS_ENABLED'],
    swaggerEnabled: process.env['CORS_ENABLED'],
    swaggerTitle: process.env[ENV_NAME.SWAGGER_TITLE],
    swaggerDescription: process.env['SWAGGER_DESC'],
    swaggerPath: process.env['SWAGGER_PATH'],
    swaggerUser: process.env['SWAGGER_USER'],
    swaggerPassword: process.env['SWAGGER_PASSWORD'],
    jwtExpiresIn: process.env['JWT_EXPIRES_IN'],
    jwtRefreshIn: process.env['JWT_REFRESH_IN'],
    bcryptSaltRound: process.env['BCRYPT_SALT_ROUND'],
    passwordResetTokenExpiresIn: process.env['PASSWORD_RESET_TOKEN_EXPIRES_IN'],
    storageDest: process.env['STORAGE_DEST'],
    musicAudioStorageDest: process.env['STORAGE_DEST'] + '/musics',
    coverImageStorageDest: process.env['STORAGE_DEST'] + '/covers',
  };
};
