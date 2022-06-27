import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { FacebookController } from './facebook.controller';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { KeystoreModule } from '../../../keystore/keystore.module';

@Module({
  imports: [ConfigModule, JwtAuthModule, KeystoreModule],
  controllers: [FacebookController],
  providers: [FacebookStrategy],
  exports: [FacebookStrategy],
})
export class FacebookModule {}
