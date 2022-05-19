import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { APP_NAMESPACE, IAppConfig } from './configuration/app/app.config';
import { SECRETS_NAMESPACE, ISecretsConfig } from './configuration/secrets/secrets.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: true });
  app.use(
    session({
      // TODO: add redis store
      secret: configService.get<ISecretsConfig>(SECRETS_NAMESPACE).sessionSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(configService.get<IAppConfig>(APP_NAMESPACE).port);
}

void bootstrap();
