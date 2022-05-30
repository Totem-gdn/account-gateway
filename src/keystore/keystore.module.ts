import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IKeystoreServiceConfig, KEYSTORE_SERVICE_NAMESPACE } from '../configuration/keystore/keystore.config';
import { join } from 'path';
import { KeystoreService } from './keystore.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'USERS_PACKAGE',
      useFactory: (configService: ConfigService) => {
        const { grpc } = configService.get<IKeystoreServiceConfig>(KEYSTORE_SERVICE_NAMESPACE);

        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: `${grpc.host}:${grpc.port}`,
            package: 'users',
            protoPath: join(__dirname, 'proto', 'users.proto'),
          },
        });
      },
      inject: [ConfigService],
    },
    KeystoreService,
  ],
  exports: [KeystoreService],
})
export class KeystoreModule {}
