import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';
import { APP_NAMESPACE, IAppConfig } from './configuration/app/app.config';
import { ISecretsConfig, SECRETS_NAMESPACE } from './configuration/secrets/secrets.config';

async function getSessionConfig(configService: ConfigService<unknown, boolean>): Promise<session.SessionOptions> {
  const { sessionSecret } = configService.get<ISecretsConfig>(SECRETS_NAMESPACE);
  const { redisStorageURI } = configService.get<ISecretsConfig>(SECRETS_NAMESPACE);

  const sessionConfig: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  };

  if (!!redisStorageURI) {
    Logger.log(`Session Storage: Redis (${redisStorageURI})`);
    const RedisStore = connectRedis(session);
    const redisClient = createClient({ url: redisStorageURI, legacyMode: true });
    await redisClient.connect();
    sessionConfig.store = new RedisStore({ client: redisClient });
  }

  return sessionConfig;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<IAppConfig>(APP_NAMESPACE);

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.enableCors({ origin: true });
  app.use(session(await getSessionConfig(configService)));

  await app.listen(port);
}

void bootstrap();
