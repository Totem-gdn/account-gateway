import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ISecretsConfig, SECRETS_NAMESPACE } from '../configuration/secrets/secrets.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { KeysModule } from '../keys/keys.module';

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
    KeysModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, TwitterStrategy, FacebookStrategy],
  exports: [AuthService],
})
export class AuthModule {}
