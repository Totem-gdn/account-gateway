import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';
import { APP_NAMESPACE, IAppConfig } from './configuration/app/app.config';
import { SECRETS_NAMESPACE, ISecretsConfig, useRedisStorage } from './configuration/secrets/secrets.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const { env, port } = configService.get<IAppConfig>(APP_NAMESPACE);
  const { sessionSecret } = configService.get<ISecretsConfig>(SECRETS_NAMESPACE);
  const sessionConfig: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  };
  if (env === 'production') {
    app.set('trust proxy', 1);
    sessionConfig.cookie.secure = true;
  }
  if (useRedisStorage()) {
    const RedisStore = connectRedis(session);
    const { redisStorageURI } = configService.get<ISecretsConfig>(SECRETS_NAMESPACE);
    const redisClient = createClient({ url: redisStorageURI, legacyMode: true });
    await redisClient.connect();
    sessionConfig.store = new RedisStore({ client: redisClient });
  }
  app.disable('x-powered-by');
  app.enableCors({ origin: true });
  app.use(session(sessionConfig));

  await app.listen(port);
}

void bootstrap();
