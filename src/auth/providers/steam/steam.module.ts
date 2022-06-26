import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SteamStrategy } from './strategies/steam.strategy';
import { SteamController } from './steam.controller';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

@Module({
  imports: [ConfigModule, JwtAuthModule],
  controllers: [SteamController],
  providers: [SteamStrategy],
  exports: [SteamStrategy],
})
export class SteamModule {}
