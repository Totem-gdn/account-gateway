import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IKeysServiceConfig, KEYS_SERVICE_NAMESPACE } from '../configuration/keys-service/keys-service.config';
import { join } from 'path';
import { KeysService } from './keys.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'KEYS_PACKAGE',
      useFactory: (configService: ConfigService) => {
        const { grpc } = configService.get<IKeysServiceConfig>(KEYS_SERVICE_NAMESPACE);

        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: `${grpc.host}:${grpc.port}`,
            package: 'keys',
            protoPath: join(__dirname, 'proto', 'keys.proto'),
          },
        });
      },
      inject: [ConfigService],
    },
    KeysService,
  ],
  exports: [KeysService],
})
export class KeysModule {}
