import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { APP_NAMESPACE, IAppConfig } from './configuration/app/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<IAppConfig>(APP_NAMESPACE);

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.enableCors({ origin: true });

  await app.listen(port);
}

void bootstrap();
