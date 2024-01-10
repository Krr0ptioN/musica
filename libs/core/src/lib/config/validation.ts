import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // System
  MONGO_URI: Joi.string()
    .valid(['development', 'production', 'test'])
    .required(),
  PORT_API: Joi.number()
    .valid(['development', 'production', 'test'])
    .required(),
  HOST_API: Joi.string()
    .valid(['development', 'production', 'test'])
    .required(),
  STORAGE_DEST: Joi.string()
    .valid(['development', 'production', 'test'])
    .required(),

  // Swaggger configuration
  SWAGGER_ENABLED: Joi.boolean()
    .valid(['development', 'production'])
    .optional()
    .default(true),
  SWAGGER_TITLE: Joi.string()
    .valid(['development', 'production'])
    .optional()
    .default('Musica API'),
  SWAGGER_DESC: Joi.string()
    .valid(['development', 'production'])
    .optional()
    .default('Swagger API Documentation server'),
  SWAGGER_PATH: Joi.string()
    .valid(['development', 'production'])
    .optional()
    .default('swg'),
  SWAGGER_USER: Joi.string()
    .valid(['development', 'production'])
    .optional()
    .default('admin'),
  SWAGGER_PASSWORD: Joi.string()
    .valid(['development', 'production'])
    .optional()
    .default('4#2M0!s0D1N#2398@M1N233l'),

  // Security
  CORS_ENABLED: Joi.boolean()
    .valid(['development', 'production', 'test'])
    .optional(),
  HELMET_ENABLED: Joi.boolean()
    .valid(['development', 'production', 'test'])
    .optional(),
  JWT_EXPIRES_IN: Joi.string()
    .valid(['development', 'production', 'test'])
    .optional()
    .default('5m'),
  JWT_REFRESH_IN: Joi.string()
    .valid(['development', 'production', 'test'])
    .optional()
    .default('7d'),
  BCRYPT_SALT_ROUND: Joi.number()
    .valid(['development', 'production', 'test'])
    .optional()
    .default(10),
  PASSWORD_RESET_TOKEN_EXPIRES_IN: Joi.string()
    .valid(['development', 'production', 'test'])
    .optional()
    .default('5m'),
});
