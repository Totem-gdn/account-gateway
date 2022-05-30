import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configuration/app/app.config';
import providersConfig from './configuration/providers/providers.config';
import secretsConfig from './configuration/secrets/secrets.config';
import keysServiceConfig from './configuration/keystore/keystore.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KeystoreModule } from './keystore/keystore.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, providersConfig, secretsConfig, keysServiceConfig],
    }),
    HealthModule,
    KeystoreModule,
    AuthModule.register(),
    UsersModule,
  ],
})
export class AppModule {}
