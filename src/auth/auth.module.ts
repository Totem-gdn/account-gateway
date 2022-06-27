import { DynamicModule, Module } from '@nestjs/common';
import { authProviders } from '../configuration/providers/providers.config';
import { FacebookModule } from './providers/facebook/facebook.module';
import { GoogleModule } from './providers/google/google.module';
import { TwitterModule } from './providers/twitter/twitter.module';
import { SteamModule } from './providers/steam/steam.module';
import { JwtAuthModule } from './providers/jwt-auth/jwt-auth.module';
import { ConfigModule } from '@nestjs/config';

const providerModules = {
  google: GoogleModule,
  facebook: FacebookModule,
  twitter: TwitterModule,
  steam: SteamModule,
};

@Module({
  imports: [ConfigModule],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    const providers = [JwtAuthModule];
    authProviders().forEach((provider) => {
      providers.push(providerModules[provider]);
    });
    return {
      module: AuthModule,
      imports: providers,
    };
  }
}
