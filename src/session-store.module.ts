import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_NAMESPACE, IAppConfig } from './configuration/app/app.config';
import * as session from 'express-session';
import * as Redis from 'redis';
import * as RedisStore from 'connect-redis';

export const SESSION_STORE = 'session-store';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SESSION_STORE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { redisStorageURI } = configService.get<IAppConfig>(APP_NAMESPACE);
        if (!redisStorageURI) {
          return new session.MemoryStore();
        }
        const client = Redis.createClient({ url: redisStorageURI, legacyMode: true });
        await client.connect();
        return new (RedisStore(session))({ client, logErrors: true });
      },
    },
  ],
  exports: [SESSION_STORE],
})
export class SessionStoreModule {}
