import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './configuration/app/app.config';
import providersConfig from './configuration/providers/providers.config';
import secretsConfig from './configuration/secrets/secrets.config';
import keysServiceConfig from './configuration/keys-service/keys-service.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { KeysModule } from './keys/keys.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, providersConfig, secretsConfig, keysServiceConfig],
    }),
    HealthModule,
    KeysModule,
    AuthModule.register(),
    UserModule,
  ],
})
export class AppModule {}
