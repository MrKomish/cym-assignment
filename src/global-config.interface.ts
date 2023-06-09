import * as Joi from 'joi';

export interface GlobalConfig {
  NODE_ENV: 'development' | 'production';
  PORT: number;
  JWT_SECRET: string;
  LOGIN_TIMEOUT: string;
  MONGODB_CONNECTION_STRING: string;
}

export const globalConfigSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  PORT: Joi.number(),
  JWT_SECRET: Joi.string(),
  LOGIN_TIMEOUT: Joi.string(),
  MONGODB_CONNECTION_STRING: Joi.string(),
});
