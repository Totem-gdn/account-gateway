import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configuration/app/app.config';
import secretsConfig from './configuration/secrets/secrets.config';
import keysServiceConfig from './configuration/keys-service/keys-service.config';
import googleConfig from './configuration/google/google.config';
import twitterConfig from './configuration/twitter/twitter.config';
import facebookConfig from './configuration/facebook/facebook.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { KeysModule } from './keys/keys.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, secretsConfig, keysServiceConfig, googleConfig, twitterConfig, facebookConfig],
    }),
    KeysModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
