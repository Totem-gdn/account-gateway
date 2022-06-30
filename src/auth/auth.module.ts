import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authProviders } from '../configuration/providers/providers.config';
import { JwtAuthModule } from './providers/jwt-auth/jwt-auth.module';
import { GoogleModule } from './providers/google/google.module';
import { FacebookModule } from './providers/facebook/facebook.module';
import { TwitterModule } from './providers/twitter/twitter.module';
import { SteamModule } from './providers/steam/steam.module';
import { ItchIoModule } from './providers/itch-io/itch-io.module';

const providerModules = {
  google: GoogleModule,
  facebook: FacebookModule,
  twitter: TwitterModule,
  steam: SteamModule,
  itchio: ItchIoModule,
};

@Module({
  imports: [ConfigModule],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    const providers = [JwtAuthModule];
    authProviders().forEach((provider) => {
      if (providerModules[provider]) {
        providers.push(providerModules[provider]);
      }
    });
    return {
      module: AuthModule,
      imports: providers,
    };
  }
}
