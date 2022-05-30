import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { KeystoreModule } from '../keystore/keystore.module';

@Module({
  imports: [KeystoreModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
