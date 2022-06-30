import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { KeystoreModule } from '../../../keystore/keystore.module';
import { ItchIoController } from './itch-io.controller';
import { ItchIoStrategy } from './strategies/itch-io.strategy';

@Module({
  imports: [ConfigModule, JwtAuthModule, KeystoreModule],
  controllers: [ItchIoController],
  providers: [ItchIoStrategy],
  exports: [ItchIoStrategy],
})
export class ItchIoModule {}
