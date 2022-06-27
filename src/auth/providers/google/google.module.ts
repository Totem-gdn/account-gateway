import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleController } from './google.controller';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { KeystoreModule } from '../../../keystore/keystore.module';

@Module({
  imports: [ConfigModule, JwtAuthModule, KeystoreModule],
  controllers: [GoogleController],
  providers: [GoogleStrategy],
  exports: [GoogleStrategy],
})
export class GoogleModule {}
