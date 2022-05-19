import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configuration/app/app.config';
import secretsConfig from './configuration/secrets/secrets.config';
import googleConfig from './configuration/google/google.config';
import twitterConfig from './configuration/twitter/twitter.config';
import facebookConfig from './configuration/facebook/facebook.config';
import keyServiceConfig from './configuration/keyService/key-service.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      load: [appConfig, secretsConfig, keyServiceConfig, googleConfig, twitterConfig, facebookConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
