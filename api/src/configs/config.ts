import type { Config } from './config.interface';

const config: Config = {
  backend: {
    port: 3000,
  },
  helmet: {
    enabled: true,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Musica API ',
    description: 'Swagger API Documentation server',
    version: '1',
    path: 'swg',
    user: 'admin',
    password: '4#2M0!s0D1N#2398@M1N233l',
    env: ['local', 'staging', 'development'],
  },
  security: {
    expiresIn: '5m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
    passwordResetTokenExpiresIn: '5m',
  },
  admin: {
    username: 'admin',
    email: 'admin@example.com',
    password: '4#2M0!s0D1N#2398@M1N233l',
    id: 0,
  },
  storage: {
    musicStorageDest: '/tmp/musica/musics',
  },
};

export default config;
