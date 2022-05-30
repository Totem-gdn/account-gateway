import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ISecretsConfig, SECRETS_NAMESPACE } from '../../../configuration/secrets/secrets.config';
import { KeystoreModule } from '../../../keystore/keystore.module';
import { JwtAuthService } from './jwt-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<ISecretsConfig>(SECRETS_NAMESPACE).jwtSecret,
        signOptions: {
          // TODO: access & refresh tokens
          // TODO: change expiration duration
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
    KeystoreModule,
  ],
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
