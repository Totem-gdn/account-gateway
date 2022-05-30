import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { TwitterController } from './twitter.controller';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

@Module({
  imports: [ConfigModule, JwtAuthModule],
  controllers: [TwitterController],
  providers: [TwitterStrategy],
  exports: [TwitterStrategy],
})
export class TwitterModule {}
