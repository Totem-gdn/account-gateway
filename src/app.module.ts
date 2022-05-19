import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configuration/app/app.config';
import secretsConfig from './configuration/secrets/secrets.config';
import keyServiceConfig from './configuration/key-service/key-service.config';
import googleConfig from './configuration/google/google.config';
import twitterConfig from './configuration/twitter/twitter.config';
import facebookConfig from './configuration/facebook/facebook.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, secretsConfig, keyServiceConfig, googleConfig, twitterConfig, facebookConfig],
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
