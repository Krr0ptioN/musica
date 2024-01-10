import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // System
  MONGO_URI: Joi.string().required(),
  PORT_API: Joi.number().required(),
  STORAGE_DEST: Joi.string().required(),

  // Swaggger configuration
  SWAGGER_ENABLED: Joi.boolean().optional().default(true),
  SWAGGER_TITLE: Joi.string().optional().default('Musica API'),
  SWAGGER_DESC: Joi.string()
    .optional()
    .default('Swagger API Documentation server'),
  SWAGGER_PATH: Joi.string().optional().default('swg'),
  SWAGGER_USER: Joi.string().optional().default('admin'),
  SWAGGER_PASSWORD: Joi.string().optional().default('4#2M0!s0D1N#2398@M1N233l'),

  // Security
  CORS_ENABLED: Joi.boolean().optional().default(true),
  HELMET_ENABLED: Joi.boolean().optional().default(true),
  JWT_EXPIRES_IN: Joi.string().optional().default('5m'),
  JWT_REFRESH_IN: Joi.string().optional().default('7d'),
  BCRYPT_SALT_ROUND: Joi.number().optional().default(10),
  PASSWORD_RESET_TOKEN_EXPIRES_IN: Joi.string().optional().default('5m'),
});
