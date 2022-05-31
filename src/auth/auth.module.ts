import { DynamicModule, Module } from '@nestjs/common';
import { isProviderEnabled } from '../configuration/providers/providers.config';
import { FacebookModule } from './providers/facebook/facebook.module';
import { GoogleModule } from './providers/google/google.module';
import { TwitterModule } from './providers/twitter/twitter.module';
import { JwtAuthModule } from './providers/jwt-auth/jwt-auth.module';

@Module({})
export class AuthModule {
  static register(): DynamicModule {
    const providers = [JwtAuthModule];
    if (isProviderEnabled('google')) {
      providers.push(GoogleModule);
    }
    if (isProviderEnabled('facebook')) {
      providers.push(FacebookModule);
    }
    if (isProviderEnabled('twitter')) {
      providers.push(TwitterModule);
    }
    return {
      module: AuthModule,
      imports: providers,
      exports: providers,
    };
  }
}
