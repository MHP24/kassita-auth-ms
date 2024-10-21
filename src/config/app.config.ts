import { config } from 'dotenv';
import * as joi from 'joi';
config();

interface EnvVars {
  RABBITMQ_URL: string;
  RABBITMQ_QUEUE: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRE_TEXT: string;
  JWT_REFRESH_EXPIRE_TEXT: string;
  JWT_EXPIRE_SECONDS: number;
}

const envSchema = joi
  .object({
    RABBITMQ_URL: joi.string().required(),
    RABBITMQ_QUEUE: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    JWT_EXPIRE_TEXT: joi.string().required(),
    JWT_REFRESH_EXPIRE_TEXT: joi.string().required(),
    JWT_EXPIRE_SECONDS: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(error.message);
}

const envVars: EnvVars = value;

export const envs = {
  rabbitMqUrl: envVars.RABBITMQ_URL,
  rabbitMqQueue: envVars.RABBITMQ_QUEUE,
  jwtSecret: envVars.JWT_SECRET,
  jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
  jwtExpireText: envVars.JWT_EXPIRE_TEXT,
  jwtRefreshExpireText: envVars.JWT_REFRESH_EXPIRE_TEXT,
  jwtExpireSeconds: envVars.JWT_EXPIRE_SECONDS,
};
