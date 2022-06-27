import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configuration/app/app.config';
import providersConfig from './configuration/providers/providers.config';
import secretsConfig, { ISecretsConfig, SECRETS_NAMESPACE } from './configuration/secrets/secrets.config';
import keysServiceConfig from './configuration/keystore/keystore.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KeystoreModule } from './keystore/keystore.module';
import { HealthModule } from './health/health.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { SESSION_STORE, SessionStoreModule } from './session-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [appConfig, providersConfig, secretsConfig, keysServiceConfig],
    }),
    SessionStoreModule,
    HealthModule,
    KeystoreModule,
    AuthModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService, @Inject(SESSION_STORE) private readonly store: session.Store) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(
        session({
          store: this.store,
          secret: this.configService.get<ISecretsConfig>(SECRETS_NAMESPACE).sessionSecret,
          saveUninitialized: false,
          resave: false,
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
